import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

declare var google;


@Injectable()
export class PlaceDetailsProvider {
place_id:string;
data : {};
name: string;
phone_number: string;
address: string;
openNow: boolean;
hours: any;
photos = [] as URL[];
rating: number;
reviews: any;
website: string;
 constructor(public http: HttpClient) {}


getPlaceInfo = (ID, map) => {
this.place_id = ID;

let service = new google.maps.places.PlacesService(map)

let getInfo = async (place, status) => {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    this.name= place.name,
    this.phone_number= place.formatted_phone_number,
    this.address= place.formatted_address,
    this.openNow= place.opening_hours.open_now,
    this.hours= place.opening_hours.weekday_text,
    this.rating= place.rating,
    this.reviews= place.reviews,
    this.website= place.website
    
    for(let i = 0; i < place.photos.length; i++){
    this.photos[i] = place.photos[i].getUrl({
      maxWidth:500
    })
  }
  }   else {
  }
  
}
let request = {
  placeId: ID,
  fields:['formatted_phone_number', 'formatted_address', 'opening_hours', 'photos', 'rating', 'reviews','website', 'name' ]
}

service.getDetails(request, getInfo)
}


}
