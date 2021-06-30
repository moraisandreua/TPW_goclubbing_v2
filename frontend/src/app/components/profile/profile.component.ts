import { Component, OnInit } from '@angular/core';
import {Business} from "../../Business";
import {BusinessService} from "../../services/business.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile!: Business;

  thisBusiness: number;

  constructor(private businessService : BusinessService) {
    this.thisBusiness = parseInt(<string>localStorage.getItem("goclubbingBusinessID"));
  }

  ngOnInit(): void {
    this.getMyBusiness(this.thisBusiness);
  }

  getMyBusiness(thisBusiness: number) : any{
    this.businessService.getBusiness(thisBusiness).subscribe(profile => this.profile = profile[0])
  }
}
