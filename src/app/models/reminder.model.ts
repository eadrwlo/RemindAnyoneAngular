export class Reminder {
    id: number;
    title: string;
    description?: string;
    dueDate: Date;
    severity: number;
    createdDate: Date;

    constructor(title: string, dueDate: Date, description?: string, severity: number = 2) {
        this.id = Math.floor(Math.random() * 1000000); // Auto-generate a random number for id
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.severity = severity;
        this.createdDate = new Date(); // Automatically set to now when a new object is created
    }
}