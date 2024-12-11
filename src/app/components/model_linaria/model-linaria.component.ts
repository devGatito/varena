import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'model-linaria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './model-linaria.component.html',
  styleUrl: './model-linaria.component.scss',
})
export class modelLinaria {
  images = [
    'assets/images/linaria/ivory-tarde.jpg',
    'assets/images/linaria/planta-alta-instancia.png',
    'assets/images/linaria/planta-alta-estancia.png',
    'assets/images/linaria/planta-azoteo.png',
    'assets/images/linaria/planta-baja.png',
  ];

  currentIndex = 0;
  intervalId: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 4000);
  }

  showImage(index: number) {
    this.currentIndex = index;
    clearInterval(this.intervalId);
    this.startAutoSlide();
  }
}
