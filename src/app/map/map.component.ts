import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { StatsService } from '../service/stats.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private map;
  tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  constructor(public countryService:StatsService) { }

  ngOnInit() {
    this.initMap();

    this.loadCountriesStats();
  }

  loadCountriesStats()
  {
    this.countryService.getAllByCountries().subscribe(data=>{
      data.forEach(item=>{
        var marker=this.addCircle(item.countryInfo.lat,item.countryInfo.long,item.cases*10);
        this.attachTooltip(marker,item.country+"<br/>Cases:"+item.cases+"<br/>Deaths:"+item.deaths+"<br/>Recovered:"+item.recovered);
      })
    })
  }

  attachTooltip(obj:any,msg:string)
  {
    obj.bindTooltip(msg);
  }
  
  addMarker(lat:number,lon:number)
  {
    var marker = L.marker([ lat,lon]).addTo(this.map);
    return marker;
  }
  addCircle(lat:number,lon:number,size:number=100,lineColor:string="red",fillColor:string="red")
  {
    var circle = L.circle([lat,lon], {
      color: lineColor,
      fillColor: fillColor,
      fillOpacity: 0.5,
      radius: size
    }).addTo(this.map);
    return circle;
  }

  attachPopup(obj:any,msg:string)
  {
    obj.bindPopup(msg);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 14.599512, 120.984222 ],
      zoom: 5
    });
    this.tiles.addTo(this.map);
  }
}
