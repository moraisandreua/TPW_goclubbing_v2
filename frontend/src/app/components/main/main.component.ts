import { Component, Directive } from '@angular/core';
import { NgStyle } from '@angular/common';
import * as L from 'leaflet';
import {Business} from "../../Business";
import {Event} from "../../Event";
import {BusinessService} from "../../services/business.service";
import {EventService} from "../../services/event.service";

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

  modalOpen:boolean=false;
  businesses: Business[]=[];
  business: Business=new Business();
  eventss: Event[]=[];

  constructor(private businessService:BusinessService, private eventsService:EventService){
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

  public addMarker = (id:number, lat:number, long:number, descricao:string) => {
    var marker = L.marker([lat, long]).addTo(this.map).bindPopup(descricao).on("click", () => {
      this.getBusiness(id);
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.getBusinesses();
    //this.mapHeight=(document.getElementById("navbar") as HTMLElement).clientHeight;
    //this.mapStyle="width: "+ this.mapWidth + "; height: " + this.mapHeight;
    //this.addMarker(41.111639, -8.647544,"Minha casa")
    //this.addMarker(41.096055, -8.656618,"Casa casa")
  }

  getBusinesses():void{
    this.businessService.getBusinesses().subscribe(b => {
      this.businesses=b;
      b.map(bus => this.addMarker(bus.id, bus.lat, bus.lng, bus.name));
    });
  }

  getBusiness(id:number):void{
    this.businessService.getBusiness(id).subscribe(b => {
      this.business=b[0]; // apesar de ser um array só é retornado uma valor
      (document.getElementById("modal") as HTMLElement).style.display="block";
      this.getEvents(b[0].id);
    });
  }

  getEvents(businessId:number):void{
    this.eventss=[]; // clear data

    this.eventsService.getEvents().subscribe(e => {
      e.map(ev => {
        if(ev.business==businessId){
          this.eventss.push(ev)
        }
      });
    });
  }
}
