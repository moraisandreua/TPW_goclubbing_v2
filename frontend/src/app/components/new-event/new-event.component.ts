import { Component, OnInit } from '@angular/core';
import {Event} from "../../Event";
import {EVENTS} from "../../eventslist";

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
  event: Event;
  events: Event[];

  thisBusiness : string;

  constructor() {
    this.event = new Event();
    this.events = EVENTS;

    this.thisBusiness = "Estudio 22"
  }

  ngOnInit(): void {
  }

  save(e : Event) : void{
    this.event.business.name = this.thisBusiness;
    this.events.push(this.event);
  }

}
