import { Component, OnInit } from '@angular/core';
import {Ad} from "../../Ad"
import {Business} from "../../Business";
import {Event} from "../../Event"
import {ADS} from "../../adslist";
import {BUSINESS} from "../../businesslist";
import {EVENTS} from "../../eventslist"

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css']
})
export class AdsListComponent implements OnInit {
  ads: Ad[];
  events: Event[]
  profile: Business;

  thisBusiness: string;

  constructor() {
    this.ads = ADS;
    this.events = EVENTS;

    this.thisBusiness = "Estudio 22";
    this.profile = this.getMyBusiness(BUSINESS, this.thisBusiness);
  }

  ngOnInit(): void {
  }

  private getMyBusiness(BUSINESS: Business[], thisBusiness: string) : any{
    for(let i = 0; i < BUSINESS.length; i++){
      if(BUSINESS[i].name == thisBusiness){
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
}
