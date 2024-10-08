import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public ngFireAuth: AngularFireAuth) { }

  // Method to register a new user
  async registerUser(email: string, password: string) {
    return await this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  // Method to log in an existing user
  async loginUser(email: string, password: string) {
    return await this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  // Method to reset password
  async resetPassword(email: string) {
    return await this.ngFireAuth.sendPasswordResetEmail(email);
  }

  // Method to sign out
  async signOut() {
    return await this.ngFireAuth.signOut();
  }

  // Method to get the current user profile
  async getProfile() {
    return await this.ngFireAuth.currentUser;
  }
}
