import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { response } from 'express';
@Catch(HttpException)
export class HttpVersionFilter<T extends HttpException>
  implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx= host.switchToHttp();
    const response =ctx.getResponse<Response>();
    const status= exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const error =
       typeof response === 'string'
       ? {message : exceptionResponse}
       : (exceptionResponse as object);
      //  response.status(status).json({
      //   ...error,
      //   Timestamp: new Date().toISOString(),
      //  })
  }
}
