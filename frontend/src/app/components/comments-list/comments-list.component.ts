import { Component, OnInit } from '@angular/core';
import {Comment} from "../../Comment";
import {Event} from "../../Event";
import {Business} from "../../Business";
import {EventService} from "../../services/event.service";
import {CommentService} from "../../services/comment.service";

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
  comments!: Comment[];
  events!: Event[];
  //profile: Business;

  thisBusiness: number;

  constructor(private eventService : EventService, private commentService : CommentService) {
    this.thisBusiness = 1; // TODO : Change this to token
    //this.profile = this.getMyBusiness(BUSINESS, this.thisBusiness);
  }

  ngOnInit(): void {
    this.getEvents();
    this.getComments();
  }

  getComments(){
    this.commentService.getComments().subscribe(comments => this.comments = comments);
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

  private getMyBusiness(BUSINESS: Business[], thisBusiness: string) : any { // TODO : Use business service
    for(let i = 0; i < BUSINESS.length; i++){
      if(BUSINESS[i].name == thisBusiness){
        return BUSINESS[i];
      }
    }
  }

  delete(comment : Comment){
    this.commentService.deleteComment(comment);
  }
}
