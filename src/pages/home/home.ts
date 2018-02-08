import { Component } from '@angular/core';
import {IonicPage , NavController, NavParams, Platform, ModalController } from 'ionic-angular';

import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { DatabaseProvider } from '../../providers/database/database';
import {storage, initializeApp} from 'firebase';
import * as firebase from 'firebase';
import { Http } from '@angular/http';
import 'rxjs/Rx'


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  public properties    : any;
  

  constructor(  public navCtrl       : NavController, 
                public navParams     : NavParams,
                private platform     : Platform,
                private modalCtrl    : ModalController,
                private _IMG         : ImageProvider,
                private _LOADER      : PreloaderProvider,
                private _DB          : DatabaseProvider) {

           
                
                
      

  }

  ionViewDidEnter()
  {
     this._LOADER.displayPreloader();
     this.platform.ready()
     .then(() => {
        this.loadAndParseProperties()
     })
        
           
       
  }

  loadAndParseProperties()
  {
     this.properties = this._DB.renderProperties();
     this._LOADER.hidePreloader();
  }

  



  

}
