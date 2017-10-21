import { GoogleLocationsProvider } from '../../providers/google-locations/google-locations';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationPickerPage } from './location-picker';

@NgModule({
  declarations: [
    LocationPickerPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationPickerPage),
  ],
  providers : [
    GoogleLocationsProvider
  ]
})
export class LocationPickerPageModule {}
