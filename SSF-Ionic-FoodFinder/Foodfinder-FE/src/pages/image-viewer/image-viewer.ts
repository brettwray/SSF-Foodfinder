import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-image-viewer',
  templateUrl: 'image-viewer.html',
})
export class ImageViewerPage {
  photos= [] as URL[];
  name: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.name = this.navParams.get('name')
    this.photos = this.navParams.get('photos')
  }

  ionViewDidLoad() {
    console.log('page loaded', this.photos)
  }

}
