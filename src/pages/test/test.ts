import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Item, subCollection } from './../../models/ItemModel';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { ENVIRONMENT } from './../../environments/environment.default';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  environment: any;
  
    items: Observable<Item[]>;
  
    constructor(public navCtrl: NavController, private firebase: FirebaseProvider) {
      this.environment = ENVIRONMENT.environment;
      console.log(JSON.stringify(ENVIRONMENT))
  
      this.items = this.firebase.getSnapshotBase<Item>("items").map(data => {
        data.forEach(item => {
          item.subCollection = this.firebase.getCollectionList<subCollection>(`items/${item.id}/subCollection`);
        });
        return data;
  
      })
  
    }
  
    public innerAdd(id) {
      const newItem: subCollection = { blah: "Testing" + id };
      this.firebase.setItem(`items/${id}/subCollection`, newItem);
  
    }
  
    public add() {
      const newItem: Item = { name: "Testing" };
      this.firebase.setItem("items", newItem);
    }
  

}
