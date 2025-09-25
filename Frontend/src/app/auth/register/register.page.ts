import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule, // 🔹 Importa TODOS os componentes do Ionic: ion-input, ion-button, etc.
  ],
})
export class RegisterPage {
  registerForm: FormGroup;
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;
  acceptTerms = false;
  userType: string = 'user'; // padrão usuário

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private navController: NavController
  ) {
    this.registerForm = this.fb.group(
      {
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        businessName: [''],
        address: [''],
        cnpj: [''],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordsMatchValidator,
      }
    );
  }

  // 👉 valida se senha e confirmação são iguais
  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // 👉 checa se o campo é inválido
  isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async onUserTypeChange(event: any) {
    this.userType = event.detail.value;
  }

  async onRegister() {
    if (this.registerForm.valid && this.acceptTerms) {
      this.isLoading = true;
      const formData = this.registerForm.value;

      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        userType: this.userType,
        ...(this.userType === 'provider' && {
          businessName: formData.businessName,
          address: formData.address,
          cnpj: formData.cnpj,
        }),
      };

      this.authService.register(userData).subscribe({
        next: async () => {
          const alert = await this.alertController.create({
            header: 'Sucesso!',
            message: 'Cadastro realizado com sucesso!',
            buttons: ['OK'],
          });
          await alert.present();

          this.navController.navigateForward('/login');
        },
        error: async (err) => {
          const alert = await this.alertController.create({
            header: 'Erro no Cadastro',
            message:
              err.error?.error || 'Não foi possível realizar o cadastro.',
            buttons: ['OK'],
          });
          await alert.present();
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  goToLogin() {
    this.navController.navigateBack('/login');
  }

  showTerms(event: Event) {
    event.preventDefault();
    console.log('Exibir Termos de Uso');
  }

  showPrivacy(event: Event) {
    event.preventDefault();
    console.log('Exibir Política de Privacidade');
  }
}
