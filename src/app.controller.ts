import { Controller, Get, Inject, ParseArrayPipe, Query } from '@nestjs/common'
import { ClientProxy, MessagePattern, Payload, Transport } from '@nestjs/microservices'
import { randomUUID } from 'crypto'
import { firstValueFrom } from 'rxjs'
import { AppService } from './app.service'
import { Commands } from './commons/constants'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, @Inject('RICK_MORTY') private client: ClientProxy) {}

  @MessagePattern(Commands.GET_ONE, Transport.TCP)
  async rpcGet(@Payload(new ParseArrayPipe({ items: Number })) ids: number[]) {
    return this.appService.batchGetStream({ ids: ids, rayId: randomUUID() })
  }

  @Get()
  async get(@Query('ids', new ParseArrayPipe({ items: Number })) ids: number[]) {
    return firstValueFrom(this.appService.batchGetStream({ ids: ids, rayId: randomUUID() }))
  }
}
