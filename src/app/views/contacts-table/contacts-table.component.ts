import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactModel } from '../../models/contact.model';
import { ContactsService, GetContactsQuery } from 'src/app/services/contacts.service';
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
    isLoading = false;
    errorMessage = '';
    page = 1;
    perPage = 0;
    totalItems = 0;
    totalPages = 0;
    subPaginate!: Subscription;
    subDeleteContacts!: Subscription;

    constructor(private readonly contactsService: ContactsService) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.paginate();
    }

    displayActivePage(activePageNumber:number): void{
        const query = {page: activePageNumber, perPage: this.perPage};
        this.paginate(query);
    }

    displayPerPage(perPage: number) {
        const query = {perPage: perPage};
        this.paginate(query)
    }

    paginate(query?: GetContactsQuery): void {
        this.subPaginate = this.contactsService.getContacts(query)
        .subscribe({
            next: (data) => {
                this.contacts = data.data;
                this.page = data.page;
                this.perPage = data.perPage;
                this.totalItems = data.totalItems;
                this.totalPages = data.totalPages;
            },
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
        if(this.subDeleteContacts) this.subDeleteContacts.unsubscribe();
        if(this.subPaginate) this.subPaginate.unsubscribe();
    }
}
