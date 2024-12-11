import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  AfterViewInit,
  AfterContentChecked,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import 'brand-digitalbooting';
import { HeaderComponent } from './components/header/header.component';
import { FormComponent } from './components/form/form.component';
import { ModalComponent } from './components/modal/modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { FolletoModalComponent } from './components/folleto-modal/folleto-modal.component';
import { PopupComponent } from './components/popup/popup.component';
import { WhatsappFormComponent } from './components/whatsapp-form/whatsapp-form.component';
import { MoreInformationComponent } from './components/more-information/more-information.component';
import { ScheduleVisitComponent } from './components/schedule-visit/schedule-visit.component';
import { DepartmentComponent } from './components/department/department.component';
import { LocationComponent } from './components/location/location.component';
import { BrochureComponent } from './components/brochure/brochure.component';
import { ModalGalleryComponent } from './components/modal-gallery/modal-gallery.component';
import { CommonModule } from '@angular/common';
import { modelsComponent } from './components/models/models.component';
import { BannerComponent } from './components/banner/banner.component';
import { modelOlivia } from './components/model_olivia/model-olivia.component';
import { NotifySuccessComponent } from './components/notify-success/notify-success.component';
import { ActionControlService } from './services/action-control.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormComponent,
    FolletoModalComponent,
    PopupComponent,
    WhatsappFormComponent,
    // ModalGalleryComponent,
    CommonModule,
    NotifySuccessComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements AfterViewInit, AfterContentChecked {
  config: any = {};
  title = 'Varenna Residencial - Puebla';

  private observer: IntersectionObserver | null = null;

  constructor(private router: Router, private service: ActionControlService) {
    this.router.events.subscribe((event) => {
      this.observeElements();
      this.service.getConfig((config: any) => {
        console.log('config from action service ::', config);
        this.config = config;
      });

      if (event instanceof NavigationEnd) {
        // Notifica a GTM del cambio de página
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: 'pageview',
          pagePath: event.urlAfterRedirects,
        });

        // Detecta la página de "gracias" y ejecuta acciones específicas
        if (event.urlAfterRedirects === '/gracias') {
          this.trackConversion();
        }
      }
    });
  }

  trackConversion() {
    (window as any).dataLayer.push({
      event: 'conversion',
      conversion_id: this.config.google_conversion_id, // Cambia esto por el ID de conversión proporcionado
    });
  }

  ngAfterViewInit() {
    // document.addEventListener('contextmenu', function (e) {
    //   e.preventDefault();
    // });

    // document.addEventListener('keydown', function (e) {
    //   if (e.keyCode === 123) {
    //     e.preventDefault();
    //   }
    // });

    this.setupObserver();

    // Observa imágenes y animaciones al cambiar de ruta
    this.router.events.subscribe(() => {
      this.observeElements();
    });
  }

  // Este método asegura que el observador se aplique incluso si las imágenes y animaciones aparecen dinámicamente
  ngAfterContentChecked() {
    if (this.observer) {
      this.observeElements();
    }
  }

  // Configura el IntersectionObserver
  setupObserver() {
    let baseHref = this.service.getBaseHref();

    const config = {
      rootMargin: '0px 0px 50px 0px',
      threshold: 0.01,
    };

    this.observer = new IntersectionObserver((entries, self) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;

          // Carga de imágenes
          if (element.tagName === 'IMG' && element.hasAttribute('data-src')) {
            this.loadImage(element as HTMLImageElement, baseHref);
          }

          // Animaciones
          if (element.hasAttribute('data-animate')) {
            this.animateElement(element);
          }

          self.unobserve(element); // Dejar de observar el elemento después de su manipulación
        }
      });
    }, config);

    // Inicializar observación de imágenes y animaciones
    this.observeElements();
  }

  // Método para cargar la imagen diferida
  loadImage(img: HTMLImageElement, baseHref: string) {
    let dataSrc: string = '';
    //@ts-ignore
    const url = img.dataset?.src || img.src || '/';
    dataSrc = url.replace(/^https?:\/\/[^\/]+/, '');

    if (dataSrc.startsWith(baseHref)) {
      dataSrc = dataSrc.replace(new RegExp('^' + baseHref), '');
    }

    if (dataSrc) {
      img.setAttribute('src', `${baseHref}${dataSrc}`);
      img.onload = () => img.classList.add('loaded');
      img.removeAttribute('data-src');
    }
  }

  // Método para aplicar la animación
  animateElement(element: HTMLElement) {
    const animationClass = element.getAttribute('data-animate') || '';
    element.classList.add('animate__animated', animationClass);
  }

  // Observa imágenes con 'data-src' y elementos con 'data-animate'
  observeElements() {
    if (this.observer) {
      // Observa imágenes
      document
        .querySelectorAll('[data-src]')
        .forEach((img) => this.observer!.observe(img));

      // Observa elementos con animación
      document
        .querySelectorAll('[data-animate]')
        .forEach((el) => this.observer!.observe(el));
    }
  }
}
