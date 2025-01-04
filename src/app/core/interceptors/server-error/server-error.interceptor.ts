import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { NotificationService } from '../../services/notification/notification.service';
import { AuthService } from '../../services/auth/auth.service';

export const serverErrorInterceptor: HttpInterceptorFn = (req, next) => {
  let notificationService = inject(NotificationService);
  let authService = inject(AuthService);
  return next(req).pipe(
    retry(1),
    catchError((err: HttpErrorResponse) => {
      const { status, statusText, error, message } = err;
      let errorMessage = '';
      if (
        status === 401 &&
        statusText === 'Unauthorized' &&
        error.detail === 'Invalid token'
      ) {
        errorMessage = 'Your session has been expired!. Please login again';
        notificationService.showError(errorMessage, 5);
        authService.logout();
      } else if (error instanceof ErrorEvent) {
        errorMessage = message;
        notificationService.showError(errorMessage, 5);
      } else {
        errorMessage = status + ':' + statusText;
        notificationService.showError(errorMessage, 5);
      }
      return throwError(() => err);
    })
  );
};
