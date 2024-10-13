import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/compat/database";

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
  filteredItems: Item[] = []; // New array for filtered items
  searchTerm: string = ''; // Search term

  constructor(private db: AngularFireDatabase) {}

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
      this.filteredItems = this.items; // Initialize filtered items
    });
  }

  deleteItem(id: string) {
    this.db.list('items').remove(id).then(() => {
      console.log(`Item with ID ${id} deleted successfully`);
      this.getItemsFromDatabase(); // Refresh the list
    }).catch(error => {
      console.error("Error deleting item:", error);
    });
  }

  filterItems() {
    if (!this.searchTerm) {
      this.filteredItems = this.items; // If no search term, show all items
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredItems = this.items.filter(item => 
      item.title.toLowerCase().includes(searchTermLower) || 
      item.description.toLowerCase().includes(searchTermLower)
    );
  }
}
