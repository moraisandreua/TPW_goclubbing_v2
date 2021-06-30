import { Component, OnInit } from '@angular/core';
import {Event} from "../../Event";
import {EVENTS} from "../../eventslist";
import {Business} from "../../Business";
import {EventService} from "../../event.service";

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
  event: Event;

  profile!: Business;

  constructor(private eventService : EventService) {
    this.event = new Event();
    //this.profile =
  }

  ngOnInit(): void {
  }

  save(e : Event) : void{
    this.event.business = this.profile;
    this.eventService.createEvent(e);
  }

}
