import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  userType: 'user' | 'provider' = 'user';
  showPassword = false;
  showConfirmPassword = false;
  acceptTerms = false;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      businessName: [''],
      address: [''],
      cnpj: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    // Update form validation based on user type
    this.updateFormValidation();
  }

  passwordMatchValidator(control: AbstractControl): {[key: string]: any} | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onUserTypeChange(event: any) {
    this.userType = event.detail.value;
    this.updateFormValidation();
  }

  updateFormValidation() {
    const businessNameControl = this.registerForm.get('businessName');
    const addressControl = this.registerForm.get('address');

    if (this.userType === 'provider') {
      businessNameControl?.setValidators([Validators.required]);
      addressControl?.setValidators([Validators.required]);
    } else {
      businessNameControl?.clearValidators();
      addressControl?.clearValidators();
    }

    businessNameControl?.updateValueAndValidity();
    addressControl?.updateValueAndValidity();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async onRegister() {
    if (this.registerForm.valid && this.acceptTerms) {
      this.isLoading = true;
      
      try {
        const formData = this.registerForm.value;
        const userData = {
          ...formData,
          userType: this.userType
        };
        
        await this.authService.register(userData);
        
        // Show success message
        const alert = await this.alertController.create({
          header: 'Sucesso!',
          message: 'Conta criada com sucesso! Você já pode fazer login.',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.router.navigate(['/login']);
              }
            }
          ]
        });
        await alert.present();
        
      } catch (error) {
        // Show error message
        const alert = await this.alertController.create({
          header: 'Erro no Cadastro',
          message: 'Ocorreu um erro ao criar sua conta. Tente novamente.',
          buttons: ['OK']
        });
        await alert.present();
      } finally {
        this.isLoading = false;
      }
    }
  }


  async showTerms(event: Event) {
    event.preventDefault();
    const alert = await this.alertController.create({
      header: 'Termos de Uso',
      message: 'Aqui estariam os termos de uso da aplicação TrocaJá.',
      buttons: ['Fechar']
    });
    await alert.present();
  }

  async showPrivacy(event: Event) {
    event.preventDefault();
    const alert = await this.alertController.create({
      header: 'Política de Privacidade',
      message: 'Aqui estaria a política de privacidade da aplicação TrocaJá.',
      buttons: ['Fechar']
    });
    await alert.present();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
