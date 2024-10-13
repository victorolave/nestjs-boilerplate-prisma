import { MessageType } from 'src/shared/enums';

export interface HttpExceptionResponse {
  statusCode: number;
  error: string;
  message: string;
}

export interface CustomHttpExceptionResponse extends HttpExceptionResponse {
  path: string;
  method: string;
  timeStamp: Date;
  typeMessage: MessageType;
  didError: boolean;
}
