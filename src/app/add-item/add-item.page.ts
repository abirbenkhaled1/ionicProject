import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private router: Router,
    private toastController: ToastController
  ) { 
    this.itemForm = this.formBuilder.group({
      title: ['',Validators.required],
      description:['', Validators.required],

    });
    }

  ngOnInit() {}

  async addItem(){
    if (this.itemForm.valid){
      // Récupérer les valeurs du formulaire
      const {title , description}=this.itemForm.value;

      try{
      // Appeler le service pour ajouter l'article
      this.itemService.addItem(title, description);
       // Afficher un message de succès
       await this.showToast('item addes successfully ');
       // Rediriger vers la liste des articles
       this.router.navigate(['/items']);
    }catch (error){
      // Gérer les erreurs
      console.error('Error adding item:', error);
      await this.showToast('Failed to add item. Please try again.');

    }
  }else {
     // Afficher un message si le formulaire est invalide
     await this.showToast('Please fill in all fields correctly.');

  }
}

 // Méthode pour afficher un toast (notification)
 async showToast(message: string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000,
    position: 'bottom',
  });
  toast.present();
}
}