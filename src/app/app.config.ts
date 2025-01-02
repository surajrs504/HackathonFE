import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { tokenInterceptor } from './core/interceptors/token/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    MsalService,
    MsalBroadcastService,
    provideHttpClient(withInterceptors([tokenInterceptor])),
  ],
};
