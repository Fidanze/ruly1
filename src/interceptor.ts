
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                map(value => {
                    if (value === undefined) {
                        return { success: true }
                    }
                    if (value['message'] !== undefined) {
                        return { success: false, result: { error: value.message } }
                    }
                    if (value !== undefined) {
                        return { success: true, result: value };
                    }
                }),
            )

    }
}
