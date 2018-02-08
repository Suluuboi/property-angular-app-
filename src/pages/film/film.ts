import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  Platform, ModalController } from 'ionic-angular';

import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { DatabaseProvider } from '../../providers/database/database';
import * as firebase from 'firebase';
import { Http } from '@angular/http';
import 'rxjs/Rx'

@IonicPage()
@Component({
  selector: 'page-film',
  templateUrl: 'film.html',
})
export class FilmPage {

  private auth     : any;
  public movies    : any;
  private email    : string = 'hans@gmail.com';
  private pass     : string = '123456';

  constructor(public navCtrl       : NavController, 
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
     .then(() =>
     {
        firebase.auth().signInWithEmailAndPassword(this.email, this.pass)
        .then((credentials) =>
        {
           this.loadAndParseMovies();
        })
        .catch((err : Error) =>
        {
           console.log(err.message);
        });
     });
  }

  loadAndParseMovies()
  {
     this.movies = this._DB.renderMovies();
     this._LOADER.hidePreloader();
  }

  addRecord()
  {
     let modal = this.modalCtrl.create('ModalPage');
     modal.onDidDismiss((data) =>
     {
        if(data)
        {
           this.loadAndParseMovies();
        }
     });
     modal.present();
  }


  editMovie(movie)
  {
     let params = { movie: movie, isEdited: true },
         modal  = this.modalCtrl.create('ModalPage', params);

     modal.onDidDismiss((data) =>
     {
        if(data)
        {
           this.loadAndParseMovies();
        }
     });
     modal.present();
  }



  deleteMovie(movie)
  {
     this._DB.deleteMovie(movie.id)
     .then((data) =>
     {
        this.loadAndParseMovies();
     });
  }

}
