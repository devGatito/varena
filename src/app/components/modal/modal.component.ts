import { AfterViewInit, Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgFor],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }
}
