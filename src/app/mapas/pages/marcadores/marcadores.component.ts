import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface CustomMarker {
  color: string;
  marker: mapboxgl.Marker;
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css'],
})
export class MarcadoresComponent implements OnInit, AfterViewInit {
  @ViewChild('map') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 18;
  center: [number, number] = [-74.8087, 10.9688];

  markerArray: CustomMarker[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel, // starting zoom,
      scrollZoom: true,
      // projection: 'globe' // display the map as a 3D globe
    });

    this.readLocalStorage();

    // const markertHtml:HTMLElement  = document.createElement('div');
    // markertHtml.innerHTML='Hola Mundo';

    // const marker = new mapboxgl.Marker({
    //   // element: markertHtml
    // }).setLngLat(this.center).addTo(this.mapa);
  }

  addMarker() {
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color,
    })
      .setLngLat(this.center)
      .addTo(this.mapa);

    this.markerArray.push({ color: color, marker: newMarker });

    this.saveMarkerLocalStorage();

    newMarker.on('dragend', () => {
      this.saveMarkerLocalStorage(); //
    });
  }

  goMarker(marker: CustomMarker) {
    this.mapa.flyTo({
      center: marker.marker.getLngLat(),
    });
  }

  saveMarkerLocalStorage() {
    let lngLatArr: any = [];
    this.markerArray.forEach((element) => {
      const color = element.color;
      const { lng, lat } = element.marker.getLngLat();
      lngLatArr.push({ color, centro: [lng, lat] });
    });

    localStorage.setItem('markers', JSON.stringify(lngLatArr));
  }

  readLocalStorage() {
    if (!localStorage.getItem('markers')) return;

    const list = JSON.parse(localStorage.getItem('markers') || '');
    console.log(list);
    if (list) {
      list.forEach((marker: any) => {
        const newMarker = new mapboxgl.Marker({
          draggable: true,
          color: marker.color,
        })
          .setLngLat(marker.centro)
          .addTo(this.mapa);

        this.markerArray.push({ color: marker.color, marker: newMarker });

        newMarker.on('dragend', () => {
          this.saveMarkerLocalStorage(); //
        });
      });
    }
  }

  delete(i: number) {
    this.markerArray[i].marker?.remove();
    this.markerArray.splice(i, 1);
    this.saveMarkerLocalStorage();
  }
}
