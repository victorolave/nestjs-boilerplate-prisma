import { Module, Global } from '@nestjs/common';
import LoggerService from './logger.service';

@Global()
@Module({
  imports: [],
  exports: [LoggerService],
  providers: [LoggerService],
})
export default class LoggerModule {}
