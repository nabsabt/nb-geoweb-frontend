import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'projects-section',
  templateUrl: './projects.section.html',
  styleUrl: './projects.section.scss',
  imports: [TranslateModule],
})
export class ProjectsSection {
  constructor(private translateService: TranslateService) {
    translateService.setDefaultLang('en');
    translateService.use('en');
  }
}
