import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReminderListComponent } from './reminders/reminder-list/reminder-list.component';
import { Reminder } from './models/reminder.model';
import { ReminderService, ReminderInterface } from './services/reminder/reminder.service';
import { UserService } from './services/user/user.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    ReminderListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  user_id = '1';

  remindersForMe: Map<number, ReminderInterface> = new Map();


  remindersForOthers: Reminder[] = [
    new Reminder('Send report to Alice', new Date()),
    new Reminder('Plan team outing', new Date())
  ];
  title = 'RemindAnyone';

  constructor(private reminderService: ReminderService,
    private userService: UserService) { }


  ngOnInit(): void {
    this.userService.getUserByID(this.user_id).subscribe(user => {
      let remindersIdBeforeUpdate = this.remindersForMe.keys();
      user.remindersForMe.forEach(reminderID => {
        this.reminderService.getReminderByID(reminderID).subscribe(reminder => {
          this.remindersForMe.set(reminderID, reminder);
        });
      });
      Array.from(remindersIdBeforeUpdate).forEach((reminderID: number) => {
        if (!user.remindersForMe.includes(reminderID)) {
          this.remindersForMe.delete(reminderID);
        }
      });
    });
  }

  getRemindersForMeArray(): ReminderInterface[] {
    return Array.from(this.remindersForMe.values());
  }

}
