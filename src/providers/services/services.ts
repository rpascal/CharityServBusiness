import { AuthenticationProvider } from './../authentication/authentication';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { SubjectCategory } from './../../models/subjectcategory';
import { ENVIRONMENT } from './../../environments/environment.default';
import { service } from './../../models/service';
import { FirebaseProvider } from './../firebase/firebase';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class ServicesProvider {

  constructor(public firebase: FirebaseProvider,
    private afs: AngularFirestore,
    public AuthenticationProvider: AuthenticationProvider) {
  }


  getServiceCategories() {
    return this.firebase.getSnapshotBase<SubjectCategory>(ENVIRONMENT.firebaseDataPaths.ServiceCategories);
  }


  public getOwnServices<service>(): Promise<Observable<service[]>> {

    return new Promise((resolve, reject) => {
      this.AuthenticationProvider.getUserID().then(id => {
        resolve(this.afs.collection<service>(ENVIRONMENT.firebaseDataPaths.service, ref => ref.where("charityID", "==", id)).snapshotChanges().map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as service;
            const id = a.payload.doc.id;
            return Object.assign(data, { id: id });
          });
        }));

      })


    })

  }


}
