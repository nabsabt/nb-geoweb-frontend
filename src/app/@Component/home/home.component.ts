import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxVortexComponent } from '@omnedia/ngx-vortex';
import { Dot, NgxMapComponent } from '@omnedia/ngx-map';
import { NgxMarqueeComponent } from '@omnedia/ngx-marquee';
import { NgxNeonUnderlineComponent } from '@omnedia/ngx-neon-underline';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    TranslateModule,
    NgxVortexComponent,
    NgxMapComponent,
    NgxMarqueeComponent,
    NgxNeonUnderlineComponent,
    RouterModule,
  ],
  providers: [TranslateService],
})
export class HomeComponent implements OnInit {
  dots: Dot[] = [
    {
      start: { lat: 34.0522, lng: -118.2437 }, // Los Angeles, USA
      end: { lat: 55.7558, lng: 37.6173 }, // Moscow, Russia
    },
    {
      start: { lat: -33.8688, lng: 151.2093 }, // Sydney, Australia
      end: { lat: 51.5074, lng: -0.1278 }, // London, UK
    },
    /* {
      start: { lat: -33.9249, lng: 18.4241 }, // Cape Town, South Africa
      end: { lat: 41.7151, lng: 44.8271 }, // Tbilisi, Georgia
    }, */
    {
      start: { lat: 35.6895, lng: 139.6917 }, // Tokyo, Japan
      end: { lat: 25.276987, lng: 55.296249 }, // Dubai, UAE
    },
  ];

  constructor(
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute
  ) {
    translateService.setDefaultLang('en');
    translateService.use('en');
  }
  ngOnInit(): void {
    this.activatedRoute.fragment.subscribe((fragment: string | null) => {
      if (fragment) this.jumpToSection(fragment);
    });
  }

  public jumpToSection(section: string): void {
    const element = document.getElementById(section);
    if (element) {
      const yOffset = window.innerWidth < 701 ? 75 : 100; // Adjust offset for mobile view
      const y =
        element.getBoundingClientRect().top + window.pageYOffset - yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  public navigateToExternalPage(url: string) {
    window.open(url, '_blank');
  }
}
