import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {FIREBASE_CONFIG} from './app.firebase.config';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {CloudModule, CloudSettings } from '@ionic/cloud-angular';
import {FlexLayoutModule} from '@angular/flex-layout'
import { GetAccountDetailsProvider } from '../providers/get-account-details/get-account-details';
import { HttpModule } from '@angular/http';
import { GetPropertyProvider } from '../providers/get-property/get-property';
import { ImageProvider } from '../providers/image/image';
import { PreloaderProvider } from '../providers/preloader/preloader';
import { DatabaseProvider } from '../providers/database/database';

import { Camera, CameraOptions } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    FlexLayoutModule,
    AngularFireAuthModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GetAccountDetailsProvider,
    GetPropertyProvider,
    ImageProvider,
    PreloaderProvider,
    DatabaseProvider,
    Camera
  ]
})
export class AppModule {}
