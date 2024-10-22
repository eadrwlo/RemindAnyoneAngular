import { Injectable } from '@angular/core';
import { Database, ref, onValue, DataSnapshot } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { UserInterface } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: Database) { }


  getUserByID(id: string): Observable<UserInterface> { // Change return type to ReminderInterface
    return new Observable(observer => {
      const dbRef = ref(this.db, `users/${id}`);
      const unsubscribe = onValue(dbRef, (snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
          observer.next(snapshot.val() as UserInterface); // Cast to ReminderInterface
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
