import { LocateProvider } from './../../providers/locate/locate';
import { Component } from '@angular/core';
import { NavController, ActionSheetController, ActionSheet } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
Place_Marker;
place_id;


  constructor(public navCtrl: NavController, public LOCATE: LocateProvider, public storage: Storage, public action: ActionSheetController) {
    this.LOCATE.mapData();
    this.Place_Marker = this.LOCATE.placeMarker
    this.place_id = this.LOCATE.placeId
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



