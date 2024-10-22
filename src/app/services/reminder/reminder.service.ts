import { Injectable } from '@angular/core';
import { Database, ref, onValue, DataSnapshot } from '@angular/fire/database';
import { Observable } from 'rxjs';

export interface ReminderInterface {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  createdDate: Date;
  createdBy: number;
  severity: number;
  assignedTo: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor(private db: Database) { }

  // Get a single reminder by its ID
  getReminderByID(id: number): Observable<ReminderInterface> { // Change return type to ReminderInterface
    return new Observable(observer => {
      const dbRef = ref(this.db, `reminders/${id}`);
      const unsubscribe = onValue(dbRef, (snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
          observer.next(snapshot.val() as ReminderInterface); // Cast to ReminderInterface
        } else {
          observer.next(undefined); // Or handle the case where the reminder doesn't exist
        }
      }, error => {
        observer.error(error);
      });
      return { unsubscribe };
    });
  }
}

