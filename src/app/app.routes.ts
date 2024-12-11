import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ThanksComponent } from './views/thanks/thanks.component';


export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'gracias', component: ThanksComponent },
  { path: '**', redirectTo: '/404' }
];
