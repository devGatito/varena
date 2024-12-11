import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-schedule-visit',
  standalone: true,
  imports: [

    CommonModule
  ],
  templateUrl: './schedule-visit.component.html',
  styleUrl: './schedule-visit.component.scss'
})
export class ScheduleVisitComponent {
  images = [
    'assets/images/galery/10.jpg',
    'assets/images/galery/13.jpg',
    'assets/images/galery/14.jpg'
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
