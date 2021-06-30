import { Component, OnInit } from '@angular/core';
import {Event} from "../../Event";
import {Ad} from "../../Ad";
import {ADS} from "../../adslist";
import {Comment} from "../../Comment";
import {COMMENTS} from "../../commentslist";
import {Business} from "../../Business";
import {BUSINESS} from "../../businesslist";
import {EventService} from "../../services/event.service";

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css'],
})
export class DashboardHomeComponent implements OnInit {
  events!: Event[];
  ads: Ad[];
  comments: Comment[];
  profile: Business;

  thisBusiness: number;

  constructor(private eventService: EventService) {
    this.ads = ADS;
    this.comments = COMMENTS;
    this.thisBusiness = 1;
    this.profile = this.getMyBusiness(BUSINESS, this.thisBusiness);
  }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void{
    this.eventService.getEvents().subscribe(events => this.events = events)
  }

  getMyBusiness(BUSINESS : Business[], thisBusiness: number) : any{
    for(let i = 0; i < BUSINESS.length; i++){
      if(BUSINESS[i].id == thisBusiness){
        return BUSINESS[i];
      }
    }
  }

  isMyEvent(id :number) : boolean{
    for(let i = 0; i < this.events.length; i++){
      if(this.events[i].id == id && this.events[i].business == this.thisBusiness){
        return true;
      }
    }
    return false;
  }

  getEventFromId(id : number) : any{
    for(let i = 0; i < this.events.length; i++){
      if(this.events[i].id == id){
        return this.events[i];
      }
    }
  }

  getCommentIndex(id : number) : any{
    for(let i = 0; i < this.comments.length; i++){
      if(this.comments[i].id == id){
        return i;
      }
    }
  }

  delete(id : number){
    const index: number = this.getCommentIndex(id);
    if (index !== -1) {
      this.comments.splice(index, 1);
    }
  }

}
