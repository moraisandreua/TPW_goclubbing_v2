import { Component, OnInit } from '@angular/core';
import {Business} from "../../Business";
import {BusinessService} from "../../services/business.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile!: Business;

  thisBusiness: number;

  constructor(private router : Router, private cookieService : CookieService, private businessService : BusinessService) {
    this.thisBusiness = parseInt(<string>localStorage.getItem("goclubbingBusinessID"));
  }

  ngOnInit(): void {
    if(this.cookieService.get("goclubbingLoginCookie") != "" ) {
      this.getMyBusiness(this.thisBusiness);
    } else{
      this.router.navigate(["/login"]);
    }

  }

  getMyBusiness(thisBusiness: number) : any{
    this.businessService.getBusiness(thisBusiness).subscribe(profile => this.profile = profile[0]);
  }

  getBase64(file: any) : any{
    console.log(file);
    let reader = new FileReader();
    if(file)
      reader.readAsDataURL(file);
    reader.onload = function () {
      //me.modelvalue = reader.result;
      console.log(reader.result);
      return reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
      return "null";
    };
  }


  save(profile : Business) : void{
    this.businessService.updateBusiness(profile).subscribe(answer => {
      console.log(answer);
      this.router.navigate(["/dashboard"]);
    });
  }
}
