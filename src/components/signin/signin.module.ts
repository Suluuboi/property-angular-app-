import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SigninComponent } from './signin';

@NgModule({
  declarations: [
    SigninComponent,
  ],
  imports: [
    IonicModule
  ],
  exports: [
      SigninComponent
  ]
})
export class SigninComponentM {}