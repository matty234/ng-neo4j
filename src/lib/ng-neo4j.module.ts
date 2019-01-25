import { NgModule, ModuleWithProviders, Optional } from '@angular/core';
import { NgNeo4jService } from './ng-neo4j.service';
import { CredentialsService } from './credentials.service';

@NgModule({
	imports: [],
	declarations: [ ],
	providers: [ NgNeo4jService ],
	exports: [ ]
})
export class NgNeo4jModule {
	static forRoot(config: CredentialsService): ModuleWithProviders {
		return {
			ngModule: NgNeo4jModule,
			providers: [
				{provide: CredentialsService, useValue: config }
			]
		};
	}
}


