import * as L from 'leaflet';
import {Map} from '../helper/map';
export class LeafletAngular{
    static tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    static initializeMap(elementId,lat:number,lon:number):Map
    {
        var map:Map;
        var instance= L.map(elementId, {
            center: [ lat,lon ],
            zoom: 5
          });
        LeafletAngular.tiles.addTo(instance);
        map=new Map(instance);
        return map;
    }
}