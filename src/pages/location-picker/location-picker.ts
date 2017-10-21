import { googleLocationsDetails } from '../../models/googleLocationDetails';
import { GoogleLocationsProvider } from '../../providers/google-locations/google-locations';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-location-picker',
  templateUrl: 'location-picker.html',
})
export class LocationPickerPage {

  query: string;
  places: any = [];


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public zone: NgZone,
    public GoogleLocationsProvider: GoogleLocationsProvider) {
    GoogleLocationsProvider.loadGoogleMaps().then(res => {

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPickerPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  searchPlace() {
    this.GoogleLocationsProvider.search(this.query).then(res => {
      this.zone.run(() => {
        this.places = [];
        this.places = res;
      })
    })

  }

  getChunckFromLocation(addressComponents, type) {
    return addressComponents.find(x => x.types[0] == type).long_name;
  }

  selectPlace(place) {

    this.GoogleLocationsProvider.getSelectedPlaceDetails(place).then(res => {

      console.log(res)

      var result: googleLocationsDetails = {
        Street: this.getChunckFromLocation(res.address_components, "street_number") + " " + this.getChunckFromLocation(res.address_components, "route"),
        City: this.getChunckFromLocation(res.address_components, "locality"),
        Zip: this.getChunckFromLocation(res.address_components, "postal_code"),
        State: this.getChunckFromLocation(res.address_components, "administrative_area_level_1"),
        formatted_address: res.formatted_address
      }

      this.viewCtrl.dismiss(result);
    });


  }



}
