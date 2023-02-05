import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactModel } from '../../models/contact.model';
import { ContactsService } from 'src/app/services/contacts.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-contacts-table',
    templateUrl: './contacts-table.component.html',
    styleUrls: ['./contacts-table.component.scss'],
})
export class ContactsTableComponent implements OnInit, OnDestroy {
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
    subGetContacts!: Subscription;
    subDeleteContacts!: Subscription;
    isLoading = false;
    errorMessage = '';

    constructor(private readonly contactsService: ContactsService) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.subGetContacts = this.contactsService
            .getContacts()
            .subscribe({
                next: (data) => (this.contacts = data.data),
                error: (err) => this.errorMessage = err,
                complete: () => this.isLoading = false
            });
    }

    onDelete(id: number): void {
        alert("Are you sure you want to delete this contact permanently?")
        this.subDeleteContacts = this.contactsService.deleteContact(id)
            .subscribe({
                next: () => {
                    const filteredContacts: ContactModel[] = this.contacts.filter(c => c.id !== id);
                    this.contacts = filteredContacts;
            },
                error: (err) => this.errorMessage = err,
                complete: () => this.isLoading = false
            });
    }

    ngOnDestroy(): void {
        if(this.subGetContacts) this.subGetContacts.unsubscribe();
        if(this.subDeleteContacts) this.subDeleteContacts.unsubscribe();
    }
}
