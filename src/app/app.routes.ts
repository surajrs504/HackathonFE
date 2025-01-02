import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/pages/auth/auth.component';
import { CallbackComponent } from './shared/components/callback/callback.component';

export const routes: Routes = [
  {
    path: 'a',
    loadChildren: () =>
      import('./features/authenticated/authenticated.route').then(
        (m) => m.authRoutes
      ),
  },
  {
    path: '',
    component:AuthComponent,
    loadChildren: () =>
      import('./features/auth/auth.route').then((m) => m.authRoutes),
  },
  { path: 'callback', component: CallbackComponent },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
