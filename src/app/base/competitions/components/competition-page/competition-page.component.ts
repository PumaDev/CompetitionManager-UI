import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isMobileVersion } from 'src/app/shared/screen-state/mobile.state';

@Component({
  selector: 'app-competition-page',
  templateUrl: './competition-page.component.html'
})
export class CompetitionPageComponent implements OnInit {

  competitionId: number;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.competitionId = Number(this.route.snapshot.paramMap.get('competitionId'));
  }

  isMobile(): boolean {
    return isMobileVersion();
  }
}
