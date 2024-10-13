import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/compat/database";

// Define the structure of your item based on your database schema
interface Item {
  id: string; // ID will be a string
  title: string; // Title of the item
  description: string; // Description of the item
}

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {

  items: Item[] = []; // Use the defined Item interface

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    console.log("hello");
    this.getItemsFromDatabase();
  }

  getItemsFromDatabase() {
    // Replace 'items' with the path to your items in the Realtime Database
    this.db.list<Item>('items').snapshotChanges().subscribe(actions => {
      this.items = actions.map(action => {
        const data = action.payload.val() as Item; // Get the data
        const id = action.key as string; // Get the key as ID
        return {
          id: id, // Set the ID
          title: data.title || '', // Get the title, default to an empty string if not present
          description: data.description || '', // Get the description, default to an empty string if not present
        };
      });
      console.log(this.items);
    });
  }

  deleteItem(id: string) {
    // Remove the item from the database using its ID
    this.db.list('items').remove(id).then(() => {
      console.log(`Item with ID ${id} deleted successfully`);
    }).catch(error => {
      console.error("Error deleting item:", error);
    });
  }

}
