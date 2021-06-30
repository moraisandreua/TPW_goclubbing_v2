import { Component, OnInit } from '@angular/core';
import {Event} from "../../Event";
import {EventService} from "../../services/event.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
  event: Event;

  thisBusiness!: number;

  constructor(private router : Router, private eventService : EventService) {
    this.event = new Event();
    this.thisBusiness = parseInt(<string>localStorage.getItem("goclubbingBusinessID"));
  }

  ngOnInit(): void {
  }

  save(e : Event) : void{
    this.event.business = this.thisBusiness;
    this.eventService.createEvent(e).subscribe(answer =>{
      console.log(answer);
      this.router.navigate(["/dashboard"]);
    });
  }

}
