import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
  {
    //Toggle Comment when Login is Built
    //path: '', redirectTo: 'login', pathMatch: 'full'
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'dashboard', component: DashboardComponent
  }
];
