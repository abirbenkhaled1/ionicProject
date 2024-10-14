import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { AlertController } from '@ionic/angular'; // Import AlertController

interface Item {
  id: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {

  items: Item[] = [];
  filteredItems: Item[] = []; 
  searchTerm: string = ''; 

  constructor(private db: AngularFireDatabase, private alertController: AlertController) {} 

  ngOnInit() {
    this.getItemsFromDatabase();
  }

  getItemsFromDatabase() {
    this.db.list<Item>('items').snapshotChanges().subscribe(actions => {
      this.items = actions.map(action => {
        const data = action.payload.val() as Item;
        const id = action.key as string;
        return {
          id: id,
          title: data.title || '',
          description: data.description || '',
        };
      });
      this.filteredItems = this.items; 
    });
  }

  async confirmDelete(id: string) { 
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: `Do you really want to delete item "${id}"?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteItem(id); 
          },
        },
      ],
    });

    await alert.present();
  }

  deleteItem(id: string) {
    this.db.list('items').remove(id).then(() => {
      console.log(`Item with ID ${id} deleted successfully`);
      this.getItemsFromDatabase();
    }).catch(error => {
      console.error("Error deleting item:", error);
    });
  }

  filterItems() {
    if (!this.searchTerm) {
      this.filteredItems = this.items; 
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredItems = this.items.filter(item => 
      item.title.toLowerCase().includes(searchTermLower) || 
      item.description.toLowerCase().includes(searchTermLower)
    );
  }
}
