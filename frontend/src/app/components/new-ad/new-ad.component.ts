import { Component, OnInit } from '@angular/core';
import {Ad} from "../../Ad";
import {ADS} from "../../adslist";
import {Event} from "../../Event";

@Component({
  selector: 'app-new-ad',
  templateUrl: './new-ad.component.html',
  styleUrls: ['./new-ad.component.css']
})
export class NewAdComponent implements OnInit {
  ad: Ad;
  ads: Ad[];

  thisBusiness : string;

  constructor() {
    this.ad = new Ad();
    this.ads = ADS;

    this.thisBusiness = "Estudio 22"
  }

  ngOnInit(): void {
  }

  save(ad : Ad) : void{
    this.ads.push(this.ad);
  }

}
