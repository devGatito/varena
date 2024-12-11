import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { modelOlivia } from '../model_olivia/model-olivia.component';
import { modelLinaria } from '../model_linaria/model-linaria.component';
@Component({
  selector: 'app-models',
  standalone: true,
  imports: [CommonModule, modelOlivia, modelLinaria],
  templateUrl: './models.html',
  styleUrls: ['./models.component.scss'],
})
export class modelsComponent {
  activeButton: 'olivo' | 'linaria' = 'olivo';

  // Método para alternar el modelo
  toggleButton(button: 'olivo' | 'linaria'): void {
    this.activeButton = button;
    button === 'olivo' && this.resetEvent();
  }

  resetEvent() {
    sessionStorage.removeItem('event_type');
  }
  handleEvent() {
    sessionStorage.setItem('event_type', 'proximamente');
  }
}
