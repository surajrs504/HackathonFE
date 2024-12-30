import { Routes } from '@angular/router';
import { MailboxComponent } from './pages/mailbox/mailbox.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: MailboxComponent,
  },
];
