import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContactModel } from 'src/app/models/contact.model';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
    selector: 'app-edit-contact',
    templateUrl: './edit-contact.component.html',
    styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent implements OnInit, OnDestroy {
    isAddMode = false;
    isLoading = false;
    id = 0;
    contact!: ContactModel;
    sub!: Subscription;
    errorMessage = '';

    contactForm: FormGroup = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        emailAddress: ['', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        address: [''],
        phoneNumber: ['', Validators.pattern('^[0-9\\s\\+]+$')]
    });

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private contactsService: ContactsService
    ) {}

    ngOnInit() {
      this.id = +this.route.snapshot.params['id'];

      if (this.id === 0) {
        this.isAddMode = true;
    };

      if (!this.isAddMode) {
        this.isLoading = true;
          this.sub = this.contactsService.getContactById(this.id).subscribe({
              next: (contact) => {
                this.contact = contact;
                this.initializeEditForm(this.contact);
            },
            error: (err) => this.errorMessage = err,
            complete: () => this.isLoading = false
            });
        }
    }

    initializeEditForm(contact: ContactModel): void {
        this.contactForm.patchValue({
            firstName: contact.firstName,
            lastName: contact.lastName,
            emailAddress: contact.emailAddress,
            address: contact.address,
            phoneNumber: contact.phoneNumber
          });
    }

    saveContact(contactForm: FormGroup) {
        this.isLoading = true;
        if (!this.isAddMode && contactForm.valid) {
            this.contactsService.updateContact(this.id, contactForm.value).subscribe({
                next: (contact) => console.log(contact),
                error: (err) => this.errorMessage = err,
                complete: () => this.isLoading = false
            });
        } else if(this.isAddMode && contactForm.valid) {
            this.contactsService.createContact(contactForm.value).subscribe({
                next: (contact) => console.log(contact),
                error: (err) => this.errorMessage = err,
                complete: () => this.isLoading = false
            })
        }

        console.warn('Your order has been submitted', this.contactForm.value);
        this.contactForm.reset();
        this.router.navigate(['']);
    }

    errorHandling = (control: string, error: string) => {
        return this.contactForm.controls[control].hasError(error);
    }

    onCancel(): void {
        this.router.navigate(['']);
    }

    ngOnDestroy(): void {
        if(!this.isAddMode) this.sub.unsubscribe();
    }
}
