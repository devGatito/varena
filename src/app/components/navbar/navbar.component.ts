import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  menuOpen = false;

  toggleMenu() {
    if (window.innerWidth < 768) {
      this.menuOpen = !this.menuOpen;
    }

    if (this.menuOpen) {
      document.querySelector('.fix_form')?.classList.add('menu-opened');
    } else {
      document.querySelector('.fix_form')?.classList.remove('menu-opened');
    }
  }
}
