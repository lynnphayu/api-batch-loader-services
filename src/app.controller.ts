import { Controller, Get, Inject } from '@nestjs/common';
import {
  ClientProxy,
  MessagePattern,
  Payload,
  Transport,
} from '@nestjs/microservices';
import { filter, pipe, tap } from 'rxjs';
import { AppService } from './app.service';
import { Commands } from './commons/constants';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('RICK_MORTY') private client: ClientProxy,
  ) {}

  @MessagePattern(Commands.GET_ONE, Transport.TCP)
  async getOne(@Payload() id: number) {
    return this.appService.batchGetStream(id);
  }

  @Get()
  get() {
    return this.client.send(Commands.GET_ONE, 1);
  }
}
