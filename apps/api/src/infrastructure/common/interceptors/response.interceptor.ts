import { Injectable, ExecutionContext, CallHandler } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { map } from 'rxjs/operators';

export class ResponseFormat<T> {
  @ApiProperty()
  isArray: boolean;
  @ApiProperty()
  path: string;
  @ApiProperty()
  duration: string;
  @ApiProperty()
  method: string;

  data: T;
}

@Injectable()
export class ResponseInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => ({
        data,
      })),
    );
  }
}
