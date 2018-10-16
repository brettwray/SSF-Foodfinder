import { LocateProvider } from './../../providers/locate/locate';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {




  constructor(public navCtrl: NavController, public LOCATE: LocateProvider, public storage: Storage) {
    this.LOCATE.mapData();
  }


ionViewDidLoad(){
  this.LOCATE.drawMap();
}

}
