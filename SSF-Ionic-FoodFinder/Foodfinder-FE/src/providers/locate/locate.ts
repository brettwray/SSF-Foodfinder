import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';

declare var google;

@Injectable()
export class LocateProvider {

  map: any;
  marker: any;
  service: any;
  infoWindow: any;
  placeMarker:any;
constructor(public http: HttpClient, public geolocation: Geolocation, public storage: Storage) {}
  
getPosition() {
    this.geolocation.getCurrentPosition().then((position)=> {
    this.storage.set('lat', position.coords.latitude);
    this.storage.set('lng', position.coords.longitude);    
  
    }).catch((error) =>{
      console.log('locateProvider - getCurrentPosition', error)
    })
  }
async mapData() {
  let currentPos = {lat: await this.storage.get('lat'), lng: await this.storage.get('lng')}

  let mapOptions = {
    zoom: 15,
    center: currentPos
  }
  this.map = new google.maps.Map(document.getElementById('map'), mapOptions)
  this.marker = new google.maps.Marker({position: currentPos, map: this.map})

  this.service = new google.maps.places.PlacesService(this.map);
  this.service.nearbySearch({
    location: currentPos,
    radius: 500,
    type:['restaurant']
  }, this.placeSearch);
}
  async placeSearch(results, status){
    console.log('place search ran', results, status)
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      let rand = results[(Math.random() * results.length) | 0]
      this.placeMarker = new google.maps.marker({
        map: await this.map,
        position: rand.geometry.location
      })
    }
  }

async drawMap(){
  await this.map;
  await this.marker;
  
  await this.placeMarker;
}
} 


