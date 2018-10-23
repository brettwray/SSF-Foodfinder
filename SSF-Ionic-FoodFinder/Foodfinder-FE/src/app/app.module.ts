import { ImageViewerPage } from './../pages/image-viewer/image-viewer';
import { PlaceInfoPage } from './../pages/place-info/place-info';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import { AccountPage } from './../pages/account/account';
import { Geolocation } from '@ionic-native/geolocation';
import { LocateProvider } from '../providers/locate/locate';
import { IonicStorageModule } from '@ionic/storage'
import { PlaceDetailsProvider } from '../providers/place-details/place-details';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AccountPage,
    PlaceInfoPage,
    ImageViewerPage
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AccountPage,
    PlaceInfoPage,
    ImageViewerPage    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    Geolocation,
    LocateProvider,
    PlaceDetailsProvider,
  ]
})
export class AppModule {}
