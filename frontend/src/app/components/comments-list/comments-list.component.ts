import { Component, OnInit } from '@angular/core';
import {Comment} from "../../Comment";
import {Event} from "../../Event";
import {Business} from "../../Business";
import {COMMENTS} from "../../commentslist";
import {BUSINESS} from "../../businesslist";
import {EVENTS} from "../../eventslist";

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
  comments: Comment[];
  events: Event[];
  profile: Business;

  thisBusiness: string;

  constructor() {
    this.comments = COMMENTS;
    this.events = EVENTS;
    this.thisBusiness = "Estudio 22";
    this.profile = this.getMyBusiness(BUSINESS, this.thisBusiness);
  }

  ngOnInit(): void {
  }

  getEvent(id : number) : any{
    for(let i = 0; i < this.events.length; i++){
      if(this.events[i].id == id){
        return this.events[i];
      }
    }
  }

  private getMyBusiness(BUSINESS: Business[], thisBusiness: string) : any {
    for(let i = 0; i < BUSINESS.length; i++){
      if(BUSINESS[i].name == thisBusiness){
        return BUSINESS[i];
      }
    }
  }
}
