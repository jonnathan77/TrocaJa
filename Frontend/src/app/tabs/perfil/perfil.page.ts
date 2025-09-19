import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService, User } from '../../services/auth.service';

interface UserProfile {
  name: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

interface AppSettings {
  notifications: boolean;
  location: boolean;
  darkMode: boolean;
}

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {

  userProfile: User | null = null;

  settings: AppSettings = {
    notifications: true,
    location: true,
    darkMode: false
  };

  constructor(
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userProfile = this.authService.getCurrentUser();
  }

  editProfile() {
    // Navigate to edit profile page
    console.log('Edit profile');
    // this.router.navigate(['/edit-profile']);
  }

  async changePassword() {
    const alert = await this.alertController.create({
      header: 'Alterar Senha',
      message: 'Funcionalidade em desenvolvimento',
      buttons: ['OK']
    });

    await alert.present();
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Confirmar Logout',
      message: 'Tem certeza que deseja sair da sua conta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Sair',
          role: 'destructive',
          handler: () => {
            this.authService.logout();
          }
        }
      ]
    });

    await alert.present();
  }

}
