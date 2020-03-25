import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CountryStats } from '../models/country-stats.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(public httpClient:HttpClient) { }

  getAllByCountries():Observable<CountryStats[]>
  {
      return this.httpClient.get<CountryStats[]>(environment.api+"/countries");
  }
}
