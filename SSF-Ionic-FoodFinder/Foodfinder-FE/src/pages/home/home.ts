import { LocateProvider } from './../../providers/locate/locate';
import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PlaceDetailsProvider } from '../../providers/place-details/place-details';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
Place_Marker;


  constructor(public navCtrl: NavController, public LOCATE: LocateProvider, public storage: Storage, public action: ActionSheetController, public details: PlaceDetailsProvider) {
    this.LOCATE.mapData();
    this.Place_Marker = this.LOCATE.placeMarker
  }
ionViewDidLoad(){
  this.LOCATE.drawMap();
}
presentActionSheet() {
  let Action = this.action.create({
    title: this.LOCATE.placeName + " Options",
    buttons: [
      {
        text: this.LOCATE.placeName + " Info",
        handler: () => {
          this.details.getPlaceInfo(this.LOCATE.placeId, this.LOCATE.map)
          console.log('b4', this.LOCATE.placeId)
        }
      },
      {
        text: "Get Directions",
        handler: () => {

        }
      },
      {
        text: "Read Reviews",
        handler: () => {

        }
      }
    ]
  })

  Action.present()
}
getNewPlace(){
  this.LOCATE.newPlace()
}

}



