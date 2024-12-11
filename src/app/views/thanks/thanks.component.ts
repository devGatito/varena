import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-thanks',
  standalone: true,
  imports: [],
  templateUrl: './thanks.component.html',
  styleUrl: './thanks.component.scss',
})
export class ThanksComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    document.body.classList.add('thanks');
  }
}
