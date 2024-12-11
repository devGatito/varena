import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent {
  onClose(){
    const popup247 = document.querySelector(".aviso-nom247");
    popup247?.classList.add("hide");
  }
}
