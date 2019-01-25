import { Driver, Session, Result } from 'neo4j-driver/types/v1';
import { noop } from '@angular/compiler/src/render3/view/util';
import { of } from 'zen-observable';

export class MockDriver implements Driver {
	onError?;
	s = new MockSession();

	onCompleted: () => void = () => {};

	constructor() {
		this.onCompleted();
	}

	session(): Session {
		return this.s;
	}

	close(): void {
		return;
	}
}

export class MockSession implements Session {
	beginTransaction() {
		return null;
	}
	readTransaction() {
		return null;
	}
	writeTransaction() {
		return null;
	}
	run() {
		return null;
	}
	lastBookmark(): string {
		return '';
	}
	close(callback?: () => void): void {
		console.log('closed');
		return;
	}
}
