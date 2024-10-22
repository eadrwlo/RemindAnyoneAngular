import { Component, Input } from '@angular/core';
import { ReminderItemComponent } from '../reminder-item/reminder-item.component';
import { Reminder } from '../../models/reminder.model';


@Component({
  selector: 'app-reminder-list',
  standalone: true,
  imports: [ReminderItemComponent],
  templateUrl: './reminder-list.component.html',
  styleUrl: './reminder-list.component.css'
})
export class ReminderListComponent {
  @Input() reminders: Reminder[] = [];
}
