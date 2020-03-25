import { Component, OnInit, Input } from '@angular/core';
import { CountryStats } from '../models/country-stats.model';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  stats:CountryStats;

  constructor() { }

  ngOnInit() {
    
  }

}
