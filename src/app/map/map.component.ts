import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { StatsService } from '../service/stats.service';
import { CountryStats } from '../models/country-stats.model';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  static map;
  searchData:string="";
  countryStats:CountryStats[];

  tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  constructor(public countryService:StatsService) { }

  ngOnInit() {
    this.initMap();

    this.loadCountriesStats();
  }

  isSearchSatisfy(countryStat:CountryStats):boolean
  {
    return countryStat.country.toUpperCase().includes(this.searchData.toUpperCase());
  }
  loadCountriesStats()
  {
    this.countryService.getAllByCountries().subscribe(data=>{
      data.forEach(item=>{
        this.countryStats=data;
        var marker=this.addCircle(item.countryInfo.lat,item.countryInfo.long,item.cases*10);
        this.attachTooltip(marker,item.country+"<br/>Cases:"+item.cases+"<br/>Deaths:"+item.deaths+"<br/>Recovered:"+item.recovered);
      })
    })
  }

  focusToMap(countryStat:CountryStats)
  {
    var coordinates=[countryStat.countryInfo.lat,countryStat.countryInfo.long];
    MapComponent.map.setView(coordinates,7);
  }

  attachTooltip(obj:any,msg:string)
  {
    obj.bindTooltip(msg);
  }

  addMarker(lat:number,lon:number)
  {
    var marker = L.marker([ lat,lon]).addTo(MapComponent.map);
    return marker;
  }
  addCircle(lat:number,lon:number,size:number=100,lineColor:string="red",fillColor:string="red")
  {
    var circle = L.circle([lat,lon], {
      color: lineColor,
      fillColor: fillColor,
      fillOpacity: 0.3,
      radius: size
    }).addTo(MapComponent.map);
    return circle;
  }

  attachPopup(obj:any,msg:string)
  {
    obj.bindPopup(msg);
  }

  private initMap(): void {
    MapComponent.map = L.map('map', {
      center: [ 14.599512, 120.984222 ],
      zoom: 5
    });
    this.tiles.addTo(MapComponent.map);
    console.log(MapComponent.map);
  }
}
