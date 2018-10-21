import { LocateProvider } from './../../providers/locate/locate';
import { Component } from '@angular/core';
import { NavController, ActionSheetController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PlaceDetailsProvider } from '../../providers/place-details/place-details';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
Place_Marker;
ready;
  constructor(public navCtrl: NavController,
    public LOCATE: LocateProvider,
    public storage: Storage,
    public action: ActionSheetController,
    public details: PlaceDetailsProvider,
    public loading: LoadingController) {
      
      this.LOCATE.mapData();
      this.Place_Marker = this.LOCATE.placeMarker
    }
ionViewDidLoad(){
  this.LOCATE.drawMap();
}
presentLoader(){
  let load = this.loading.create({
    content:'Please Wait...',
    spinner: 'dots',
  })
  load.present()
}
presentActionSheet() {
  this.details.getPlaceInfo(this.LOCATE.placeId, this.LOCATE.map)
  let Action = this.action.create({
    title: this.LOCATE.placeName + " Options",
    buttons: [
      {
        text: this.LOCATE.placeName + " Info",
        handler: async () => {
          await this.details.rating
          console.log(this.details.rating)
        }      
      },
      {
        text: "Get Directions",
        handler: () => {

        }
      },
      {
        text: "Mark As Favorite",
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



