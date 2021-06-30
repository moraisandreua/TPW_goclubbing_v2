import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {ADS} from "../../adslist";
import {Event} from "../../Event"
import {EVENTS} from "../../eventslist";
import {Ad} from "../../Ad";

@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.component.html',
  styleUrls: ['./edit-ad.component.css']
})
export class EditAdComponent implements OnInit {
  @Input() ad!: Ad;

  events : Event[];

  constructor(private route: ActivatedRoute, private location: Location) {
    this.events = EVENTS;
  }

  ngOnInit(): void {
    this.getAd();
  }

  getAd() : void{
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    // @ts-ignore
    this.ad = ADS.find(ad => ad.id === id);
  }

  getEvent(id : number) : any{
    for(let i = 0; i < this.events.length; i++){
      if(this.events[i].id == id){
        return this.events[i];
      }
    }
  }

  delete(ad : Ad) : void{}

}
