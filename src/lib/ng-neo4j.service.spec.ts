import { TestBed } from '@angular/core/testing';

import { NgNeo4jService } from './ng-neo4j.service';
import { MockDriver } from './neo4j-driver.mock';
import { Driver, StatementResult } from 'neo4j-driver/types/v1';
import { CredentialsService } from './credentials.service';
import { Observable } from 'rxjs';

describe('NgNeo4jService', () => {
	let driver: Driver;
	let service: NgNeo4jService;
	let driverSpy: jasmine.Spy;
	beforeEach(() => {
		driver = new MockDriver();

		TestBed.configureTestingModule({
			providers: [
				{
					provide: CredentialsService,
					useValue: {
						driver: driver
					}
				}
			]
		});
		service = TestBed.get(NgNeo4jService);
		spyOn(driver, 'session').and.callThrough();
		driverSpy = spyOn(driver.session(), 'run');
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('should query database', () => {
		it('should create a new session', () => {
			service.query('');
			expect(driver.session).toHaveBeenCalled();
		});

		it('should return an observable', () => {
			driverSpy.and.callFake((r) => {
				return {
					next: () => {
						expect(this).not.toHaveBeenCalled();
					}
				};
			});
			service.query('');
			service.$ready.next('ready');
		});
	});
});
