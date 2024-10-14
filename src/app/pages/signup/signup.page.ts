import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  regForm!: FormGroup; // FormGroup is required

  constructor(
    public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController, 
    public authService: AuthenticationService,
    public router: Router,
    public toastCtrl: ToastController // Add ToastController for notifications
  ) { }

  ngOnInit() {
    // Initialize the form group with validation
    this.regForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$')
      ]]
    });
  }

  // Helper method for form validation
  get errorControl() {
    return this.regForm.controls;
  }

  // Method to sign up or log in the user
  async signUp() {
    const loading = await this.loadingCtrl.create({
      message: 'Signing up...',
    });
    await loading.present();

    if (this.regForm.valid) {
      try {
        // Call authentication service to register or log in the user
        const user = await this.authService.registerUser(this.regForm.value.email, this.regForm.value.password);
        
        if (user) {
          await loading.dismiss();
          // Navigate to home on successful login
          this.router.navigate(['/item']);
          // Show a success toast
          this.showToast('Registration successful', 'success');
        }
      } catch (error) {
        await loading.dismiss();
        // Log the error and show an error message
        console.error('Error during registration', error);
        this.showToast('Registration failed. Please try again.', 'danger');
      }
    } else {
      // Handle form validation errors
      await loading.dismiss();
      this.showToast('Please fill out all fields correctly.', 'danger');
    }
  }

  // Method to show toast messages
  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: color,
    });
    toast.present();
  }
}
