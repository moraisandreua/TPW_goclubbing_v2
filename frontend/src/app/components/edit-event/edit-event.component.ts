import {Component, Input, OnInit} from '@angular/core';
import {EVENTS} from "../../eventslist";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  @Input() event: any;

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.getEvent();
  }

  getEvent() : void{
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.event = EVENTS.find(event => event.id === id);
  }

}
