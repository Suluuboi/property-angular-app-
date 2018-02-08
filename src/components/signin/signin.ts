import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, ModalController, Modal, Platform } from 'ionic-angular';
import { GetAccountDetailsProvider } from '../../providers/get-account-details/get-account-details';
import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { DatabaseProvider } from '../../providers/database/database';
import * as firebase from 'firebase';
import { Http } from '@angular/http';
import 'rxjs/Rx'

@IonicPage()
@Component({
  selector: 'signin',
  templateUrl: 'signin.html'
})
export class SigninComponent {

  public properties    : any;
  public displayP :Boolean;

  constructor(  public navCtrl       : NavController, 
                public navParams     : NavParams,
                private account      : GetAccountDetailsProvider,
                private platform     : Platform,
                private modalCtrl    : ModalController,
                private _IMG         : ImageProvider,
                private _LOADER      : PreloaderProvider,
                private _DB          : DatabaseProvider) {
        

  }



  loadAndParseProperties()
  {
    this.displayP = true;
    this.properties = this._DB.renderProperties();
     
  }

  //open a modal(of NewPropertyPage) to input data
  //take data placed in modal
  //use data from modal to creat a new property
  addProperty(){
    let modal = this.modalCtrl.create('NewPropertyPage');
    modal.onDidDismiss((data) =>
    {
       if(data) //
       {
          this.loadAndParseProperties;
       }
    });
    modal.present();

    
  }

  displayProperty(){

  }


  editProperty(property)
  {
     let params = { property: property, isEdited: true },
         modal  = this.modalCtrl.create('NewPropertyPage', params);

     modal.onDidDismiss((data) =>
     {
        if(data)
        {
           this.loadAndParseProperties;
        }
     });
     modal.present();
  }



  deleteProperty(property)
  {
     this._DB.deleteProperty(property.id)
     .then((data) =>
     {
        this.loadAndParseProperties;
     });
  }



  signIn(provider){
    
    this.account.loginP(provider);
    
  }

  signOut(){
    this.account.signOut();
  }

}
