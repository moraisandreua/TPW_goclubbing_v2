import { Component, OnInit } from '@angular/core';
import {Business} from "../../Business";
import {BusinessService} from "../../services/business.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile!: Business;

  thisBusiness: number;

  constructor(private router : Router, private businessService : BusinessService) {
    this.thisBusiness = parseInt(<string>localStorage.getItem("goclubbingBusinessID"));
  }

  ngOnInit(): void {
    this.getMyBusiness(this.thisBusiness);
  }

  getMyBusiness(thisBusiness: number) : any{
    this.businessService.getBusiness(thisBusiness).subscribe(profile => this.profile = profile[0]);
  }

  save(profile : Business) : void{
    this.businessService.updateBusiness(profile).subscribe(answer => {
      console.log(answer);
      this.router.navigate(["/dashboard"]);
    });
  }
}
