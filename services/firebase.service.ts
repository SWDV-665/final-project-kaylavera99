// firebase.service.ts

import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  [x: string]: any;

  constructor(private db: AngularFireDatabase) { }

  // Create a new user in the database
  createUser(userId: string, userData: any) {
    return this.db.object(`users/${userId}`).set(userData);
  }

  // Get user data from the database
  getUser(userId: string) {
    return this.db.object(`users/${userId}`).valueChanges();
  }

  // Update user data in the database
  updateUser(userId: string, userData: any) {
    return this.db.object(`users/${userId}`).update(userData);
  }

  // Delete user data from the database
  deleteUser(userId: string) {
    return this.db.object(`users/${userId}`).remove();
  }
}
