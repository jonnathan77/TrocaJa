import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonicModule,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { OficinaService } from '../../services/oficina.service'; // ajuste o caminho conforme sua estrutura
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detalhes-oficina',
  templateUrl: './detalhes-oficina.page.html',
  styleUrls: ['./detalhes-oficina.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DetalhesOficinaPage implements OnInit {
  oficinaId: string | null = null;
  oficina: any = null;

  constructor(
    private route: ActivatedRoute,
    private oficinaService: OficinaService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    this.oficinaId = this.route.snapshot.paramMap.get('id');
    console.log('ID recebido:', this.oficinaId);

    if (this.oficinaId) {
      await this.loadOficina(this.oficinaId);
    }
  }

  voltar() {
    this.navCtrl.back();
  }

  async loadOficina(id: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando oficina...',
    });
    await loading.present();

    this.oficinaService.getOficinaById(id).subscribe({
      next: async (data) => {
        this.oficina = data;
        await loading.dismiss();
      },
      error: async (err) => {
        console.error('Erro ao buscar oficina:', err);
        await loading.dismiss();

        const alert = await this.alertCtrl.create({
          header: 'Erro',
          message: 'Não foi possível carregar os dados da oficina.',
          buttons: ['OK'],
        });
        await alert.present();
      },
    });
  }
}
