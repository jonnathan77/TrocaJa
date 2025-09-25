import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, IonicModule, NavController } from '@ionic/angular';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private authService: AuthService,
    private navController: NavController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit() {}

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async onLogin() {
    console.log('Login form submitted:', this.loginForm.value);
     if (this.loginForm.valid) {
      this.isLoading = true;
      
      try {
        const { email, password } = this.loginForm.value;
        await this.authService.login(email, password);
        
        // Show success message
        const alert = await this.alertController.create({
          header: 'Sucesso!',
          message: 'Login realizado com sucesso!',
          buttons: ['OK']
        });
        await alert.present();

        // Navigate to tabs
        
      } catch (error) {
        // Show error message
        const alert = await this.alertController.create({
          header: 'Erro no Login',
          message: 'E-mail ou senha incorretos. Tente novamente.',
          buttons: ['OK']
        });
        await alert.present();
      } finally {
    this.navController.navigateForward('/tabs/home');
        this.isLoading = false;
      }
    }
    console.log('Redirecionamento feito!');
  }

  async forgotPassword() {
    const alert = await this.alertController.create({
      header: 'Recuperar Senha',
      message: 'Digite seu e-mail para receber as instruções de recuperação:',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'seu@email.com'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Enviar',
          handler: async (data) => {
            if (data.email) {
              try {
                await this.authService.forgotPassword(data.email);
                this.showForgotPasswordSuccess();
              } catch (error) {
                this.showForgotPasswordError();
              }
            }
          }
        }
      ]
    });

    await alert.present();
  }

  private async showForgotPasswordSuccess() {
    const alert = await this.alertController.create({
      header: 'E-mail Enviado',
      message: 'Verifique sua caixa de entrada para as instruções de recuperação de senha.',
      buttons: ['OK']
    });
    await alert.present();
  }

  private async showForgotPasswordError() {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: 'Não foi possível enviar o e-mail de recuperação. Tente novamente.',
      buttons: ['OK']
    });
    await alert.present();
  }

  goToRegister() {
    console.log('Navigating to register page...');
    this.router.navigate(['/register']);
  }

}
