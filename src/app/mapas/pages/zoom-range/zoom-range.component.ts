import { compileNgModule } from '@angular/compiler';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css'],
})
export class ZoomRangeComponent implements OnInit, AfterViewInit,OnDestroy {
  @ViewChild('map') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center:[number, number] = [-74.297333, 4.570868]
  constructor() {}

  

  ngOnInit(): void {}



  ngAfterViewInit() {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center:this.center, // starting position [lng, lat]
      zoom: this.zoomLevel, // starting zoom,
      scrollZoom: true,
      // projection: 'globe' // display the map as a 3D globe
    });

    this.mapa.on('zoom', (ev) => {
      this.zoomLevel = this.mapa.getZoom();
    });

    this.mapa.on('zoomend', (ev) => {
      if(this.mapa.getZoom() > 18 ){
        this.mapa.zoomTo(18);
      }
    });

    this.mapa.on('move',(event)=>{
      const target = event.target;
      target.getCenter();     
      this.center= [target.getCenter().lng, target.getCenter().lat];

    })

    this.mapa.on('style.load', () => {
      this.mapa.setFog({}); // Set the default atmosphere style
    });
  }

  zoomOut() {
    this.mapa.zoomOut();
  }

  zoomIn() {
    this.mapa.zoomIn();
  }

  zoomCambio(valor:string) {
    this.mapa.zoomTo(Number(valor));
  }


  ngOnDestroy(): void {
    this.mapa.off('zoom',()=>{});
    this.mapa.off('zoomend',()=>{});
    this.mapa.off('move',()=>{});
    this.mapa.off('style.load',()=>{});
  }
}
