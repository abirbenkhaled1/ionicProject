import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AuthenticationService,
    public toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    // Initialize the login form with email and password fields with validation
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$')
        ]
      ]
    });
  }

  // Getter for form control errors
  get errorControl() {
    return this.loginForm.controls;
  }

  // Login function with console logs added
  async login() {
    console.log('Login initiated');

    const loading = await this.loadingCtrl.create();
    await loading.present();
    console.log('Loading spinner presented');

    if (this.loginForm.valid) {
      console.log('Login form is valid');
      const { email, password } = this.loginForm.value;
      console.log('Email:', email);
      console.log('Password:', password);

      try {
        // Call the authentication service to log the user in
        await this.authService.loginUser(email, password);
        console.log('Authentication successful');
        
        // Show success message
        await this.showToast('Login successful!');

        // Navigate to the home page after a successful login
        this.router.navigate(['/home']);
        console.log('Navigation to home page');
      } catch (error: any) {
        console.error('Error during login:', error);
        // Handle error if login fails
        await this.showToast('Login failed: ' + error.message);
      }
    } else {
      console.log('Login form is invalid');
      // Show validation error message
      await this.showToast('Please fill in the form correctly.');
    }

    await loading.dismiss();
    console.log('Loading spinner dismissed');
  }

  // Show toast message function
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
