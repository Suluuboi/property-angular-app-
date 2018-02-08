import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';


import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { DatabaseProvider } from '../../providers/database/database';
import * as firebase from 'firebase';
//import { ImageProvider } from '../../providers/image/image';
//import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-new-property',
  templateUrl: 'new-property.html',
})
export class NewPropertyPage {

    public form                 : any;
    public propertiesImage  	  : any;
    public properties           : any;
    public propertyERF          : any     = '';
    public propertyDeposit      : any     = '';
    public propertyImage        : any     = '';
    public propertyTown         : any     = '';
    public propertyLocation     : any     = '';
    public propertyType         : any     = '';
    public propertyPrice        : any     = '';
    public propertyDescription  : any     = ''; 
    public propertyAGE          : any     = '';
    public propertyId           : string  = '';
    public isEditable           : boolean = false;

  // Initialise module classes
  constructor(  public navCtrl        : NavController,
                public params         : NavParams,
                private _FB 	        : FormBuilder,
                private _IMG          : ImageProvider,
                public viewCtrl       : ViewController,
                private _LOADER       : PreloaderProvider,
                private _DB           : DatabaseProvider)
  {

    this.form 		= _FB.group({
        'description' 		: ['', Validators.minLength(10)],
        'age' 		        : ['', Validators.maxLength(4)],
        'erf' 		        : ['', Validators.required],
        'image'		        : ['', Validators.required],
        'type'		        : ['', Validators.required],
        'location'        : ['', Validators.required],
        'town'		        : ['', Validators.required],
        'deposit'		      : ['', Validators.required],
        'price'		        : ['', Validators.required]
     });

     this.properties = firebase.database().ref('PROPERTY/');

     if(params.get('isEdited'))
        {
            let property 		    = params.get('property')
                
  
            this.propertyERF	          = property.erf;
            this.propertyDescription   	= property.description;
            this.propertyImage          = property.image;
            this.propertiesImage        = property.image;
            this.propertyTown           = property.town;
            this.propertyLocation       = property.location;
            this.propertyDeposit        = property.deposit;
            this.propertyPrice          = property.price;
            this.propertyId             = property.id;
            this.propertyType           = property.type;
  
  
            this.isEditable      = true;
        } 

   
  }

  saveProperty(val)
  {
     this._LOADER.displayPreloader();

     let    erf	            : string		= this.form.controls["erf"].value,
            town	          : string		= this.form.controls["town"].value,
            deposit	        : string		= this.form.controls["deposit"].value,
            location	      : string		= this.form.controls["location"].value,
            description 	  : string 		= this.form.controls["description"].value,
            type 	          : any		    = this.form.controls["type"].value,
            age    	        : string		= this.form.controls["age"].value,
            price    	      : string		= this.form.controls["price"].value,
            image           : string    = this.propertiesImage


     


    


     if(this.isEditable)
     {

        if(image !== this.propertyImage)
        {
           this._DB.uploadPropertyImage(image)
           .then((snapshot : any) =>
           {
              let uploadedImage : any = snapshot.downloadURL;

              this._DB.updatePropertyDatabase(this.propertyId,
              {
               erf          : erf,
               description  : description,
               town         : town,
               location     : location,
               image        : uploadedImage,
               type         : type,
               deposit      : deposit,
               price        : price,
               age          : age
            })
              .then((data) =>
              {
                 this._LOADER.hidePreloader();
              });

           });
        }
        else
        {

          this._DB.updatePropertyDatabase(this.propertyId,
          {
           erf              : erf,
           description      : description,
           town             : town,
           location         : location,
           type             : type,
           price            : price,
           deposit          : deposit,
           age              : age
        })
          .then((data) =>
          {
             this._LOADER.hidePreloader();
          });
      }

     }
     else
     {
        this._DB.uploadPropertyImage(image)
        .then((snapshot : any) =>
        {
           let uploadedImage : any = snapshot.downloadURL;

           this._DB.addPropertyToDatabase({
            erf             : erf,
            image           : uploadedImage,
            description     : description,
            town            : town,
            location        : location,
            type            : type,
            deposit         : deposit,
            price           : price,
            age             : age
         })
           .then((data) =>
           {
              this._LOADER.hidePreloader();
           });
        });

     }
     this.closeModal(true);
  }

  closeModal(val = null)
  {
     this.viewCtrl.dismiss(val);
  }


  selectImage()
  {
     this._IMG.selectImage()
     .then((data) =>
     {
        this.propertiesImage = data;
     }).catch(
       //do somthing when cant load image
     )
  }



  

}
