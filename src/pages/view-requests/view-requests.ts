import { RequestsProvider } from './../../providers/requests/requests';
import { request } from './../../models/request';
import { Observable } from 'rxjs/Observable';
import { service } from './../../models/service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewRequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-requests',
  templateUrl: 'view-requests.html',
})
export class ViewRequestsPage {

  selectedService: service;

  currentStatus: 'accepted' | 'declined' | 'pending' = 'pending';

  requests: Observable<request[]>

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public RequestsProvider: RequestsProvider) {
    this.selectedService = navParams.data;
    this.requests = this.RequestsProvider.getRequest(this.selectedService.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewRequestsPage');
  }

  statusChange() {
    this.RequestsProvider.filterByStatus(this.currentStatus);

  }

}
