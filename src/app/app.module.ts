import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ContactsTableComponent } from './views/contacts-table/contacts-table.component';
import { EditContactComponent } from './views/edit-contact/edit-contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './views/loader/loader.component';
import { PaginationComponent } from './views/pagination/pagination.component';

@NgModule({
    declarations: [
        AppComponent,
        ContactsTableComponent,
        EditContactComponent,
        LoaderComponent,
        PaginationComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
