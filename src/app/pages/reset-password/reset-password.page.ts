import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  email:string;

  constructor(public authService:AuthenticationService, public router: Router) { }

  ngOnInit() {
  }


  async resetPassword() {
    this.authService.resetPassword(this.email).then(()=> {
      this.router.navigate(['/login'])
      console.log("Email sent")
    }
    
    ).catch((error) => {
      console.log(error)
    })
  } 

}
