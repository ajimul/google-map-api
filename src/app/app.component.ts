import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AutocompleteAddressService } from '../app/services/autocomplete-address.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'google-map-api';

  constructor(

  private googleMapService: AutocompleteAddressService,

  @Inject(PLATFORM_ID) private platformId: Object  ) {}

  @ViewChild('locationInput') locationInput!: ElementRef<HTMLInputElement>;

  private autocomplete: google.maps.places.Autocomplete | null = null;


  ngOnInit(): void {

      this.initializeMap();

  }

  async initializeMap(): Promise<void> {

    if (isPlatformBrowser(this.platformId)) {

      try {

        const google = await this.googleMapService.load();

        this.initAutocomplete(google);

      } catch (error) {

        console.error('Error loading Google Maps API:', error);
      }
    }
  }

  private initAutocomplete(googlex: typeof google): void {

    const input = document.getElementById('location') as HTMLInputElement;

    if (input) {

      this.autocomplete = new google.maps.places.Autocomplete(input, {

        componentRestrictions: { country: 'in' },

        fields: ['address_components', 'geometry', 'icon', 'name'],

        strictBounds: false,

        types: ['(regions)'],

      });

      this.autocomplete.addListener('place_changed', () => {

        const place = this.autocomplete!.getPlace();

        if (!place.geometry) {

          window.alert("No details available for input: '" + place.name + "'");

          return;

        }
        const firstPart = place.name!.split(',')[0].trim();

        console.log('Selected place:', firstPart);

      });
      
    } else {

      console.error('Location input element not found.');

    }
  }
}
