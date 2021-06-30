import { Component, OnInit } from '@angular/core';
import {Event} from "../../Event";
import {Ad} from "../../Ad";
import {Comment} from "../../Comment";
import {Business} from "../../Business";
import {EventService} from "../../services/event.service";
import {AdvertisementService} from "../../services/advertisement.service";
import {CommentService} from "../../services/comment.service";
import {BusinessService} from "../../services/business.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css'],
})
export class DashboardHomeComponent implements OnInit {
  events!: Event[];
  ads!: Ad[];
  comments!: Comment[];
  profile!: Business;

  thisBusiness: number;

  constructor(private router : Router, private eventService: EventService, private adService : AdvertisementService, private commentService : CommentService, private businessService : BusinessService, private cookieService : CookieService) {
    this.thisBusiness = parseInt(<string>localStorage.getItem("goclubbingBusinessID"));
  }

  ngOnInit(): void {
    if(this.cookieService.get("goclubbingLoginCookie") == ""){
      this.router.navigate(["/login"]);
    } else{
      this.getEvents();
      this.getAds()
      this.getComments();
      this.getMyBusiness(this.thisBusiness);
    }
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

  getMyBusiness(thisBusiness: number) : any{
    this.businessService.getBusiness(thisBusiness).subscribe(profile => this.profile = profile[0]);
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
