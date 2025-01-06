import { Component, EventEmitter, Output } from '@angular/core';
import {Reminder} from "../../models/reminder.model";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ReminderInterface} from "../../services/reminder/reminder.service";

@Component({
  selector: 'app-reminder-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reminder-form.component.html',
  styleUrl: './reminder-form.component.css'
})
export class ReminderFormComponent {
  users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    // Add more users as needed
  ];

  @Output() reminderCreated = new EventEmitter<ReminderInterface>();
  newReminder: ReminderInterface = new Reminder('',
                                        this.dateNowInLocalTimezoneIsoFormat(),
                                        // "2017-06-01T08:30",
                                        '',
                                        1,
                                        1);

  constructor() {}

  onSubmit(): void {
    // Emit the new reminder to the parent component
    console.log(this.newReminder);
    this.newReminder.createdDate = this.dateNowInLocalTimezoneIsoFormat()
    this.newReminder.assignedTo = parseInt(this.newReminder.assignedTo.toString());
    this.reminderCreated.emit(this.newReminder);

    // Reset the form
    this.newReminder = new Reminder('',
                                        this.dateNowInLocalTimezoneIsoFormat(),
                              '',
                               1,
                              1);
  }

  dateNowInLocalTimezoneIsoFormat(): string {
    return new Date().toLocaleString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Forces 24-hour format
    }).replace(", ", "T")
  }
}
