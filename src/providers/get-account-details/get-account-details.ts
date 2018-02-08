import { Injectable, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Events, ToastController } from 'ionic-angular';
import { Provider } from '../../modules/provider';
import { AngularFireDatabase , FirebaseListObservable} from 'angularfire2/database';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class GetAccountDetailsProvider implements Provider {
  loggedin = false;
  name: ''
  profilePicture:''
  email:''

  displayProperty = false;
  
  //a list observable from the db
  property: FirebaseListObservable<any[]>;

  constructor(  private afauth: AngularFireAuth,
                private afdb:AngularFireDatabase,
              public toastCtrl  : ToastController, 
                //public ref: ChangeDetectorRef,
                private event: Events) {

    console.log('Hello GetAccountDetailsProvider Provider');
    
  }

  //social media login staff
  //switch login between facebok and twitter
  //based on the inpued text(provider)
  loginP(providerName){
    console.log("loginP() started"); 
    let signInProvider = null;
    switch(providerName){
      case "facebook":
        signInProvider = new firebase.auth.FacebookAuthProvider();
        break;
      case "google":
        signInProvider = new firebase.auth.GoogleAuthProvider();
        break;
    }

    
    this.afauth.auth.signInWithPopup(signInProvider)
    .then( res =>{
      this.loggedin = true;
      this.email = res.user.email;
      this.name = res.user.displayName;
      this.profilePicture = res.user.photoURL;
      //this.ref.detectChanges; //detect changes 
      console.log(" from signin with popup");     
      console.log(res);
    })

  }

  signOut(){
    this.afauth.auth.signOut();
    this.loggedin = false;
    this.displayProperty = false;
  }

  //function parameters will be placed into property object
  //property object will the be pushed into the data as an object
  addProperty(name, description, type){
    
    this.property = this.afdb.list('/ALL_PROPERTY');

    this.property.push({
      name: name,
      description: description,
      type: type
    })
    .then(resolve => {
      console.log('Succesfully uploadeded');
      this.sendNotification(name+" property was successfully saved")
    }, reject => {
      console.log('error uploading property');
      this.sendNotification("Sorry somthing went wrong try again")
    })
    .catch(reject => {
      console.log('catch');
      this.sendNotification("Sorry somthing went wrong try again")
    });

  }

  viewProperty(){
    this.displayProperty = true;
    this.property = this.afdb.list('/PROPERTY');
  }

  // Manage notifying the user of the outcome
  // of remote operations
  sendNotification(message)  : void
  {
     let notification = this.toastCtrl.create({
         message       : message,
         duration      : 3000
     });
     notification.present();
  }

}
