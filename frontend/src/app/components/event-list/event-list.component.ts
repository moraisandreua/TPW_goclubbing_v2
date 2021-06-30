import { Component, OnInit } from '@angular/core';
import {Event} from "../../Event";
import {EVENTS} from "../../eventslist";
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
  thisBusiness: string;


  constructor(private eventService : EventService) {
    this.thisBusiness = "Marbelo";
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

  private getMyBusiness(BUSINESS: Business[], thisBusiness: string) : any {
    for(let i = 0; i < BUSINESS.length; i++){
      if(BUSINESS[i].name == thisBusiness){
        return BUSINESS[i];
      }
    }
  }
}
