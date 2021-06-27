import { Component, OnInit } from '@angular/core';
import {Event} from "../../Event";
import {EVENTS} from "../../eventslist";
import {BUSINESS} from "../../businesslist";
import {Business} from "../../Business";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[];
  profile: Business;

  thisBusiness: string;

  constructor() {
    this.events = EVENTS;
    this.thisBusiness = "Estudio 22";
    this.profile = this.getMyBusiness(BUSINESS, this.thisBusiness);
  }

  ngOnInit(): void {
  }

  private getMyBusiness(BUSINESS: Business[], thisBusiness: string) : any {
    for(let i = 0; i < BUSINESS.length; i++){
      if(BUSINESS[i].name == thisBusiness){
        return BUSINESS[i];
      }
    }
  }

  getEventIndex(id : number) : any{
    for(let i = 0; i < this.events.length; i++){
      if(this.events[i].id == id){
        return i;
      }
    }
  }

  delete(id : number){
    const index: number = this.getEventIndex(id);
    if (index !== -1) {
      this.events.splice(index, 1);
    }
  }
}