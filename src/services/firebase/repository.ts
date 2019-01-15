import { AngularFireDatabase, QueryFn, ChildEvent } from '@angular/fire/database';

import { Injectable, Type, Inject } from '@angular/core';
import { Collection } from './collection';

@Injectable()
export class Repository {

    private services: Collection<{}>[] = [];

    constructor(
        private db: AngularFireDatabase
    ) {
    }

    public get<T>(collectionName: string): Collection<T> {
        let service = this.services.find(s => s.entity == collectionName);

        if (!service) {
            service = new Collection<T>(collectionName, this.db);
            this.services.push(service);
        }
            
        return service as Collection<T>;
    }
}
