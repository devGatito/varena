import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'model-olivia',
  standalone: true,
  imports: [

    CommonModule
  ],
  templateUrl: './model-olivia.component.html',
  styleUrl: './model-olivia.component.scss'
})
export class modelOlivia {
  images = [
    'assets/images/olivia/iron-day.jpg',
    'assets/images/olivia/iron-tarde.jpg',
    'assets/images/olivia/ivory-tarde.jpg',

   
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
