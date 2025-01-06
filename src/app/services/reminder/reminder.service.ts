import { Injectable } from '@angular/core';
import {Database, ref, onValue, DataSnapshot, push, update, get, set} from '@angular/fire/database';
import { Observable } from 'rxjs';
import {Reminder} from "../../models/reminder.model";

export interface ReminderInterface {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  createdDate: string;
  createdBy: number;
  severity: number;
  assignedTo: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor(private db: Database) { }

  // Get a single reminder by its ID
  getReminderByID(id: string): Observable<ReminderInterface> { // Change return type to ReminderInterface
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

  addReminder(reminder: ReminderInterface) {
    console.log(reminder);
    const remindersRef = ref(this.db, 'reminders');
    const userRemindersForMeRef = ref(this.db, `users/${reminder.assignedTo}/remindersForMe`);
    const userRemindersForOthersRef = ref(this.db, `users/${reminder.createdBy}/remindersForOthers`);

    // Create a new reminder in the "reminders" collection
    const newReminderRef = push(remindersRef);
    const reminderId = newReminderRef.key;

    if (!reminderId) {
      throw new Error('Failed to generate a reminder ID.');
    }

    // Add the reminder to "reminders" collection
    update(ref(this.db), { [`reminders/${reminderId}`]: { ...reminder, id: reminderId } })
      .then(() => {
        // Update remindersForMe (assigned user)
        get(userRemindersForMeRef).then((snapshot) => {
          const currentList = snapshot.val() || [];
          if (Array.isArray(currentList)) {
            currentList.push(reminderId);
            set(userRemindersForMeRef, currentList);
          } else {
            set(userRemindersForMeRef, [reminderId]);
          }
        });

        // Update remindersForOthers (creator)
        get(userRemindersForOthersRef).then((snapshot) => {
          const currentList = snapshot.val() || [];
          if (Array.isArray(currentList)) {
            currentList.push(reminderId);
            set(userRemindersForOthersRef, currentList);
          } else {
            set(userRemindersForOthersRef, [reminderId]);
          }
        });
      })
      .catch((error) => {
        console.error('Failed to add reminder:', error);
        throw error;
      });
  }
}

