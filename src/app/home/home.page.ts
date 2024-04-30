import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import {Router} from "@angular/router";
import { FirebaseService } from 'services/firebase.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user:any

  constructor(public authService: AuthenticationService, public router: Router, private db: AngularFireDatabase) {
    this.user = authService.getProfile()

  }

  ngOnInit() {
    this.authService.getProfile().then(userProfile => {
      this.user = userProfile;
      console.log(userProfile)
    }).catch(error => {
      console.log(error);
      // Handle error if needed
    });
  }

  async logOut() {
    this.authService.signOut().then(() => {
      this.router.navigate(['/landing'])

    }).catch((error) =>{
      console.log(error);
    })

  }

}
