import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Map } from 'maplibre-gl';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'projects-section',
  templateUrl: './projects.section.html',
  styleUrl: './projects.section.scss',
  imports: [TranslateModule, MatIconModule],
})
export class ProjectsSection implements OnInit, OnDestroy, AfterViewInit {
  public map: any;
  public onZoomDetected = signal<string | undefined>(undefined);
  public isMapLoaded = signal<boolean>(false);

  private isTouchDevice =
    'ontouchstart' in window || navigator.maxTouchPoints > 0;

  constructor(private translateService: TranslateService) {
    translateService.setDefaultLang('en');
    translateService.use('en');
  }

  ngOnInit(): void {
    this.map = new Map({
      container: 'map',
      style: { version: 8, sources: {}, layers: [] },
      center: [-0.29441497, 1.340374], // [lng, lat]
      zoom: 4.5,
      minZoom: 4.5,
      maxZoom: 9,
      maxBounds: [
        [-14.6088769, -10.3940444],
        [12.6197198, 10.03391759],
      ],
      maplibreLogo: false,
      attributionControl: false,
      scrollZoom: false,
      dragRotate: false,
    });
  }

  ngAfterViewInit(): void {
    this.map?.on('load', async () => {
      this.isMapLoaded.set(true);
      this.map.addSource('basemapSrc', {
        type: 'raster',
        tiles: [
          'https://middleearthmap.eu/tiles/basemap/data/basemap/{z}/{x}/{y}.png',
        ],
        tileSize: 256,
        minzoom: 4,
        maxzoom: 9,
      });

      this.map.addLayer({
        id: 'basemap',
        type: 'raster',
        source: 'basemapSrc',
      });

      /**
       * Only add this logic, if device is not touch-screen->
       */
      if (!this.isTouchDevice) {
        this.map.getCanvas().addEventListener(
          'wheel',
          (e: any) => {
            if (e.ctrlKey) {
              // Enable zooming if Ctrl is pressed
              if (!this.map.scrollZoom.isEnabled()) {
                this.map.scrollZoom.enable();
                this.onZoomDetected.set(undefined);
              }
            } else {
              // Disable otherwise
              this.map.scrollZoom.disable();
              this.onZoomDetected.set(
                this.translateService.currentLang === 'hu'
                  ? 'Ctrl + görgetés a nagyításhoz...'
                  : 'Zoom with ctrl+mwheel',
              );
            }
          },
          { passive: false },
        );
      }
    });
  }

  ngOnDestroy(): void {}
}
