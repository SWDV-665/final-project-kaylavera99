import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import {Router} from "@angular/router";
import { AuthenticationService } from 'src/app/authentication.service';
import {Route} from "@angular/router";
import {IonicModule} from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup

  constructor(private formBuilder:FormBuilder, public loadingCtrl: LoadingController, public authService:AuthenticationService, public router: Router) { }



  ngOnInit() {
    this.loginForm = new FormGroup ({
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


  async login() {
    const loading = await this.loadingCtrl.create();
    await loading.present();


    if (this.loginForm?.valid) {

      try {
        await this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password);
        loading.dismiss();
        this.router.navigate(['/home']);
      } catch (error) {
        console.log(error);
        loading.dismiss();


      }

      
    }

  }
  isFieldInvalid(fieldName: string) {
    const control = this.loginForm.get(fieldName);
    return control.touched && (control.value === '' || control.invalid);
  }


  isEmailInvalid() {
    const emailControl = this.loginForm.get('email');
    return emailControl.errors['pattern'] && emailControl.touched
  }

}
