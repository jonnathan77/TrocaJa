import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-agendar-servico',
  templateUrl: './agendar-servico.page.html',
  styleUrls: ['./agendar-servico.page.scss'],
  standalone: true,
   imports: [
    CommonModule,
    FormsModule,
    IonicModule // 👈 ADICIONE ISSO AQUI
  ]
})
export class AgendarServicoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
