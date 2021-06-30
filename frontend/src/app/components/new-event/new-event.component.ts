import { Component, OnInit } from '@angular/core';
import {Event} from "../../Event";
import {EventService} from "../../services/event.service";

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
  event: Event;

  profile!: number;

  constructor(private eventService : EventService) {
    this.event = new Event();
    this.profile = 1
  }

  ngOnInit(): void {
  }

  save(e : Event) : void{
    this.event.business = this.profile;
    this.eventService.createEvent(e);
  }

}
