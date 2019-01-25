import { OnDestroy, Injectable } from '@angular/core';
import { Driver, StatementResult } from 'neo4j-driver/types/v1';
import { CredentialsService } from './credentials.service';
import { v1 as neo4j } from 'neo4j-driver';
import { Observable, from, of } from 'rxjs';
import { tap } from 'rxjs/operators';

// @dynamic
@Injectable({
	providedIn: 'root'
})
export class NgNeo4jServiceMock implements OnDestroy {
	constructor() {}

	public query(query: string, parameters?: any): Observable<StatementResult> {
		return of({
			records: [],
			summary: null,
			calledWith: `query: ${query} parameters: ${parameters}`
		});
	}

	ngOnDestroy() {}
}

