import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: false,
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
      rememberMe: [false]   // ✅ agora faz parte do form
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
    this.navController.navigateForward('/tabs/home');
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
