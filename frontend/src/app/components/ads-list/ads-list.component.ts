import { Component, OnInit } from '@angular/core';
import {Ad} from "../../Ad"
import {Business} from "../../Business";
import {Event} from "../../Event"
import {EventService} from "../../services/event.service";
import {AdvertisementService} from "../../services/advertisement.service";

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css']
})
export class AdsListComponent implements OnInit {
  ads!: Ad[];
  events!: Event[]
  //profile: Business;

  thisBusiness: number;

  constructor(private eventService: EventService, private adService:AdvertisementService) {
    this.thisBusiness = 1;
    //this.profile = this.getMyBusiness(BUSINESS, this.thisBusiness);
  }

  ngOnInit(): void {
    this.getEvents();
    this.getAds();
  }

  getEvents(): void{
    this.eventService.getEvents().subscribe(events => this.events = events)
  }

  getAds() : void{
    this.adService.getAdvertisements().subscribe(ads => this.ads = ads);
  }

  private getMyBusiness(BUSINESS: Business[], thisBusiness: number) : any{ // TODO : Change this to use business service
    for(let i = 0; i < BUSINESS.length; i++){
      if(BUSINESS[i].id == thisBusiness){
        return BUSINESS[i];
      }
    }
  }

  getEvent(id : number) : any{
    for(let i = 0; i < this.events.length; i++){
      if(this.events[i].id == id){
        return this.events[i];
      }
    }
  }

  delete(ad : Ad) {
    this.adService.deleteAdvertisement(ad);
  }
}
