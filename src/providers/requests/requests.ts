import { FirebaseProvider } from './../firebase/firebase';
import { request } from './../../models/request';
import { ENVIRONMENT } from './../../environments/environment.default';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';

import moment from 'moment'
/*
  Generated class for the RequestsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RequestsProvider {

  status$: BehaviorSubject<'accepted' | 'declined' | 'pending' | null>;

  constructor(public afs: AngularFirestore, public FirebaseProvider : FirebaseProvider) {
    this.status$ = new BehaviorSubject(null);
    this.filterByStatus('pending');
  }


  filterByStatus(status: 'accepted' | 'declined' | 'pending') {
    this.status$.next(status);
  }

  getRequest(serviceID: string): Observable<request[]> {
    return this.status$.switchMap((status) =>
      this.afs.collection(ENVIRONMENT.firebaseDataPaths.request, ref => {
        let query = ref.where('serviceID', '==', serviceID).where("isActive", "==", true);
        if (status) { query = query.where('status', '==', status) };
        //  query  = query.orderBy("opened")
      
        return query;
      }).snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as request;
          const id = a.payload.doc.id;
          return Object.assign(data, { id: id });
        });
      })
    );

  }

  accept(request: request) {
    request.status = 'accepted';
    request.closed = moment().toDate();
    this.FirebaseProvider.updateItem(ENVIRONMENT.firebaseDataPaths.request, request.id,request)
  }

  decline(request: request) {
    request.status = 'declined';
    request.closed = moment().toDate();
    
    this.FirebaseProvider.updateItem(ENVIRONMENT.firebaseDataPaths.request, request.id,request)
  }

}
