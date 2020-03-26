import * as L from 'leaflet';
import { Circle } from './circle';
import { Marker } from './marker';
import { Tooltip } from './tooltip';

export class Map{
    constructor(public mapContainer:any){}

    addCircle(lat:number,lon:number,size:number=100,lineColor:string="red",fillColor:string="red"):Circle
    {
      var circle = L.circle([lat,lon], {
        color: lineColor,
        fillColor: fillColor,
        fillOpacity: 0.3,
        radius: size
      }).addTo(this.mapContainer);
      return circle;
    }

    addMarker(lat:number,lon:number):Marker
    {
      var marker = L.marker([ lat,lon]).addTo(this.mapContainer);
      return marker;
    }
  
    attachTooltip(marker,msg:string)
    {
      marker.bindTooltip(msg);
    }

    attachPopup(marker:any,msg:string)
    {
      marker.bindPopup(msg);
    }
    setView(lat:number,lon:number,zoom?:number)
    {
        if(zoom ==undefined)
        {
            this.mapContainer.setView([lat,lon]);
            return;
        }
        this.mapContainer.setView([lat,lon],zoom);
    }
}