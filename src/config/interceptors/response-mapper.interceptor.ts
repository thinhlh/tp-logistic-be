import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { plainToClass, plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";

interface ClassType<T> {
    new(): T
}

@Injectable()
export class ResponseMapperInterceptor<T> implements NestInterceptor<Partial<T>, T>{
    constructor(private readonly classType: ClassType<T>) { }
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<T> | Promise<Observable<T>> {
        return next
            .handle()
            .pipe(map(data => {
                return plainToInstance(
                    this.classType,
                    data, {
                    excludeExtraneousValues: true
                })
            }
            ))
    }
}