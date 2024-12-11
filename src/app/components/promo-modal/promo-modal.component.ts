import { AfterViewInit, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-promo-modal',
  standalone: true,
  imports: [],
  templateUrl: './promo-modal.component.html',
  styleUrls: ['./promo-modal.component.scss'],
})
export class PromoModalComponent implements AfterViewInit, OnDestroy {
  modal!: HTMLDialogElement | null;
  visible = false;

  ngAfterViewInit(): void {
    this.modal = document.querySelector('dialog#promo');
    
    window.addEventListener('scroll', this.onScroll.bind(this));

    const buttonOpen = document.querySelector('a.promo') as HTMLAnchorElement;
    buttonOpen.addEventListener('click', () => {
      this.modal?.classList.remove('hidden');
      this.modal?.showModal();
      this.visible = true;
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll() {
    if (!this.visible && window.scrollY > 200) { 
      this.modal?.classList.remove('hidden');
      this.modal?.showModal();
      this.visible = true;
    }
  }

  onClose() {
    sessionStorage.removeItem('event_type');
    this.modal?.classList.add('hidden');
    this.modal?.close();
  }

  agendarCita() {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });

    sessionStorage.setItem('event_type', 'promocion');
    this.onClose();
  }
}
