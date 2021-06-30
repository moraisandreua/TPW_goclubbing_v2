import {Component, Input, OnInit} from '@angular/core';
import {EVENTS} from "../../eventslist";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Event} from "../../Event";
import {EventService} from "../../services/event.service";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  @Input() event!: Event;

  constructor(private route: ActivatedRoute, private location: Location, private eventService : EventService) {}

  ngOnInit(): void {
    this.getEvent();
  }

  getEvent() : void{
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.eventService.getEvent(id).subscribe(event => this.event = event);
  }

  update() : void{
    this.eventService.updateEvent(this.event);
  }

  delete() : void{
    this.eventService.deleteEvent(this.event);
  }
}
