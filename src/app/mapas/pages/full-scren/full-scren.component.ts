import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-full-scren',
  templateUrl: './full-scren.component.html',
  styleUrls: ['./full-scren.component.css'],
})
export class FullScrenComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
   
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-74.297333, 4.570868], // starting position [lng, lat]
      zoom: 6, // starting zoom,
      scrollZoom:true
      // projection: 'globe' // display the map as a 3D globe
    });

    map.on('style.load', () => {
      map.setFog({}); // Set the default atmosphere style
    });
  }
}
