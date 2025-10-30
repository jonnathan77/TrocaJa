import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AgendamentoService, Agendamento } from 'src/app/services/agendamento.service';

interface ItemPedido {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
}

interface Oficina {
  id: number;
  nome: string;
  endereco: string;
  avaliacao: number;
  totalAvaliacoes: number;
  horarioFuncionamento: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class CheckoutPage implements OnInit {
  itensSelecionados: ItemPedido[] = [];
  total: number = 0;
  oficinaSelecionada: Oficina | null = null;
  dataSelecionada: string = new Date().toISOString();
  observacoes: string = '';

  dataMinima: string = new Date().toISOString();
  dataMaxima: string = new Date(
    new Date().setMonth(new Date().getMonth() + 3)
  ).toISOString();

  produtos: any[] = [];
  brand: string = '';
  model: any;
  year: any;

  oficinas: Oficina[] = [
    {
      id: 1,
      nome: 'Oficina do João',
      endereco: 'Rua A, 123 - Centro',
      avaliacao: 4.8,
      totalAvaliacoes: 156,
      horarioFuncionamento: '08:00 - 18:00',
    },
    {
      id: 2,
      nome: 'Auto Center Silva',
      endereco: 'Av. Central, 456 - Jardim América',
      avaliacao: 4.6,
      totalAvaliacoes: 98,
      horarioFuncionamento: '07:00 - 19:00',
    },
    {
      id: 3,
      nome: 'Mecânica 24h',
      endereco: 'Rua das Flores, 789 - Vila Nova',
      avaliacao: 4.9,
      totalAvaliacoes: 203,
      horarioFuncionamento: '24 horas',
    },
  ];

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private agendamentoService: AgendamentoService
  ) {}

  ngOnInit() {
    // Recupera os itens do cardápio digital da navegação
    this.route.queryParams.subscribe((params) => {
      if (params['itens']) {
        this.itensSelecionados = JSON.parse(params['itens']);
        this.calcularTotal();
      }
    });
    this.route.queryParams.subscribe((params) => {
      if (params['itens']) {
        this.itensSelecionados = JSON.parse(params['itens']);
      }
      if (params['total']) {
        this.total = parseFloat(params['total']) || 0;
      }
      this.brand = params['brand'] || '';
      this.model = params['model'] || '';
      this.year = params['year'] || '';
    });
  }

  calcularTotal() {
    this.total = this.itensSelecionados.reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0
    );
  }

  async enviarPedido() {
    if (!this.oficinaSelecionada) {
      const alerta = await this.alertCtrl.create({
        header: 'Atenção',
        message: 'Por favor, selecione uma oficina para continuar.',
        buttons: ['OK'],
      });
      await alerta.present();
      return;
    }

    if (!this.dataSelecionada) {
      const alerta = await this.alertCtrl.create({
        header: 'Atenção',
        message: 'Por favor, selecione uma data para o agendamento.',
        buttons: ['OK'],
      });
      await alerta.present();
      return;
    }

    const confirmacao = await this.alertCtrl.create({
      header: 'Confirmar Agendamento',
      message: `
        Oficina: ${this.oficinaSelecionada.nome}
        Data: ${new Date(this.dataSelecionada).toLocaleDateString('pt-BR')}
        Total: R$ ${this.total.toFixed(2)}
      `,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.finalizarAgendamento();
          },
        },
      ],
    });

    await confirmacao.present();
  }

private async finalizarAgendamento() {
  if (!this.oficinaSelecionada) return;

  const agendamento = {
    itens: this.itensSelecionados,
    total: this.total,
    brand: this.brand,
    model: this.model,
    year: this.year,
    oficina: this.oficinaSelecionada,
    dataAgendamento: this.dataSelecionada,
    observacoes: this.observacoes
  };

  this.agendamentoService.salvarAgendamento(agendamento).subscribe({
    next: async () => {
      const sucesso = await this.alertCtrl.create({
        header: 'Agendamento Realizado!',
        message: 'Seu agendamento foi confirmado com sucesso.',
        buttons: [
          {
            text: 'OK',
            handler: () => this.navCtrl.navigateRoot('/tabs/home'),
          },
        ],
      });
      await sucesso.present();
    },
    error: async (err) => {
      console.error(err);
      const erro = await this.alertCtrl.create({
        header: 'Erro',
        message: 'Não foi possível salvar o agendamento. Tente novamente.',
        buttons: ['OK'],
      });
      await erro.present();
    },
  });
}


}
