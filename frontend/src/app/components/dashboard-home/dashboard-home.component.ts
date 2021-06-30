import { Component, OnInit } from '@angular/core';
import {Event} from "../../Event";
import {Ad} from "../../Ad";
import {Comment} from "../../Comment";
import {Business} from "../../Business";
import {BUSINESS} from "../../businesslist";
import {EventService} from "../../services/event.service";
import {AdvertisementService} from "../../services/advertisement.service";
import {CommentService} from "../../services/comment.service";

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css'],
})
export class DashboardHomeComponent implements OnInit {
  events!: Event[];
  ads!: Ad[];
  comments!: Comment[];
  profile: Business;

  thisBusiness: number;

  constructor(private eventService: EventService, private adService : AdvertisementService, private commentService : CommentService) {
    this.thisBusiness = parseInt(<string>localStorage.getItem("goclubbingBusinessID"));
    this.profile = this.getMyBusiness(BUSINESS, this.thisBusiness);
  }

  ngOnInit(): void {
    this.getEvents();
    this.getAds()
    this.getComments();
  }

  getEvents(): void{
    this.eventService.getEvents().subscribe(events => this.events = events)
  }

  getAds() : void{
    this.adService.getAdvertisements().subscribe(ads => this.ads = ads);
  }

  getComments() : void{
    this.commentService.getComments().subscribe(comments => this.comments = comments );
  }

  isMyEvent(id :number) : boolean{
    for(let i = 0; i < this.events.length; i++){
      if(this.events[i].id == id && this.events[i].business == this.thisBusiness){
        return true;
      }
    }
    return false;
  }

  getMyBusiness(BUSINESS : Business[], thisBusiness: number) : any{ // TODO: Fix this to use business service
    for(let i = 0; i < BUSINESS.length; i++){
      if(BUSINESS[i].id == thisBusiness){
        return BUSINESS[i];
      }
    }
  }

  getEventFromId(id : number) : any{
    for(let i = 0; i < this.events.length; i++){
      if(this.events[i].id == id){
        return this.events[i];
      }
    }
  }

  delete(comment : Comment){
    this.commentService.deleteComment(comment);
  }

}
