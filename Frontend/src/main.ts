import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { provideHttpClient } from '@angular/common/http';
import { LoginPage } from './app/auth/login/login.page';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));

