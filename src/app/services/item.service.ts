import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';



export interface Item {
  id: number;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private items = new BehaviorSubject<Item[]>([]);
  private nextId = 1;



  addItem(title: string, description: string) {
    const newItem: Item = { id: this.nextId++, title, description };
    this.items.next([...this.items.getValue(), newItem]);
  }

  updateItem(id: number, title: string, description: string) {
    const updatedItems = this.items.getValue().map((item) =>
      item.id === id ? { ...item, title, description } : item
    );
    this.items.next(updatedItems);
  }

  deleteItem(id: number) {
    const filteredItems = this.items.getValue().filter((item) => item.id !== id);
    this.items.next(filteredItems);
  }

  constructor() { }
}
