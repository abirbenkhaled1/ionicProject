import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item, ItemService } from '../services/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {

  items$: Observable<Item[]>;


  constructor(private itemService: ItemService) { 
    this.items$ = this.itemService.getItems();
  }

  ngOnInit() { }

  deleteItem(id: number) {
    this.itemService.deleteItem(id);
  }

}
