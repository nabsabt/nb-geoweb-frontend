import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxVortexComponent } from '@omnedia/ngx-vortex';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [TranslateModule, NgxVortexComponent],
  providers: [TranslateService],
})
export class HomeComponent implements OnInit {
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
}
