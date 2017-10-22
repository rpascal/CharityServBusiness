import { Loader } from './../providers/loader/loader';
import { AuthenticationProvider } from './../providers/authentication/authentication';
import { ToastProvider } from './../providers/toast/toast';
import { AlertProvider } from './../providers/alert/alert';
import { FirebaseProvider } from './../providers/firebase/firebase';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ENVIRONMENT } from './../environments/environment.default';
import { ServicesProvider } from '../providers/services/services';



@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(ENVIRONMENT.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    // TextMaskModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AlertProvider,
    ToastProvider,
    AuthenticationProvider,
    Loader,
    ServicesProvider
  ]
})
export class AppModule {}
