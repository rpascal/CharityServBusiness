import { SubjectCategory } from './../../models/subjectcategory';
import { ServicesProvider } from './../../providers/services/services';
import { service } from './../../models/service';
import { AuthenticationProvider } from './../../providers/authentication/authentication';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

import { FirebaseProvider } from './../../providers/firebase/firebase';
import { ENVIRONMENT } from './../../environments/environment.default';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ViewChild } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @ViewChild(Content) content: Content;
  public loggedIn: boolean = false;


  public services: Observable<service[]>;


  constructor(public navCtrl: NavController,
    public AuthenticationProvider: AuthenticationProvider,
    private firebase: FirebaseProvider,
    private ServicesProvider: ServicesProvider) {



  }



  ionViewWillEnter() {
    this.AuthenticationProvider.redirectIfNotLoggedIn(this.navCtrl).then(loggedIn => {
      this.loggedIn = loggedIn;
      this.content.resize();
    })
  }

  ionViewDidLoad() {
    this.ServicesProvider.getOwnServices().then((data: Observable<service[]>) => {
      this.services = data;
    })
  }

  addService() {
    this.navCtrl.push("AddServicePage")
  }


}
