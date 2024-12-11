import { AfterContentInit, AfterViewInit, Component } from '@angular/core';
import {
  ZohoRequest,
  ZohoService,
  UTMInterface,
} from '../../services/zoho.service';
import { FormService } from '../../services/form.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//@ts-ignore
import { ActionControlService } from '../../services/action-control.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  providers: [ZohoService, FormService],
})
export class FormComponent implements AfterViewInit {
  elements!: NodeListOf<HTMLElement>;
  handlers!: NodeListOf<HTMLElement>;
  headerForm!: HTMLElement | null;
  errorForm!: boolean;
  showForm!: boolean;
  form!: HTMLElement | null;
  isFooter: boolean = false;

  isCliked = false;
  message = 'CONTACTAR';
  templateForm: ZohoRequest = {
    SingleLine: '',
    SingleLine1: '',
    PhoneNumber1_countrycode: '',
    Email: '',
    MultiLine: '',
    Dropdown1: 'Monterrey',
    Dropdown: 'VARENNA RESIDENCIAL PRIMER SECTOR',
    Dropdown2: 'INTERNET MKT',
    Dropdown3: 'Landings',
    Dropdown5: 'Landing',
    SingleLine4: 'Landing Monterrey',
    SingleLine5: 'Por llamar',
    zf_referrer_name: '',
    zf_redirect_url: '',
    zc_gad: '',
  };

  requiredData: string[] = [
    'SingleLine',
    'SingleLine1',
    'PhoneNumber1_countrycode',
    'Email',
    'MultiLine',
  ];

  constructor(
    private zohoApi: ZohoService,
    private landingApi: FormService,
    private actionControlService: ActionControlService,
    private router: Router
  ) {}

  setStaticFooter(show: boolean) {
    if (window.screenX < 1024) {
      show && this.headerForm?.classList.add('static-footer');
      !show && this.headerForm?.classList.remove('static-footer');
    }
  }

  ngAfterViewInit(): void {
    this.initForm();
  }

  initForm() {
    this.showForm = false;
    this.form = document.querySelector('.fix_form');
    this.headerForm = document.getElementById('headerForm');
    this.handlers = document.querySelectorAll('.open-form');

    !!this.handlers.length &&
      this.handlers.forEach((handler) => {
        handler.addEventListener('click', () => {
          this.openForm();
        });
      });

    window.addEventListener('scroll', () => this.handleScroll());

    this.actionControlService.action$.subscribe(({ flag, action }: any) => {
      if (flag && action === 'form') {
        this.openForm();
      }
    });
  }

  handleScroll() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight / 2;
    const documentHeight = document.body.scrollHeight;

    // Si el scroll es menor a la altura de la pantalla o está cerca del pie de página
    if (window.innerWidth > 768) {
      if (
        // scrollTop < windowHeight ||
        scrollTop + windowHeight >
        documentHeight - windowHeight * 2
      ) {
        this.headerForm?.classList.remove('collapsed'); // Añade una clase CSS si es necesario.
        this.openForm();
      } else {
        this.headerForm?.classList.add('collapsed');
        this.close();
      }
    } else {
      this.headerForm?.classList.add('collapsed');
      this.close();
    }

    if (scrollTop < windowHeight) {
      this.form?.classList.add('position_header');
    } else {
      this.form?.classList.remove('position_header');
    }
    if (scrollTop + windowHeight > documentHeight - windowHeight * 2) {
      this.form?.classList.add('position_footer');
    } else {
      this.form?.classList.remove('position_footer');
    }
  }

  openForm() {
    this.setStaticFooter(true);
    this.showForm = true;
  }

  openWhatsApp() {
    this.actionControlService.setAction(true, 'whatsapp');
  }

  showSuccess() {
    this.actionControlService.redirect('gracias');
    // this.router.navigate(['/gracias']);
  }

  close() {
    this.showForm = false;
    this.setStaticFooter(false);
  }

  submit() {
    let visitorinfo = {};
    const formData: ZohoRequest = this.templateForm;
    const utms: UTMInterface = this.zohoApi.getUTMParams(window.location.href);

    if (utms.hasOwnProperty('utm_source')) {
      formData.SingleLine3 = utms.utm_source;
    }
    if (utms.hasOwnProperty('utm_campaign')) {
      formData.SingleLine6 = utms.utm_campaign;
    }
    if (utms.hasOwnProperty('utm_content')) {
      formData.SingleLine7 = utms.utm_content;
    }

    //proximamente
    const event_type = sessionStorage.getItem('event_type') || null;

    if (event_type === 'proximamente') {
      formData.MultiLine =
        formData.MultiLine + ' - Contacto vía botón proximamente';
    } else if (event_type === 'promocion') {
      formData.MultiLine = formData.MultiLine + ' - Contacto vía Promocion';
    } else {
      if (!formData?.MultiLine?.length) {
        formData.MultiLine =
          'Más información porfavor - Contacto vía Formulario';
      } else {
        formData.MultiLine = formData.MultiLine + ' - Contacto vía Formulario';
      }
    }

    formData.PhoneNumber1_countrycode =
      formData.PhoneNumber1_countrycode.replace(/[ \-\(\)\+]/g, '');

    const isValid: boolean = this.zohoApi.validateForm(
      formData,
      this.requiredData
    );

    if (!isValid) {
      this.errorForm = true;
      return;
    }

    visitorinfo = {
      ...visitorinfo,
      contactnumber: formData.PhoneNumber1_countrycode,
      name: formData.SingleLine,
      email: formData.Email,
    };

    this.landingApi
      .save({ ...formData, ...utms, form_type: event_type || 'contacto' })
      .subscribe(() => {});

    this.templateForm = {
      ...this.templateForm,
      SingleLine: '',
      SingleLine1: '',
      Email: '',
      PhoneNumber1_countrycode: '',
      MultiLine1: '',
    };

    parent.postMessage(
      JSON.stringify({
        type: 'zoho.salesiq.apimessage',
        visitor: visitorinfo,
      }),
      '*'
    );
    this.zohoApi.send(formData).subscribe(() => {
      console.log('send success zoho data');
    });

    this.close();
    this.showSuccess();
  }
}
