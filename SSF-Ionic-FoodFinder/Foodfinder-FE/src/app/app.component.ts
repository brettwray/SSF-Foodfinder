import { AccountPage } from './../pages/account/account';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocateProvider } from './../providers/locate/locate';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = AccountPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public LOCATE: LocateProvider) {
    platform.ready().then(() => {
      //starts the cordova geolocation process as soon as the app is ready
      this.LOCATE.getPosition();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  
  }
  
}

