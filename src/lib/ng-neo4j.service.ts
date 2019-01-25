import { Injectable, OnDestroy, OnInit, Pipe } from '@angular/core';
import { v1 as neo4j } from 'neo4j-driver';
import { Driver, Session, Result, StatementResult } from 'neo4j-driver/types/v1';
import { CredentialsService } from './credentials.service';
import { Observable, of, concat, Subject, from, ReplaySubject } from 'rxjs';
import { tap, timeout, retry, flatMap, skip, filter, mergeMap, map, takeUntil } from 'rxjs/operators';

// @dynamic
@Injectable({
	providedIn: 'root'
})
export class NgNeo4jService implements OnDestroy {
	private driver: Driver;
	public $ready = new ReplaySubject<string>();

	constructor(config: CredentialsService) {
		if (config.driver) {
			this.driver = config.driver;
			this.driver.onCompleted = () => {
				this.$ready.next('ready');
			};
		} else {
			this.driver = neo4j.driver(config.uri, neo4j.auth.basic(config.user, config.password));
			this.driver.onCompleted = () => {
				this.$ready.next('ready');
			};
		}
	}

	public query(query: string, parameters?: any): Observable<StatementResult> {
		const session = this.driver.session();
		return this.$ready.pipe(mergeMap(() => from(session.run(query, parameters).then())));
	}

	ngOnDestroy() {
		this.driver.close();
		this.$ready.unsubscribe();
	}
}
