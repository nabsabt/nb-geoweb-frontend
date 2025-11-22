import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'skills-section',
  templateUrl: './skills.section.html',
  styleUrl: './skills.section.scss',
  imports: [TranslateModule],
})
export class SkillsSection {
  constructor(private translateService: TranslateService) {
    translateService.setDefaultLang('en');
    translateService.use('en');
  }
}
