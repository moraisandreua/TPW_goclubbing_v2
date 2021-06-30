import { Component, OnInit } from '@angular/core';
import {Ad} from "../../Ad"
import {Business} from "../../Business";
import {Event} from "../../Event"
import {EventService} from "../../services/event.service";
import {AdvertisementService} from "../../services/advertisement.service";
import {BusinessService} from "../../services/business.service";
import {profilingEnabled} from "@angular-devkit/build-angular/src/utils/environment-options";

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css']
})
export class AdsListComponent implements OnInit {
  ads!: Ad[];
  events!: Event[]
  profile!: Business;

  thisBusiness: number;

  constructor(private eventService: EventService, private adService:AdvertisementService, private businessService : BusinessService) {
    this.thisBusiness = parseInt(<string>localStorage.getItem("goclubbingBusinessID"));
  }

  ngOnInit(): void {
    this.getEvents();
    this.getAds();
    this.getMyBusiness(this.thisBusiness);
  }

  getEvents(): void{
    this.eventService.getEvents().subscribe(events => this.events = events)
  }

  getAds() : void{
    this.adService.getAdvertisements().subscribe(ads => this.ads = ads);
  }

  private getMyBusiness(thisBusiness: number) : any{
    this.businessService.getBusiness(thisBusiness).subscribe(profile => this.profile = profile[0]);
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
