import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DestinationDetailsComponent } from './destination-details.component';

const routes: Routes = [
  { path: '', component: DestinationDetailsComponent }
];

@NgModule({
  declarations: [DestinationDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DestinationDetailModule { }
