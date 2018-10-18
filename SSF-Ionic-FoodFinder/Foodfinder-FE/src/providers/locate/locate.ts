import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';

declare var google;

@Injectable()
export class LocateProvider {
//Initialize variables
  allPlaces: any;
  removedPlaces: any;
  newPlaces:any;
  map: any;
  marker: any;
  placeMarker:any;
  placeLoc: any;
  placeId: string;
  newPlace;
  //custom icon for places
  placeIcon = '../../assets/imgs/hamburger_emoji_64.png'
constructor(public http: HttpClient, public geolocation: Geolocation, public storage: Storage) {}
  
//Uses Ionic Geolocation to find the user, sets the users lat and long to storage. Called when app is initialized to speed up map drawing
getPosition() {
    this.geolocation.getCurrentPosition({enableHighAccuracy: true}).then((position)=> {
    this.storage.set('lat', position.coords.latitude);
    this.storage.set('lng', position.coords.longitude);    
  
    }).catch((error) =>{
      console.log('locateProvider - getCurrentPosition', error)
    })
  }
//Gets the users location from storage, defines the map and map options.  
async mapData() {
  let currentPos = {lat: await this.storage.get('lat'), lng: await this.storage.get('lng')}
  
  let mapOptions = {
    zoom: 15,
    center: currentPos,
    mapTypeControl: false,
  }
  //Draws the map, features, and defines the places service
  this.map = new google.maps.Map(document.getElementById('map'), mapOptions)
  this.marker = new google.maps.Marker({position: currentPos, map: this.map})
  let service = new google.maps.places.PlacesService(this.map);
  let nearbySearchOptions = {
    location: await currentPos,
    radius: 2000,
    type:['restaurant'],
    openNow: true,
  }
  //starts searching for nearby places
  let placeSearch = (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
    this.allPlaces = results;
    console.log(results,'results', results.length, this.allPlaces.length)
    let rand = this.allPlaces[(Math.random() * results.length) | 0]
    createMarker(rand);

    }
  }
  //QUESTIONABLE *Review This*
  let filterOutPlaces = () => {
    for (let i =0; i <= this.removedPlaces.length; i++){
      let remove = this.allPlaces.includes(this.removedPlaces[i].place_id)
      let removeIndex = this.allPlaces.indexOf(remove)
      this.newPlaces = this.allPlaces.splice(removeIndex, 1)
    }
    
  }
  
  
  let addToRadius = (currentRadius) =>{
    nearbySearchOptions.radius = currentRadius + 150;
    console.log('add', nearbySearchOptions.radius)
    service.nearbySearch(nearbySearchOptions, placeSearch)
  }
  this.newPlace = () => {
    if(this.allPlaces.length >= 1) {
      console.log(nearbySearchOptions.radius)
    this.placeMarker.setMap(null)
    let rand = this.allPlaces[(Math.random() * this.allPlaces.length) | 0]
    createMarker(rand)
    } else {
      addToRadius(nearbySearchOptions.radius)
    }
  }
  
    //refines the place search to a radius near the user, and refines the type of places
    service.nearbySearch(nearbySearchOptions, placeSearch);
  //creates a marker for the nearby place.
  let createMarker = async (place) => {
    this.placeLoc = place.geometry.location;
    this.placeId = place.id
        this.placeMarker = new google.maps.Marker({
          map: await this.map,
          position: this.placeLoc,
          icon: this.placeIcon,
          animation: google.maps.Animation.DROP,
        });
        let infowindow = new google.maps.InfoWindow({
          content: place.name
        })
        infowindow.open(this.map, this.placeMarker);
        let placeIndex = this.allPlaces.indexOf(place);
        this.removedPlaces = this.allPlaces.splice(placeIndex,1)
        console.log(this.allPlaces, this.allPlaces.length, this.removedPlaces)
  }

}
//draws the map, adds the user marker, and the place marker
drawMap(){
  this.map;
  this.marker;
  this.placeMarker;  
}
} 



