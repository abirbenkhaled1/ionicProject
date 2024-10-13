import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';

interface Item {
  id: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  itemId: string = ''; // The item ID passed from the route
  item: Item = { id: '', title: '', description: '' }; // Initialize with empty values

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id') as string; // Get the item ID from the route
    if (this.itemId) {
      this.getItem();
    }
  }

  getItem() {
    this.db.object<Item>(`items/${this.itemId}`).valueChanges().subscribe(data => {
      if (data) {
        this.item = { ...data, id: this.itemId }; // Set the item data
      }
    });
  }

  saveItem() {
    this.db.list('items').update(this.itemId, {
      title: this.item.title,
      description: this.item.description
    }).then(() => {
      console.log(`Item with ID ${this.itemId} updated successfully`);
      this.router.navigate(['/items']); // Navigate back to the item list after saving
    }).catch(error => {
      console.error('Error updating item:', error);
    });
  }
}
