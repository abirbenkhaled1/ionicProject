import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from "@angular/fire/compat/database";

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.page.html',
  styleUrls: ['./edit-item.page.scss'],
})
export class EditItemPage implements OnInit {

  itemId: string = ''; // Will hold the ID of the item being edited
  item: any = {}; // Will hold the details of the item being edited

  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    // Get the ID from the route
    this.itemId = this.route.snapshot.paramMap.get('id') as string;
    this.getItemDetails();
  }

  getItemDetails() {
    // Fetch the item details from the Firebase database using the item ID
    this.db.object(`items/${this.itemId}`).valueChanges().subscribe(item => {
      this.item = item;
    });
  }

  saveItem() {
    // Save the edited item back to the database
    this.db.object(`items/${this.itemId}`).update(this.item).then(() => {
      console.log("Item updated successfully");
    });
  }
}
