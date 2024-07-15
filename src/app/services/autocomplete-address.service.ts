import { Injectable } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteAddressService {
  private loader: Loader;

  constructor() {
    this.loader = new Loader({
      apiKey: environment.googleMapsApiKey,
      version: 'weekly',
      libraries: ['places'],
    });
  }

  load(): Promise<typeof google> {
    return this.loader.load();
  }
}

