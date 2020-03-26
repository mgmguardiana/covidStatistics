import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { StatsService } from '../service/stats.service';
import { CountryStats } from '../models/country-stats.model';
import { Map } from '../helper/map';
import { LeafletAngular } from '../helper/leafletAngular';
import { HttpErrorResponse } from '@angular/common/http';
import { GyverToastrComponent, ModalType } from '../gyver-toastr/gyver-toastr.component';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map:Map;
  searchData:string="";
  countryStats:CountryStats[];
  activeFocus:CountryStats;
  isLoading:boolean;
  constructor(public countryService:StatsService,public title:Title) { }

  ngOnInit() {
    this.title.setTitle("Worldwide Statistics for Covid-19");
    this.map=LeafletAngular.initializeMap("map",14.599512, 120.984222);
    this.loadCountriesStats();
  }

  isSearchSatisfy(countryStat:CountryStats):boolean
  {
    return countryStat.country.toUpperCase().includes(this.searchData.toUpperCase());
  }

  loadCountriesStats()
  {
    this.isLoading=true;
    this.countryService.getAllByCountries().subscribe(data=>{
      this.isLoading=false;
      this.countryStats=data;
      GyverToastrComponent.displayModalWithType("Data were loaded",ModalType.SUCCESS);
      data.forEach(item=>{
        var marker=this.map.addCircle(item.countryInfo.lat,item.countryInfo.long,item.cases*10);
        this.map.attachTooltip( marker,item.country + "<br/>Cases:" + item.cases + "<br/>Deaths:" + item.deaths + "<br/>Recovered:" + item.recovered);
        item.tag=marker;
      })
    },(error:HttpErrorResponse)=>{
      alert("Error:" +error.error)
    })
  }

  focusToMap(countryStat:CountryStats)
  {
    if(this.activeFocus==undefined)
      this.activeFocus=countryStat;
    else
    {
      this.activeFocus.tag.closeTooltip();
      this.activeFocus=countryStat;
    }
    var marker=countryStat.tag;
    marker.openTooltip()
    this.map.setView(countryStat.countryInfo.lat,countryStat.countryInfo.long);
  }
}
