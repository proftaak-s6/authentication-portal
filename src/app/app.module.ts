import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MatToolbarModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MAT_DATE_LOCALE } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './pages/register/register.component';
import { MatProgressButtonsModule } from 'mat-progress-buttons';
import { AdminComponent } from './pages/admin/admin.component';
import {UserService} from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatProgressButtonsModule.forRoot()
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE, useValue: 'en-GB',
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
