import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReminderListComponent } from './reminders/reminder-list/reminder-list.component';
import { Reminder } from './models/reminder.model';
import { ReminderService, ReminderInterface } from './services/reminder/reminder.service';
import { UserService } from './services/user/user.service';
import {ReminderFormComponent} from "./reminders/reminder-form/reminder-form.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    ReminderListComponent,
    ReminderFormComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  user_id = '1';

  remindersForMe: Map<string, ReminderInterface> = new Map();
  remindersForOthers: Map<string, ReminderInterface> = new Map();

  title = 'RemindAnyone';

  constructor(private reminderService: ReminderService,
              private userService: UserService) {
  }


ngOnInit(): void {
  console.log('AppComponent: ngOnInit');
  this.userService.getUserByID(this.user_id).subscribe(user => {
    // Update remindersForMe (Map)
    const currentRemindersForMe = new Set(this.remindersForMe.keys());
    const updatedRemindersForMe = new Set(user.remindersForMe || []);

    // Add or update reminders in remindersForMe
    updatedRemindersForMe.forEach(reminderID => {
      if (!currentRemindersForMe.has(reminderID)) {
        this.reminderService.getReminderByID(reminderID).subscribe(reminder => {
          this.remindersForMe.set(reminderID, reminder);
        });
      }
      currentRemindersForMe.delete(reminderID);
    });

    // Remove outdated reminders from remindersForMe
    currentRemindersForMe.forEach(reminderID => {
      this.remindersForMe.delete(reminderID);
    });

    // Update remindersForOthers (Map)
    const currentRemindersForOthers = new Set(this.remindersForOthers.keys());
    const updatedRemindersForOthers = new Set(user.remindersForOthers || []);

    // Add or update reminders in remindersForOthers
    updatedRemindersForOthers.forEach(reminderID => {
      if (!currentRemindersForOthers.has(reminderID)) {
        this.reminderService.getReminderByID(reminderID).subscribe(reminder => {
          this.remindersForOthers.set(reminderID, reminder);
        });
      }
      currentRemindersForOthers.delete(reminderID);
    });

    // Remove outdated reminders from remindersForOthers
    currentRemindersForOthers.forEach(reminderID => {
      this.remindersForOthers.delete(reminderID);
    });
  });
}

  getRemindersForMeArray(): ReminderInterface[] {
    return Array.from(this.remindersForMe.values());
  }

  getRemindersForOthersArray(): ReminderInterface[] {
    return Array.from(this.remindersForOthers.values());
  }

  addReminder(reminder: ReminderInterface): void {
    reminder.createdBy = parseInt(this.user_id);
    this.reminderService.addReminder(reminder);
  }
}
