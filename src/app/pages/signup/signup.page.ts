import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';

import { AuthenticationService } from 'src/app/authentication.service';
import {Router} from "@angular/router";
import {IonicModule} from '@ionic/angular';
import { SignupPageModule } from './signup.module';
import { addDoc, collection, getDocs } from "firebase/firestore";
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { Firestore } from '@angular/fire/firestore';
import { FirebaseService } from 'services/firebase.service';
import {AngularFirestore} from '@angular/fire/compat/firestore'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  
  

  constructor(private formBuilder:FormBuilder, public loadingCtrl: LoadingController, public authService:AuthenticationService, public router: Router, private afs: AngularFirestore) { }
  public regForm!: FormGroup;

  

  ngOnInit() {
    this.regForm = new FormGroup ({
      fullname: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')
      ]),
      password: new FormControl('', [
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'), 
        Validators.required,
    ])
    })



    
  }


   async signUp() {
    const loading = await this.loadingCtrl.create();
    await loading.present();


    if (this.regForm?.valid) {
      const {email, password, fullname} = this.regForm.value;
      
      const user = {
        userName:fullname,
        userEmail:email
      }
      
     await this.afs.collection('users').add(user);
      

      try {
        await this.authService.registerUser(this.regForm.value.email, this.regForm.value.password);
        loading.dismiss();
        this.router.navigate(['/home']);
        
        
      } catch (error) {
        console.log(error);
        loading.dismiss();


      }

      
    }

  }
  isFieldInvalid(fieldName: string) {
    const control = this.regForm.get(fieldName);
    return control.touched && (control.value === '' || control.invalid);
  }


  isEmailInvalid() {
    const emailControl = this.regForm.get('email');
    return emailControl.errors['pattern'] && emailControl.touched
  }
}








