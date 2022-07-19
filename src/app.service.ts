import { Injectable } from '@nestjs/common';
import { getCharacter } from 'rickmortyapi';
import { Character } from 'rickmortyapi/dist/interfaces';
import { Subject, mergeMap, map } from 'rxjs';

@Injectable()
export class AppService {
  requestStream = new Subject<number>();
  responseStream = new Subject<Character>();
  proxyPipe = this.requestStream.pipe(
    mergeMap((id) => getCharacter(id)),
    map((e) => e.data),
  );

  constructor() {
    this.proxyPipe.subscribe({
      next: (v) => this.responseStream.next(v),
      complete: () => this.responseStream.complete(),
    });
  }

  batchGetStream(id) {
    this.requestStream.next(id);
    return this.responseStream;
  }
}
