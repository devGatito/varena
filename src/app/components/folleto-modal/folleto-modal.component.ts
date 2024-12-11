import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormService } from '../../services/form.service';
import {
  UTMInterface,
  ZohoRequest,
  ZohoService,
} from '../../services/zoho.service';
import { ActionControlService } from '../../services/action-control.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folleto-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './folleto-modal.component.html',
  styleUrl: './folleto-modal.component.scss',
  providers: [FormService],
})
export class FolletoModalComponent implements AfterViewInit {
  modal!: HTMLDialogElement | null;
  errorForm: boolean = false;

  templateForm: ZohoRequest = {
    SingleLine: '',
    SingleLine1: '',
    PhoneNumber1_countrycode: '',
    Email: '',
    MultiLine:
      'He descargado su folleto de ventas pero me gustaría recibir atención personalizada',
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

  requiredData: any = ['SingleLine', 'SingleLine1', 'PhoneNumber1_countrycode'];

  constructor(
    public landingApi: FormService,
    public zohoApi: ZohoService,
    private actionControlService: ActionControlService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.modal = document.querySelector('dialog#folleto');
    const handle = document.querySelector('button.folleto');
    handle?.addEventListener('click', () => {
      this.modal?.classList.remove('hidden');
      this.modal?.showModal();
    });

    this.modal?.querySelector('button.close')?.addEventListener('click', () => {
      this.modal?.classList.add('hidden');
      this.modal?.close();
    });
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

    if (!formData?.MultiLine?.length) {
      formData.MultiLine =
        'Más información porfavor - Contacto vía Descarga Brochure';
    } else {
      formData.MultiLine =
        formData.MultiLine + ' - Contacto vía Descarga Brochure';
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
      .save({ ...formData, ...utms, form_type: 'brochure' })
      .subscribe(() => {});

    this.zohoApi.send(formData).subscribe(() => {
      console.log('send success zoho data');
    });

    this.templateForm = {
      ...this.templateForm,
      SingleLine: '',
      SingleLine1: '',
      PhoneNumber1_countrycode: '',
    };

    const url = '/varenna-residencial/assets/brochure.pdf';
    const anchor = document.createElement('a');
    anchor.setAttribute('href', url);
    anchor.setAttribute('download', 'brochure Varenna Residencial.pdf');
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    parent.postMessage(
      JSON.stringify({
        type: 'zoho.salesiq.apimessage',
        visitor: visitorinfo,
      }),
      '*'
    );

    this.modal?.classList.add('hidden');
    this.modal?.close();
    this.showSuccess();
  }

  showSuccess() {
    this.actionControlService.redirect('gracias');
    // this.router.navigate(['/gracias']);
  }
}
