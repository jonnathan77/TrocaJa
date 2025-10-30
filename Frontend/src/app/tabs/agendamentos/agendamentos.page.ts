import { Component, OnInit } from '@angular/core';
import {
  AgendamentoService,
  Agendamento,
} from '../../services/agendamento.service';
import { Router } from '@angular/router';

export interface Appointment {
  id: string;
  service: string;
  date: string;
  time: string;
  location: string;
  status: number; // agora é number (1 ou 2)
}

@Component({
  selector: 'app-agendamentos',
  templateUrl: 'agendamentos.page.html',
  styleUrls: ['agendamentos.page.scss'],
  standalone: false,
})
export class AgendamentosPage implements OnInit {
  upcomingAppointments: Appointment[] = [];
  completedAppointments: Appointment[] = [];

  constructor(
    private router: Router,
    private agendamentoService: AgendamentoService
  ) {}

  ngOnInit() {
    this.carregarAgendamentos();
  }

  carregarAgendamentos() {
    this.agendamentoService.getAgendamentos().subscribe({
      next: (agendamentos: Agendamento[]) => {
        const now = new Date();
        this.upcomingAppointments = [];
        this.completedAppointments = [];

        agendamentos.forEach((a) => {
          console.log(a.dataAgendamento);
          // Converter a string para Date
          const dataAgendamento = a.dataAgendamento
            ? new Date(a.dataAgendamento._seconds * 1000)
            : new Date();

          const appointment: Appointment = {
            id: a.id || a.uid || '',
            service: a.itens?.length
              ? a.itens.map((i: any) => i.nome).join(', ')
              : `${a.brand} ${a.model} ${a.year}`, // mostra o carro se não houver itens
            date: dataAgendamento.toLocaleDateString('pt-BR'),
            time: dataAgendamento.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            }),
            location: a.oficina?.nome || 'Não informado',
            status: Number(a.status), // 1 ou 2
          };

          if (appointment.status === 1) {
            this.upcomingAppointments.push(appointment);
          } else if (appointment.status === 2) {
            this.completedAppointments.push(appointment);
          }
        });
      },
      error: (err) => {
        console.error('Erro ao carregar agendamentos:', err);
      },
    });
  }

  getStatusIcon(status: number): string {
    switch (status) {
      case 1:
        return 'time'; // pendente
      case 2:
        return 'checkmark-circle'; // concluído
      default:
        return 'help';
    }
  }

  getStatusColor(status: number): string {
    switch (status) {
      case 1:
        return 'warning'; // pendente
      case 2:
        return 'success'; // concluído
      default:
        return 'medium';
    }
  }

  getStatusText(status: number): string {
    switch (status) {
      case 1:
        return 'Pendente';
      case 2:
        return 'Concluído';
      default:
        return 'Desconhecido';
    }
  }

  viewAppointmentDetail(appointmentId: string) {
    this.router.navigate(['/appointment-detail', appointmentId]);
  }
}
