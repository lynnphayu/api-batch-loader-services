import { Controller, Get, ParseArrayPipe, Query } from '@nestjs/common'
import { MessagePattern, Payload, Transport } from '@nestjs/microservices'
import { randomUUID } from 'crypto'
import { firstValueFrom } from 'rxjs'
import { AppService } from './app.service'
import { Commands } from './commons/constants'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(Commands.CMD_FIND_BY_IDS, Transport.TCP)
  async rpcGet(@Payload(new ParseArrayPipe({ items: Number })) ids: number[]) {
    return this.appService.batchGetStream({ ids: ids, rayId: randomUUID() })
  }

  @Get()
  async get(@Query('ids', new ParseArrayPipe({ items: Number })) ids: number[]) {
    return firstValueFrom(this.appService.batchGetStream({ ids: ids, rayId: randomUUID() }))
  }
}
