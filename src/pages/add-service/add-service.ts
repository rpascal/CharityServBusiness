import { AuthenticationProvider } from './../../providers/authentication/authentication';
import { service } from './../../models/service';
import { ENVIRONMENT } from './../../environments/environment.default';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { SubjectCategory } from './../../models/subjectcategory';
import { Observable } from 'rxjs/Observable';
import { ServicesProvider } from './../../providers/services/services';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, ValidatorFn, FormGroup } from '@angular/forms';
import { AlertController } from 'ionic-angular';




@IonicPage()
@Component({
  selector: 'page-add-service',
  templateUrl: 'add-service.html',
})
export class AddServicePage {

  addServiceFrom: any;

  categories: Observable<SubjectCategory[]>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public services: ServicesProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public firebase: FirebaseProvider,
    public AuthenticationProvider: AuthenticationProvider) {

    this.addServiceFrom = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
    });

    this.categories = this.services.getServiceCategories();//this.firebase.getSnapshotBase<SubjectCategory>(ENVIRONMENT.firebaseDataPaths.ServiceCategories);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddServicePage');
  }



  addService() {

    let title = this.addServiceFrom.controls.title.value;
    let description = this.addServiceFrom.controls.description.value;
    let category = this.addServiceFrom.controls.category.value;

    this.AuthenticationProvider.getUserID().then(id => {

      let service: service = {
        Title: title,
        Description: description,
        MainCategory: category,
        charityID: id,
        isActive : true
      }


      this.firebase.setItem(ENVIRONMENT.firebaseDataPaths.service, service).then(res => {
        this.navCtrl.pop();
      });
    })


  }
}


