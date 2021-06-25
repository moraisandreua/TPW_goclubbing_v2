import { Component, OnInit } from '@angular/core';
import {Event} from "../../Event";
import {EVENTS} from "../../eventslist";
import {Ad} from "../../Ad";
import {ADS} from "../../adslist";
import {Comment} from "../../Comment";
import {COMMENTS} from "../../commentslist";

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css'],
})
export class DashboardHomeComponent implements OnInit {
  events: Event[];
  ads: Ad[];
  comments: Comment[];

  thisBusiness: string;

  constructor() {
    this.events = EVENTS;
    this.ads = ADS;
    this.comments = COMMENTS;

    this.thisBusiness = "Estudio 22"
  }

  ngOnInit(): void {
  }

}
