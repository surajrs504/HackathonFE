import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
];
