import { Component, OnInit } from '@angular/core';
import { ContactModel } from '../../models/contact.model';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
    selector: 'app-contacts-table',
    templateUrl: './contacts-table.component.html',
    styleUrls: ['./contacts-table.component.scss'],
})
export class ContactsTableComponent implements OnInit {
    visibleColumns: string[] = [
        'id',
        'firstName',
        'lastName',
        'email',
        'address',
        'phoneNumber',
        'actions',
    ];
    contacts: ContactModel[] = [];

    constructor(private readonly contactsService: ContactsService) {}

    ngOnInit(): void {
        this.contactsService
            .getContacts()
            .subscribe((data) => (this.contacts = data.data));
    }
}
