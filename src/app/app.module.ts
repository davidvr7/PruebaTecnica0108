import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { ListDestinationComponent } from './_components/destination/list-destination/list-destination.component';
import { CreateDestinationComponent } from './_components/destination/create-destination/create-destination.component';
import { DestinationService } from './_services/destination.service';
import { AsideComponent } from './_components/aside/aside.component';
import { HeaderComponent } from './_components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './_components/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { DestinationMockService } from './_services/destination-mock.service'; 
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@NgModule({
  declarations: [
    AppComponent, 
    ListDestinationComponent,
    CreateDestinationComponent,
    AsideComponent,
    HeaderComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule, 
    MatSlideToggleModule
  ],
  providers: [ 
    DestinationService,
    DestinationMockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
