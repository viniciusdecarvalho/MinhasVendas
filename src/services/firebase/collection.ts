import { AngularFireDatabase, QueryFn, ChildEvent } from '@angular/fire/database';

import { Model } from './model'
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class Collection<T> {

  constructor(
    public entity: string,
    private db: AngularFireDatabase
  ) {
  }

  private collection(queryFn?: QueryFn) {
    return this.db.list<T>(this.entity, queryFn);
  }

  list(queryFn?: QueryFn): Observable<any[]> {
    return this.collection(queryFn).snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => ({ key: a.key, ...a.payload.val() as any }))
      )
    );
  }

  get(key: string): Observable<T> {

    const subject = new Subject<T>();

    this.db.object<T>(`${this.entity}/${key}`)
      .valueChanges()
      .subscribe((model) => {
        model['key'] = key;
        subject.next(model);
        subject.complete();
      });

    return subject.asObservable();

  }

  async add(model: Model): Promise<string> {
    let data = Model.toJSON(model);

    try {
      let key = await this.collection().push(data).key;
      return Promise.resolve(key);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async update(model: Model): Promise<string> {
    let data = Model.toJSON(model);

    try {
      await this.collection().update(`${model.key}`, data);
      return Promise.resolve(model.key);
    }
    catch (err) {
      return Promise.reject(err);
    }
  }

  async delete(key: string, updates?: { [key: string]: any}) {
    await this.collection().remove(key);
    this.updatePath(updates);
    return key;
  }

  save(model: any, updates?: { [key: string]: any}): Observable<T> {

    const subject = new Subject<T>();

    let result: Promise<string> = (model.key) ? this.update(model)
      : this.add(model);

    result.then((key) => {
      model.key = key;
      subject.next(model);
      subject.complete();

      this.updatePath(updates);

    })
    .catch((error) => {
      subject.error(error);
      subject.complete();
    });

    return subject.asObservable();
  }

  private updatePath(updates?: { [key: string]: any}): void {
    if (!updates) return;

    this.db.database.ref().update(updates);

  }
}
