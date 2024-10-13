// src/app/services/firebase.service.ts
import { Injectable } from '@angular/core';
import { Database, ref, get, child } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})

export class FirebaseService {
  constructor(private db: Database) {}

  async getItems() {
    console.log("inget item servie")
    const dbRef = ref(this.db);
    const snapshot = await get(child(dbRef, 'items'));
    if (snapshot.exists()) {
      console.log("exxxiiiisssttt")

      return snapshot.val();
    } else {
      console.error('No data available');
      return [];
    }
  }
}
