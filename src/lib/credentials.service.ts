import { Injectable } from '@angular/core';
import { Driver } from 'neo4j-driver/types/v1';


/**
 * Stores the Username and Password required for authenticating with
 * the Neo4j Database as well as the URI for the instance
 */
@Injectable({
	providedIn: 'root'
})
export class CredentialsService {
	uri?: string;
	user?: string;
	password?: string;
	driver?: Driver;
}
