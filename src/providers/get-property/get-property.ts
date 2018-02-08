import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Events } from 'ionic-angular';
import { Provider } from '../../modules/provider';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import firebase from 'firebase';





@Injectable()
export class GetPropertyProvider {

  property: FirebaseListObservable<any[]>;

  constructor(public afdb         : AngularFireDatabase) {
                
  }


  //return a list of all items in the database
  //from the inserted location(location) 
  getAllProperty(location){
    this.property = this.afdb.list(location);
  }

}
