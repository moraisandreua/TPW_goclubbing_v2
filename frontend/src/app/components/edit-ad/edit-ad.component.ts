import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Event} from "../../Event"
import {Ad} from "../../Ad";
import {EventService} from "../../services/event.service";
import {AdvertisementService} from "../../services/advertisement.service";

@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.component.html',
  styleUrls: ['./edit-ad.component.css']
})
export class EditAdComponent implements OnInit {
  @Input() ad!: Ad;

  events!: Event[];

  constructor(private route: ActivatedRoute, private location: Location, private eventService : EventService, private adService : AdvertisementService) {
  }

  ngOnInit(): void {
    this.getEvents()
    this.getAd();
  }

  getEvents(): void{
    this.eventService.getEvents().subscribe(events => this.events = events)
  }

  getAd() : void{
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.adService.getAdvertisement(id).subscribe(ad => this.ad = ad[0]);
  }

  getEvent(id : number) : any{
    for(let i = 0; i < this.events.length; i++){
      if(this.events[i].id == id){
        return this.events[i];
      }
    }
  }

  delete() : void{
    this.adService.deleteAdvertisement(this.ad);
  }

}
