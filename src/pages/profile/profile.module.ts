import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';

import { SigninComponentM } from '../../components/signin/signin.module';


@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    SigninComponentM,
   
    
  ],
})

export class ProfilePageModule {}
