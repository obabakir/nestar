import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { json } from 'stream/consumers';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	private readonly logger: Logger = new Logger();
	public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const recordTime = Date.now();
		const requestType = context.getType<GqlContextType>();
		if (requestType === 'http') {
			// Develop if needed
		} else if (requestType === 'graphql') {
			/* (1) Print Request */

			const gqlContext = GqlExecutionContext.create(context);
			// console.log('gqlContext =>', gqlContext.getContext().req.body);
			this.logger.log(`${this.stringify(gqlContext.getContext().req.body)}`, 'REQUERST ');
			/* (2) Error Handling via GraphQL*/

			/* if err (wrong password...) app.module graphQLFormattedError intercepts === throw err*/

			/* (3) No Errors, giving Response below*/
			return next.handle().pipe(
				tap((context) => {
					const responseTime = Date.now() - recordTime;
					this.logger.log(`${this.stringify(context)} - ${responseTime}ms \n\n`, 'RESPONSE');
				}),
			);
		}
	}
	// shape response => into string,
	public stringify(context: ExecutionContext): string {
		return JSON.stringify(context).slice(0, 85);
	}

	//  response 0 dan 75 harf log qiladi,  100 .... ok
}
