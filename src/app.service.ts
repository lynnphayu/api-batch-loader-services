import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { getCharacter } from 'rickmortyapi'
import { Subject, mergeMap, map, bufferTime, tap, zip, from, of, mergeAll, filter } from 'rxjs'
import { CharractersResponse, FindByIdsRequest } from './commons/types'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppService implements OnApplicationBootstrap {
  requestStream = new Subject<FindByIdsRequest>()
  responseStream = new Subject<CharractersResponse>()
  bufferTimeMs: number

  constructor(config: ConfigService) {
    this.bufferTimeMs = config.get<number>('bufferTime')
  }

  onApplicationBootstrap() {
    this.requestStream
      .pipe(
        bufferTime(this.bufferTimeMs),
        filter((e) => !!e.length),
        mergeMap((reqs) =>
          zip([
            of(reqs).pipe(tap((e) => e)),
            of(reqs).pipe(
              mergeMap((reqs) => getCharacter<number[]>(reqs.flatMap(({ ids }) => ids))),
              map((e) => e.data)
            )
          ]).pipe(
            map(([reqs, chars]) =>
              reqs.map(({ rayId, ids }) => ({
                rayId,
                chars: ids.map((id) => chars.find(({ id: charId }) => id === charId))
              }))
            )
          )
        ),
        map((e) => from(e)),
        mergeAll()
      )
      .subscribe({
        next: (v) => this.responseStream.next(v),
        complete: () => this.responseStream.complete()
      })
  }

  batchGetStream(req: FindByIdsRequest) {
    this.requestStream.next(req)
    return this.responseStream.pipe(
      filter(({ rayId }) => rayId === req.rayId),
      map(({ chars }) => chars)
    )
  }
}
