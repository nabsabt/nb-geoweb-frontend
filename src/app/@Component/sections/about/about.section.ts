import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'about-section',
  templateUrl: './about.section.html',
  styleUrl: './about.section.scss',
  imports: [TranslateModule],
})
export class AboutSection {
  constructor(private translateService: TranslateService) {
    translateService.setDefaultLang('en');
    translateService.use('en');
  }
}
