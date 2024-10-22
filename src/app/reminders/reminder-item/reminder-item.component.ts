import { Component, Input } from '@angular/core';
import { Reminder } from '../../models/reminder.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-reminder-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reminder-item.component.html',
  styleUrl: './reminder-item.component.css'
})
export class ReminderItemComponent {
  @Input() reminder!: Reminder;

  getSeverityClass() {
    switch (this.reminder.severity) {
      case 3:
        return 'severity-3';
      case 2:
        return 'severity-2';
      case 1:
        return 'severity-1';
      default:
        return '';
    }
  }
}
