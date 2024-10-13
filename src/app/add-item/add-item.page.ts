import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Import Firestore
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage   {

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore, // Inject Firestore
    private router: Router,
    private toastController: ToastController,
    private db :  AngularFireDatabase

  ) {
    this.itemForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }


  async addItem() {
    if (this.itemForm.valid) {
      // Récupérer les valeurs du formulaire

      const itemToPush = {
        name: "hello",
        description:" this.itemDescription",
        // Remove the unnecessary property
        // otherProperties: ...
      };
      try {
        // Add item directly to Firestore using AngularFirestore
        this.db.list('items').push(itemToPush).then(res => {
          console.log('Item added successfully');
        }).catch(err => {
          console.error('Error adding item:', err);
        });

        console.log('Document reference:'); // For reference

        // Afficher un message de succès
        await this.showToast('Item added successfully!');

        // Rediriger vers la liste des articles
        // this.router.navigate(['/items']);
      } catch (error) {
        // Gérer les erreurs
        console.error('Error adding item:', error);
        await this.showToast('Failed to add item. Please try again.');
      }
    } else {
      // Afficher un message si le formulaire est invalide
      await this.showToast('Please fill in all fields correctly.');
    }
  }

  // Méthode pour afficher un toast (notification)
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
