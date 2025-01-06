import {ReminderInterface} from "../services/reminder/reminder.service";

export class Reminder implements ReminderInterface {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    severity: number;
    createdDate: string;
    createdBy: number;
    assignedTo: number;

    constructor(title: string, dueDate: string, description: string, createdBy: number, assignedTo: number, severity: number = 2) {
        this.id = Math.floor(Math.random() * 1000000); // Auto-generate a random number for id
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.severity = severity;
        this.createdDate = "";
        this.createdBy = createdBy;
        this.assignedTo = assignedTo;
    }
}
