import { Routes } from '@angular/router';
import { AuthenticatedComponent } from './pages/authenticated/authenticated.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthenticatedComponent,
    children: [
    
      {
        path: 'mailbox',
        loadChildren: () =>
          import('../mailbox/mailbox.route').then((m) => m.authRoutes),
      },
      {
        path:'**',
        redirectTo:'mailbox'
      }
    ],
  },
];
