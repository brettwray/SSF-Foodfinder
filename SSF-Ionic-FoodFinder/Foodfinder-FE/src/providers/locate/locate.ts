import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';


@Injectable()
export class LocateProvider {

 
  
  constructor(public http: HttpClient, public geolocation: Geolocation) {

    this.geolocation.getCurrentPosition().then((p: position)=> {

    }).catch((error) =>{
      console.log('locateProvider - getCurrentPosition', error)
    })


  }
  mapOptions(latitude, longitude){

  }
  
}
