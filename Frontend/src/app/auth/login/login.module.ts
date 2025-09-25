import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginPageRoutingModule } from './login-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { LoginPage } from './login.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginPageRoutingModule,
  ],
  providers: [provideHttpClient()],
  declarations: [LoginPage]
})
export class LoginPageModule {}
