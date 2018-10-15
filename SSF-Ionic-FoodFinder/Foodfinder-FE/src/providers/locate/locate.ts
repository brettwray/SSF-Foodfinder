import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';

declare var google;

@Injectable()
export class LocateProvider {

constructor(public http: HttpClient, public geolocation: Geolocation, public storage: Storage) {}
  
getPosition() {
    this.geolocation.getCurrentPosition().then((position)=> {
    this.storage.set('lat', position.coords.latitude);
    this.storage.set('lng', position.coords.longitude);    
  
    }).catch((error) =>{
      console.log('locateProvider - getCurrentPosition', error)
    })
  } 
}

