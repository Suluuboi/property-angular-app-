import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal } from 'ionic-angular';

import { GetAccountDetailsProvider } from '../../providers/get-account-details/get-account-details';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  var = "facebook"

  constructor(  private modal: ModalController,
                private providedAccount: GetAccountDetailsProvider,
                public navCtrl: NavController,
                public navParams: NavParams) {

                  

  }



}
