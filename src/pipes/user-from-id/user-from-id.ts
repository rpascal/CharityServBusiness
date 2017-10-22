import { Observable } from 'rxjs/Observable';
import { ENVIRONMENT } from './../../environments/environment.default';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { UserModel } from './../../models/user';
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the UserFromIdPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'userFromId',
})
export class UserFromIdPipe implements PipeTransform {


  constructor(public FirebaseProvider: FirebaseProvider) {

  }

  transform(userKey: string)  : Observable<UserModel>{
    var user = this.FirebaseProvider.getDocument<UserModel>(ENVIRONMENT.firebaseDataPaths.users, userKey);

console.log(userKey)

    return user;
  }
}
