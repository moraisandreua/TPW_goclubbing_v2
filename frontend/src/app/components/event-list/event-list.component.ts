import { Component, OnInit } from '@angular/core';
import {Event} from "../../Event";
import {BUSINESS} from "../../businesslist";
import {Business} from "../../Business";
import {EventService} from "../../services/event.service";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events!: Event[];
  profile: Business;
  thisBusiness: number;


  constructor(private eventService : EventService) {
    this.thisBusiness = 1;
    this.profile = this.getMyBusiness(BUSINESS, this.thisBusiness);
  }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): any{
    this.eventService.getEvents().subscribe(events => this.events = events);
  }

  getEvent(id : number) : any{
    this.eventService.getEvent(id);
  }

  delete(e : Event){
    this.eventService.deleteEvent(e);
  }

  //____________________________________________________________________

  private getMyBusiness(BUSINESS: Business[], thisBusiness: number) : any {
    for(let i = 0; i < BUSINESS.length; i++){
      if(BUSINESS[i].id == thisBusiness){
        return BUSINESS[i];
      }
    }
  }
}
