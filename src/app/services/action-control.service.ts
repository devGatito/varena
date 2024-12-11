import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Config {
  [key: string]: string | number | boolean | null | undefined | any;
}

@Injectable({
  providedIn: 'root',
})
export class ActionControlService {
  // BehaviorSubject con un valor inicial
  private actionSource = new BehaviorSubject<{ flag: boolean; action: string }>(
    { flag: false, action: '' }
  );
  private configSource = new BehaviorSubject<Config>({
    landing: '',
    segment: '',
    prime: '',
    zoho: '',
    channel: '',
    google_conversion_id: '',
  });

  // Observable al que los componentes pueden suscribirse
  action$ = this.actionSource.asObservable();
  config$ = this.configSource.asObservable();

  constructor() {
    this.loadConfig();
  }

  async loadConfig() {
    const baseUrl = this.getBaseHref();
    const response = await fetch(`/assets/config.json`);
    const config = await response.json();
    this.setConfig({ ...config });
    sessionStorage.setItem('config', JSON.stringify(config));
  }

  // Método para emitir el valor booleano y la acción
  setAction(flag: boolean, action: string) {
    this.actionSource.next({ flag, action });
  }
  setConfig(data: any) {
    this.configSource.next({ ...data });
  }
  redirect(path: string): void {
    if (typeof window !== 'undefined') {
      const { hash, href } = window.location;
      const url = new URL(href);
      if (hash) {
        url.hash = '';
      }
      url.pathname += path;

      setTimeout(() => {
        window.location.href = url.toString();
      }, 2000);
    }
  }

  getBaseHref() {
    let baseHref = document.querySelector('base')?.getAttribute('href') || '/';

    if (baseHref === '/') {
      baseHref = '';
    }

    return baseHref;
  }

  getConfig(callback: Function) {
    return this.config$.subscribe((config) => callback(config));
  }
}
