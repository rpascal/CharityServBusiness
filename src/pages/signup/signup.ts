import { charity, service } from './../../models/ItemModel';
import { AuthenticationProvider } from './../../providers/authentication/authentication';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastOptions } from 'ionic-angular';
import { Validators, FormBuilder, ValidatorFn, FormGroup } from '@angular/forms';
import { AlertController, AlertOptions, ToastController } from 'ionic-angular';
import { Events } from "ionic-angular";
import { Loader } from '../../providers/loader/loader';

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  defaultHistory: ['LoginPage']
})
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signUpForm: any

  public emailValidator: ValidatorFn = Validators.compose([
    Validators.required,
    Validators.email
  ]);
  public passwordValidator: ValidatorFn = Validators.compose([
    Validators.required,
    Validators.minLength(6)
  ]);


  constructor(
    private events: Events,
    public ToastController: ToastController,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private loader: Loader,
    private alertCtrl: AlertController,
    public AuthenticationProvider: AuthenticationProvider
  ) { }

  ionViewWillLoad() {
    // Validate user registration form
    this.signUpForm = this.formBuilder.group({
      business: ['', Validators.required],
      email: ['', this.emailValidator],
      password: ['', this.passwordValidator],
      passwordConfirmation: ['', this.passwordValidator]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.passwordConfirmation.value;
    return pass === confirmPass ? null : { notSame: true }
  }

  createUser() {

    let business = this.signUpForm.controls.business.value;
    let email = this.signUpForm.controls.email.value;
    let password = this.signUpForm.controls.password.value;

    let charity: charity = {
      City : 'Lodi',
      Name : 'Ryan Test',
      Phone : "330-421-9134",
      Services : [
        "serviceKey"
      ],
      State: "Ohio",
      Street : 'avon lake',
      URL : "website.com",
      Zip: '44254'
    }




    this.loader.show("Creating user...");
    this.AuthenticationProvider.createUserWithEmailAndPassword(charity, email, password).then(res => {
      this.loader.hide()
      this.navCtrl.setRoot("HomePage")
    }).catch(err => {
      this.alertCtrl.create({
        message: err,

      }).present();
      this.loader.hide();

    });

  }

}
