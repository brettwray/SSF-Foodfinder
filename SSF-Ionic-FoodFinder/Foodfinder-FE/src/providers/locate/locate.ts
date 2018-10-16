import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';

declare var google;

@Injectable()
export class LocateProvider {


  map: any;
  marker: any;
  infoWindow: any;
  placeMarker:any;
  placeIcon = '../../assets/imgs/hamburger_emoji_64.png'
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
  let service = new google.maps.places.PlacesService(this.map);
  
  let placeSearch = (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
    let rand = results[(Math.random() * results.length) | 0]
    createMarker(rand);
    }
  }
    
    service.nearbySearch({
    location: await currentPos,
    radius: 1000,
    type:['restaurant']
  }, placeSearch);

  let createMarker = async (place) => {
    let placeLoc = place.geometry.location;
        this.placeMarker = new google.maps.Marker({
          map: await this.map,
          position: placeLoc,
          icon: this.placeIcon
        });
  }
}
async drawMap(){
  await this.map;
  await this.marker;
  await this.placeMarker;
}
} 



