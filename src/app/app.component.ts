import { Component } from '@angular/core';
import { Routes, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nCovStats';
  constructor(public _route:Router){}
  ngOnInit()
  {
    this._route.navigateByUrl("/map");
  }
}
