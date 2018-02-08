import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {User} from '../../modules/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../../pages/tabs/tabs';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';




@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
 

  user = {} as User;
  provider = {
    loggedin: false,
    name: '',
    profilePicture:'',
    email:''
  }

  myInput;

  constructor(private afauth: AngularFireAuth, private afdb:AngularFireDatabase, public ref: ChangeDetectorRef,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  //app login staff
  async login(user: User){
    try {
      var result = this.afauth.auth.signInWithEmailAndPassword(user.email, user.password);
      if(result){
        this.navCtrl.push(TabsPage);
      }
    } catch (error) {
      console.log(error);
    }
    
  }

  register(){
    this.navCtrl.push("RegisterPage");
  }

  //social media login staff
  loginP(provider){
    let signInProvider = null;
    switch(provider){
      case "facebook":
        signInProvider = new firebase.auth.FacebookAuthProvider();
        break;
      case "google":
        signInProvider = new firebase.auth.GoogleAuthProvider();
        break;
    }

    this.afauth.auth.signInWithPopup(signInProvider)
    .then( res =>{
      this.provider.loggedin = true;
      this.provider.email = res.user.email;
      this.provider.name = res.user.displayName;
      this.provider.profilePicture = res.user.photoURL;
      this.ref.detectChanges; //detect changes      
      console.log(res);
    })

  }

  signOut(){
    this.afauth.auth.signOut();
    this.provider.loggedin = false;
  }

  //save to database stuff
  saveToDB(){
    this.afdb.list("/myItem").push(this.myInput)
  }

  //uploade images to database
  uploadImage(){
    
  }
}
