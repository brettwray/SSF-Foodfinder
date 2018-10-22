import { PlaceDetailsProvider } from './../../providers/place-details/place-details';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StarRatingModule } from 'ionic3-star-rating'


@IonicPage()
@Component({
  selector: 'page-place-info',
  templateUrl: 'place-info.html',
})
export class PlaceInfoPage {
place_id:string;
name: string;
phone_number: string;
address: string;
openNow: boolean;
hours: [];
photos:{key : {}, url:{}};
rating: number;
reviews: [];
website: string;

  constructor(public navCtrl: NavController, public navParam: NavParams, public navParams: NavParams, public details: PlaceDetailsProvider, public stars: StarRatingModule) {
    this.name = this.navParam.get('name')
    this.phone_number = this.navParam.get('phone_number')
    this.address = this.navParam.get('address')
    this.openNow = this.navParam.get('openNow')
    this.hours = this.navParam.get('hours')
    this.photos = this.navParam.get('photos')
    this.rating = Math.floor(this.navParam.get('rating'))
    this.rating = this.navParam.get('reviews')
    this.reviews = this.navParam.get('reviews')
    this.website = this.navParam.get('website')
   }
  

   
ionViewDidEnter(){

}
}
