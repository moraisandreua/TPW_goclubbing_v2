import { Component, OnInit } from '@angular/core';
import {Ad} from "../../Ad";
import {AdvertisementService} from "../../services/advertisement.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-ad',
  templateUrl: './new-ad.component.html',
  styleUrls: ['./new-ad.component.css']
})
export class NewAdComponent implements OnInit {
  ad: Ad;
  ads!: Ad[];

  thisBusiness : number;

  constructor(private router : Router, private adService : AdvertisementService) {
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
    this.adService.createAdvertisement(ad).subscribe(answer =>{
      console.log(answer);
      this.router.navigate(["/dashboard"]);
    });
  }

}
