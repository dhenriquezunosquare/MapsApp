import { Component, OnInit } from '@angular/core';


interface MenuItem{
  ruta:string;
  nombre:string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  listMenu:MenuItem[]=[
    { ruta:'./mapas/fullscreen',nombre:'Mapas'},
    { ruta:'./mapas/zoomrange',nombre:'Zoom Range'},
    { ruta:'./mapas/marcadores',nombre:'Marcadores'},
    { ruta:'./mapas/propiedades',nombre:'Propiedades'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
