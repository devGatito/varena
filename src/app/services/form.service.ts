import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ZohoRequest } from './zoho.service';
import { Observable } from 'rxjs';
import { ActionControlService } from './action-control.service';

const ZohoAliasForm: any = {
  SingleLine: 'name',
  SingleLine1: 'lastName',
  PhoneNumber1_countrycode: 'phone',
  Email: 'email',
  MultiLine: 'message',
  Dropdown1: 'city',
  Dropdown: 'project',
  Dropdown2: 'strategy',
  Dropdown3: 'media',
  Dropdown5: 'channel',
  SingleLine4: '', // Clave original vacía
  SingleLine5: '', // Clave original vacía
  SingleLine2: 'utm_campaigns',
  SingleLine3: 'utm_source',
  SingleLine6: 'utm_campaign',
  SingleLine7: 'utm_content',
  form_type: 'form_type',
};

@Injectable({
  providedIn: 'root',
})
export class FormService {
  config: any = {};
  // Reemplaza con la URL de tu formulario de Zoho
  baseUrl: string = 'https://monterrey.ruba.com.mx/services/api';

  constructor(private http: HttpClient, private service: ActionControlService) {
    this.service.getConfig((config: any) => {
      this.config = { ...config };
      this.baseUrl = config.channel;
    });
  }

  // Método para enviar los datos del formulario a Zoho usando FormData
  public save(datosFormulario: ZohoRequest): Observable<any> {
    let data: any = {};
    // Agrega los datos del formulario al objeto FormData
    for (const key in datosFormulario) {
      if (datosFormulario.hasOwnProperty(key)) {
        const value: any = datosFormulario[key];
        const landingKey: any = ZohoAliasForm[key];

        if (landingKey) {
          data[landingKey] = value;
        }
      }
    }

    const device = this.getDeviceType();
    data = { ...data, ...this.config, device };

    // Realiza la petición POST a landing api
    return this.http.post(`${this.baseUrl}/api/create_lead`, data);
  }
  public directSave(datosFormulario: any): Observable<any> {
    // Realiza la petición POST a landing api
    return this.http.post(`${this.baseUrl}/api/create_lead`, datosFormulario);
  }

  public validateForm(templateForm: any, camposRequeridos: string[]): boolean {
    for (const campo of camposRequeridos) {
      if (!templateForm[campo] || templateForm[campo].trim() === '') {
        // Si el campo requerido está vacío o solo contiene espacios en blanco, retorna false
        return false;
      }
    }
    // Validación específica para el correo electrónico
    if (
      camposRequeridos.includes('email') &&
      !this.validEmail(templateForm.email)
    ) {
      return false;
    }
    // Validación específica para el número de teléfono
    if (
      camposRequeridos.includes('phone') &&
      !this.validPhone(templateForm.phone)
    ) {
      return false;
    }
    // Si todos los campos requeridos están presentes, retorna true
    return true;
  }

  private validEmail(email: string): boolean {
    // Expresión regular para validar un correo electrónico básico
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regexEmail.test(email);
  }

  private validPhone(phone: string): boolean {
    const soloNumeros = phone.replace(/\D/g, '');
    return soloNumeros.length >= 10;
  }

  private getDeviceType(): string {
    const userAgent = navigator.userAgent;

    if (/mobile/i.test(userAgent)) {
      return 'Mobile';
    }

    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      return 'Tablet';
    }

    return 'Desktop';
  }
}
