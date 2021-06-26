import { Component, OnInit } from '@angular/core';
import {Event} from "../../Event";
import {EVENTS} from "../../eventslist";
import {Ad} from "../../Ad";
import {ADS} from "../../adslist";
import {Comment} from "../../Comment";
import {COMMENTS} from "../../commentslist";
import {Business} from "../../Business";
import {BUSINESS} from "../../businesslist";

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css'],
})
export class DashboardHomeComponent implements OnInit {
  events: Event[];
  ads: Ad[];
  comments: Comment[];
  profile: Business;

  thisBusiness: string;

  constructor() {
    this.events = EVENTS;
    this.ads = ADS;
    this.comments = COMMENTS;
    this.thisBusiness = "Estudio 22";
    this.profile = this.getMyBusiness(BUSINESS, this.thisBusiness);
  }

  ngOnInit(): void {
  }

  getMyBusiness(BUSINESS : Business[], thisBusiness: String) : any{
    for(let i = 0; i < BUSINESS.length; i++){
      if(BUSINESS[i].name == thisBusiness){
        return BUSINESS[i];
      }
    }
  }

  isMyEvent(id :number) : boolean{
    for(let i = 0; i < this.events.length; i++){
      if(this.events[i].id == id && this.events[i].fk_business == this.thisBusiness){
        return true;
      }
    }
    return false;
  }

  getEvent(id : number) : any{
    for(let i = 0; i < this.events.length; i++){
      if(this.events[i].id == id){
        return this.events[i];
      }
    }
  }

}
