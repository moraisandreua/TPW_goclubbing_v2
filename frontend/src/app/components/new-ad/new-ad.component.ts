import { Component, OnInit } from '@angular/core';
import {Ad} from "../../Ad";
import {AdvertisementService} from "../../services/advertisement.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-new-ad',
  templateUrl: './new-ad.component.html',
  styleUrls: ['./new-ad.component.css']
})
export class NewAdComponent implements OnInit {
  ad: Ad;
  ads!: Ad[];

  thisBusiness : number;

  constructor(private router : Router, private cookieService : CookieService, private adService : AdvertisementService) {
    this.ad = new Ad();

    this.thisBusiness = parseInt(<string>localStorage.getItem("goclubbingBusinessID"));
  }

  ngOnInit(): void {
    if(this.cookieService.get("goclubbingLoginCookie") != "" ) {
      this.getAds();
    } else{
      this.router.navigate(["/login"]);
    }
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
