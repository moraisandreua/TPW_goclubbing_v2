import { Component, Directive } from '@angular/core';
import { NgStyle } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent {
  title = 'Go Clubbing';
  mapWidth:number;
  mapHeight:number;
  mapStyle:string;
  map: any;

  constructor(){
    this.mapWidth=window.innerWidth;
    this.mapHeight=window.innerHeight;
    this.mapStyle="width:1030; height:81";
  }

  private initMap(): void {
    this.map = L.map('mymap', {
      center: [39.701104, -7.975786],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 7,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  public addMarker = (lat:number, long:number, descricao:string) => {
    var marker = L.marker([lat, long]).addTo(this.map).bindPopup(descricao);
  }

  ngAfterViewInit(): void {
    this.initMap();
    //this.mapHeight=(document.getElementById("navbar") as HTMLElement).clientHeight;
    //this.mapStyle="width: "+ this.mapWidth + "; height: " + this.mapHeight;
    this.addMarker(41.111639, -8.647544,"Minha casa")
    this.addMarker(41.096055, -8.656618,"Casa casa")
  }

}
