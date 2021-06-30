import { Component, OnInit } from '@angular/core';
import {Event} from "../../Event";
import {Business} from "../../Business";
import {EventService} from "../../services/event.service";
import {BusinessService} from "../../services/business.service";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events!: Event[];
  profile!: Business;
  thisBusiness: number;


  constructor(private eventService : EventService, private businessService : BusinessService) {
    this.thisBusiness = parseInt(<string>localStorage.getItem("goclubbingBusinessID"));
  }

  ngOnInit(): void {
    this.getEvents();
    this.getMyBusiness(this.thisBusiness);
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

  private getMyBusiness(thisBusiness: number) : any {
    this.businessService.getBusiness(thisBusiness).subscribe(profile => this.profile = profile[0]);
  }
}
