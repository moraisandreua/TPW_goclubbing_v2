import { Component, OnInit } from '@angular/core';
import {Comment} from "../../Comment";
import {Event} from "../../Event";
import {Business} from "../../Business";
import {COMMENTS} from "../../commentslist";
import {EventService} from "../../services/event.service";

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
  comments: Comment[];
  events!: Event[];
  //profile: Business;

  thisBusiness: number;

  constructor(private eventService : EventService) {
    this.comments = COMMENTS;
    this.thisBusiness = 1;
    //this.profile = this.getMyBusiness(BUSINESS, this.thisBusiness);
  }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void{
    this.eventService.getEvents().subscribe(events => this.events = events)
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

  getCommentIndex(id : number) : any{
    for(let i = 0; i < this.comments.length; i++){
      if(this.comments[i].id == id){
        return i;
      }
    }
  }

  delete(id : number){
    const index: number = this.getCommentIndex(id);
    if (index !== -1) {
      this.comments.splice(index, 1);
    }
  }
}
