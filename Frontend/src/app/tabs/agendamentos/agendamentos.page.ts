import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Appointment {
  id: string;
  service: string;
  date: string;
  time: string;
  location: string;
  status: 'pending' | 'in-progress' | 'completed';
}

@Component({
  selector: 'app-agendamentos',
  templateUrl: 'agendamentos.page.html',
  styleUrls: ['agendamentos.page.scss'],
  standalone: false,
})
export class AgendamentosPage {

  upcomingAppointments: Appointment[] = [
    {
      id: '1',
      service: 'Troca de Óleo',
      date: '15/12/2024',
      time: '14:00',
      location: 'Oficina Central',
      status: 'pending'
    },
    {
      id: '2',
      service: 'Alinhamento',
      date: '18/12/2024',
      time: '10:30',
      location: 'Oficina Sul',
      status: 'pending'
    }
  ];

  completedAppointments: Appointment[] = [
    {
      id: '3',
      service: 'Revisão de Freios',
      date: '10/12/2024',
      time: '16:00',
      location: 'Oficina Central',
      status: 'completed'
    },
    {
      id: '4',
      service: 'Troca de Bateria',
      date: '05/12/2024',
      time: '09:00',
      location: 'Oficina Norte',
      status: 'completed'
    }
  ];

  constructor(private router: Router) {}

  getStatusIcon(status: string): string {
    switch (status) {
      case 'pending': return 'time';
      case 'in-progress': return 'refresh';
      case 'completed': return 'checkmark-circle';
      default: return 'help';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'pending': return 'warning';
      case 'in-progress': return 'primary';
      case 'completed': return 'success';
      default: return 'medium';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'in-progress': return 'Em Andamento';
      case 'completed': return 'Concluído';
      default: return 'Desconhecido';
    }
  }

  viewAppointmentDetail(appointmentId: string) {
    // Navigate to appointment detail page
    console.log('View appointment detail:', appointmentId);
    // this.router.navigate(['/appointment-detail', appointmentId]);
  }

  scheduleNewAppointment() {
    // Navigate to schedule new appointment page
    console.log('Schedule new appointment');
    // this.router.navigate(['/schedule-appointment']);
  }

}
