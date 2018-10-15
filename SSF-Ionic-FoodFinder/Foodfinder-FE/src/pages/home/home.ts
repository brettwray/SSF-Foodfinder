import { LocateProvider } from './../../providers/locate/locate';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

lat;
lng;


  constructor(public navCtrl: NavController, public LOCATE: LocateProvider, public storage: Storage) {

  }
 async getLocationData() {
  this.lat = await this.storage.get('lat');
  this.lng = await this.storage.get('lng');
  this.drawMap(this.lat, this.lng)
  }

async drawMap(latitude, longitude) {
let currentPos = {lat: await latitude, lng: await longitude};

let mapOptions = {
  zoom: 15,
  center: currentPos
}
let map = new google.maps.Map(document.getElementById('map'), mapOptions)
let marker = new google.maps.Marker({position: currentPos, map: map})
}

ionViewDidLoad(){
this.getLocationData()
}

}
