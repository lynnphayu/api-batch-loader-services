import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService)
  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: config.get('host'),
      port: config.get('tcp')
    }
  })
  app.startAllMicroservices()
  app.listen(config.get('http'))
}
bootstrap()
