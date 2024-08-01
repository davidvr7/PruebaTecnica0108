import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDestinationComponent } from './_components/destination/list-destination/list-destination.component';
import { CreateDestinationComponent } from './_components/destination/create-destination/create-destination.component';
import { PageNotFoundComponent } from './_components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: ListDestinationComponent},
  { path: 'create-destination', component: CreateDestinationComponent },
  { 
    path: 'destination-detail/:id', 
    loadChildren: () => import('./_components/destination/destination-details/destination-details.module').then(m => m.DestinationDetailModule)
  },
  { path: '404', component: PageNotFoundComponent },  
  { path: '**', redirectTo: '/404' }  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
