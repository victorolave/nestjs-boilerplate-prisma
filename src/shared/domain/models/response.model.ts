import { HttpStatus } from '@nestjs/common';
import { MessageType } from 'src/shared/enums';

export class ResponseModel<T> {
  constructor(partial: Partial<ResponseModel<T>>) {
    this.message = null;
    this.didError = false;
    this.typeMessage = MessageType.UNDEFINED;
    Object.assign(this, partial);
  }

  path: string;
  duration: string;
  isArray: boolean;
  message: string;
  didError: boolean;
  data: T;
  typeMessage: MessageType;
  statusCode: HttpStatus;
}
