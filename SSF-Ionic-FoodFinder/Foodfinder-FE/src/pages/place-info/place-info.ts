import { ImageViewerPage } from './../image-viewer/image-viewer';
import { PlaceDetailsProvider } from './../../providers/place-details/place-details';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
hours: any;
photos:{key : {}, url:{}};
rating: number;
ratingRound: number;
ratings: any;
reviews: any;
website: string;

  constructor(public navCtrl: NavController, public navParam: NavParams, public navParams: NavParams, public details: PlaceDetailsProvider) {
    this.name = this.navParam.get('name')
    this.phone_number = this.navParam.get('phone_number')
    this.address = this.navParam.get('address')
    this.openNow = this.navParam.get('openNow')
    this.hours = this.navParam.get('hours')
    this.photos = this.navParam.get('photos')
    this.rating = this.navParam.get('rating')
    this.ratingRound = Math.floor(this.navParam.get('rating'))
    this.reviews = this.navParam.get('reviews')
    this.website = this.navParam.get('website')
   }
  getRatings = () => {
   this.ratings = Array.from({length: this.ratingRound}, (r, i)=> i+1)
   return this.ratings
   }
   viewImages = () =>{
     this.navCtrl.push(ImageViewerPage,{
      name: this.name,
      photos: this.photos
     })
   }
ionViewDidEnter(){
this.getRatings()
}
}
