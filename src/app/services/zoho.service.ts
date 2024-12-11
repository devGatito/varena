import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UTMInterface {
  [key: string]: any;
  utm_source: string;
  utm_campaign: string;
  utm_content: string;
}

export interface ZohoRequest {
  [key: string]: any;
  SingleLine: string;
  SingleLine1: string;
  PhoneNumber1_countrycode: string;
  Email: string;
  MultiLine: string;
  Dropdown1: string | null;
  Dropdown: string | null;
  Dropdown2: string | null;
  Dropdown3?: string | null;
  Dropdown5?: string | null;
  SingleLine4?: string | null;
  SingleLine5?: string | null;
  SingleLine2?: string | null;
  SingleLine3?: string | null;
  SingleLine6?: string | null;
  SingleLine7?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ZohoService {
  constructor(private http: HttpClient) {}
  // Reemplaza con la URL de tu formulario de Zoho
  private zohoFormUrl =
    'https://forms.zohopublic.com/rubamx/form/NewLandingMonterrey/formperma/GuQqyXXwjnrpdWWt5QcfNNP3zsjensKVED8F0f-eNPs/htmlRecords/submit';

  // Método para enviar los datos del formulario a Zoho usando FormData
  public send(datosFormulario: ZohoRequest): Observable<any> {
    console.log('ZohoService: ', datosFormulario);
    const formData: FormData = new FormData();

    // Agrega los datos del formulario al objeto FormData
    for (const key in datosFormulario) {
      if (datosFormulario.hasOwnProperty(key)) {
        const value: any = datosFormulario[key];
        formData.append(key, value);
      }
    }

    // Realiza la petición POST a Zoho
    return this.http.post(this.zohoFormUrl, formData);
  }

  // Método auxiliar para convertir los datos del formulario
  private convertirAFormatoZoho(datos: any): string {
    let cuerpoFormulario = '';
    for (const key in datos) {
      if (datos.hasOwnProperty(key)) {
        cuerpoFormulario += `${encodeURIComponent(key)}=${encodeURIComponent(
          datos[key]
        )}&`;
      }
    }
    return cuerpoFormulario.slice(0, -1); // Elimina el último '&'
  }

  // Método para extraer parámetros UTM de la URL
  public getUTMParams(url: string): any {
    const parametrosUTM: any = {};
    // Crea un objeto URL para parsear la URL y sus parámetros de consulta
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);

    // Itera sobre todos los parámetros de consulta
    params.forEach((value, key) => {
      // Verifica si el parámetro es UTM
      if (key.startsWith('utm_')) {
        parametrosUTM[key] = value;
      }
    });

    return parametrosUTM;
  }

  public validateForm(
    templateForm: ZohoRequest,
    camposRequeridos: string[]
  ): boolean {
    for (const campo of camposRequeridos) {
      if (!templateForm[campo] || templateForm[campo].trim() === '') {
        // Si el campo requerido está vacío o solo contiene espacios en blanco, retorna false
        return false;
      }
    }
    // Validación específica para el correo electrónico
    if (camposRequeridos.includes('Email') && !this.validEmail(templateForm.Email)) {
      return false;
    }
    // Validación específica para el número de teléfono
    if (camposRequeridos.includes('PhoneNumber1_countrycode') && !this.validPhone(templateForm.PhoneNumber1_countrycode)) {
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
}
