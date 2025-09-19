import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
  color: string;
  fuelType: string;
}

@Component({
  selector: 'app-veiculos',
  templateUrl: 'veiculos.page.html',
  styleUrls: ['veiculos.page.scss'],
  standalone: false,
})
export class VeiculosPage {

  vehicles: Vehicle[] = [
    {
      id: '1',
      brand: 'Toyota',
      model: 'Corolla',
      year: 2020,
      plate: 'ABC-1234',
      color: 'Prata',
      fuelType: 'Flex'
    },
    {
      id: '2',
      brand: 'Honda',
      model: 'Civic',
      year: 2019,
      plate: 'XYZ-5678',
      color: 'Branco',
      fuelType: 'Flex'
    }
  ];

  constructor(private alertController: AlertController) {}

  addVehicle() {
    // Navigate to add vehicle page or show modal
    console.log('Add new vehicle');
    // this.router.navigate(['/add-vehicle']);
  }

  editVehicle(vehicleId: string) {
    // Navigate to edit vehicle page
    console.log('Edit vehicle:', vehicleId);
    // this.router.navigate(['/edit-vehicle', vehicleId]);
  }

  async deleteVehicle(vehicleId: string, event: Event) {
    event.stopPropagation(); // Prevent triggering editVehicle
    
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: 'Tem certeza que deseja excluir este veículo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            this.vehicles = this.vehicles.filter(v => v.id !== vehicleId);
          }
        }
      ]
    });

    await alert.present();
  }

}
