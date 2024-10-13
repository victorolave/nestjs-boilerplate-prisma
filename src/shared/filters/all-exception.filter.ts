import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import LoggerService from '../logger/logger.service';
import { MessageType } from '../enums';
import {
  CustomHttpExceptionResponse,
  HttpExceptionResponse,
} from '../domain/models';
import { Prisma } from '@prisma/client';

@Catch()
export default class HttpExceptionFilter implements ExceptionFilter {
  constructor(private loggerService: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: HttpStatus;
    let errorMessage: string;
    this.loggerService.error(exception);

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();
      errorMessage =
        (errorResponse as HttpExceptionResponse).message || exception.message;
      this.loggerService.error(
        `The ${(errorResponse as HttpExceptionResponse).error} exception stacktrace with status ${status} is`,
        exception.stack,
      );
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      status = HttpStatus.BAD_REQUEST;
      errorMessage = exception.message;
      this.loggerService.error(
        `The ${(exception as Prisma.PrismaClientKnownRequestError).name} exception stacktrace with status ${status} is`,
        exception.stack,
      );
    } else if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = exception.message;
      this.loggerService.error(
        `The ${(exception as Prisma.PrismaClientUnknownRequestError).name} exception stacktrace with status ${status} is`,
        exception.stack,
      );
    } else if (exception instanceof Prisma.PrismaClientRustPanicError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage =
        'Internal Server Error: Prisma Client encountered a Rust panic';
      this.loggerService.error(
        `The ${(exception as Prisma.PrismaClientRustPanicError).name} exception stacktrace with status ${status} is`,
        exception.stack,
      );
    } else if (exception instanceof Prisma.PrismaClientInitializationError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'Error initializing Prisma Client';
      this.loggerService.error(
        `The ${(exception as Prisma.PrismaClientInitializationError).name} exception stacktrace with status ${status} is`,
        exception.stack,
      );
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      errorMessage = exception.message;
      this.loggerService.error(
        `The ${(exception as Prisma.PrismaClientValidationError).name} exception stacktrace with status ${status} is`,
        exception.stack,
      );
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'Critical internal server error occurred';
      this.loggerService.error(`Unrecognized error`);
    }

    const errorResponse = this.getErrorResponse(status, errorMessage, request);

    delete errorResponse.error;

    response.status(status).json(errorResponse);
  }

  private getErrorResponse = (
    status: HttpStatus,
    errorMessage: string,
    request: Request,
  ): CustomHttpExceptionResponse => ({
    statusCode: status,
    error: '',
    message: errorMessage,
    path: request.url,
    method: request.method,
    timeStamp: new Date(),
    typeMessage: MessageType.ERROR,
    didError: true,
  });
}
