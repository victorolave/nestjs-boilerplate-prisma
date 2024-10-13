import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseModel } from '../domain/models';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ResponseModel<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ResponseModel<T> | any> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    return next.handle().pipe(
      map(
        (data) =>
          new ResponseModel<T>({
            path: request.url,
            duration: `${Date.now() - now}ms`,
            message: null,
            didError: false,
            typeMessage: null,
            statusCode: context.switchToHttp().getResponse().statusCode,
            data: data,
          }),
      ),
    );
  }
}
