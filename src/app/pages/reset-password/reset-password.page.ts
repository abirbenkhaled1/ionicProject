import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  email: string = ''; // Initialize email as an empty string

  constructor(
    public authService: AuthenticationService,
    public toastController: ToastController
  ) {}

  ngOnInit() {}

  // Reset Password function with error handling
  async resetPassword() {
    if (!this.email) {
      // If email field is empty, show error toast
      this.showToast('Please enter your email address.');
      return;
    }

    try {
      // Call resetPassword method from the authentication service
      await this.authService.resetPassword(this.email);
      this.showToast('Password reset email sent! Check your inbox.');
    } catch (error) {
      console.error('Error resetting password:', error);
      this.showToast('Failed to send reset email. Please try again.');
    }
  }

  // Show toast message function
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
