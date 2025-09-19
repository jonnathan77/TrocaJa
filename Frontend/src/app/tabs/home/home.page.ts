import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(private router: Router) {}

  goToServiceDetail(serviceId: string) {
    // Navigate to service detail page
    console.log('Navigate to service detail:', serviceId);
    // this.router.navigate(['/service-detail', serviceId]);
  }

  goToSearch() {
    this.router.navigate(['/tabs/buscar']);
  }

  goToAppointments() {
    this.router.navigate(['/tabs/agendamentos']);
  }

}
