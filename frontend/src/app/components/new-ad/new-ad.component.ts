import { Component, OnInit } from '@angular/core';
import {Ad} from "../../Ad";
import {AdvertisementService} from "../../services/advertisement.service";

@Component({
  selector: 'app-new-ad',
  templateUrl: './new-ad.component.html',
  styleUrls: ['./new-ad.component.css']
})
export class NewAdComponent implements OnInit {
  ad: Ad;
  ads!: Ad[];

  thisBusiness : number;

  constructor(private adService : AdvertisementService) {
    this.ad = new Ad();

    this.thisBusiness = parseInt(<string>localStorage.getItem("goclubbingBusinessID"));
  }

  ngOnInit(): void {
    this.getAds();
  }

  getAds() : void{
    this.adService.getAdvertisements().subscribe(ads => this.ads = ads);
  }


  save(ad : Ad) : void{
    this.adService.createAdvertisement(ad);
  }

}
