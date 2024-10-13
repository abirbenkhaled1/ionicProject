import { Component, OnInit } from '@angular/core';
import {map, Observable} from 'rxjs';
import { Item, ItemService } from '../services/item.service';
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage   {



  constructor(private itemService: ItemService,private  db: AngularFireDatabase) {
  }




  deleteItem(id: number) {
    this.itemService.deleteItem(id);
  }


}
