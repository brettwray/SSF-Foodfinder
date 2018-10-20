import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

declare var google;


@Injectable()
export class PlaceDetailsProvider {

  constructor(public http: HttpClient) {}

getPlaceInfo(ID, map) {
  console.log('1', ID, map)


let service = new google.maps.places.PlacesService(map)
console.log('2',service)

let getInfo = (place, status) => {
  console.log('3', place, status)
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log(place)
  } else {
    console.log('ERROR')
  }
}
let request = {
  placeId: ID,
  fields:['formatted_phone_number', 'formatted_address', 'opening_hours', 'photos', 'rating', 'reviews','website' ]
}

service.getDetails(request, getInfo)

}


}
