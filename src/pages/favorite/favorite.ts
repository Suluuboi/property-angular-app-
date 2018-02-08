import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {storage, initializeApp} from 'firebase';
import {FIREBASE_CONFIG} from "../../app/app.firebase.config";
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {

  constructor(public navCtrl    : NavController, 
              public navParams  : NavParams,
              private camera    : Camera) {
                //You can check firebase.apps to see if its loaded. 
                //If your only loading it once, then you can just check the length. 
                //If you have multiple then you could check each apps name.
              //if (!firebase.apps.length) {
                 //firebase.initializeApp({});
              //}
  }

  

  openMoviesApp(){

    this.navCtrl.push('FilmPage')

  }

  

}
