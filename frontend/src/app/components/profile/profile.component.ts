import { Component, OnInit } from '@angular/core';
import {Business} from "../../Business";
import {BUSINESS} from "../../businesslist";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: Business;

  thisBusiness: number;

  constructor() {
    this.thisBusiness = parseInt(<string>localStorage.getItem("goclubbingBusinessID"));
    this.profile = this.getMyBusiness(BUSINESS, this.thisBusiness);  // TODO: Fix this to use business service
  }

  getMyBusiness(BUSINESS : Business[], thisBusiness: number) : any{
    for(let i = 0; i < BUSINESS.length; i++){
      if(BUSINESS[i].id == thisBusiness){
        return BUSINESS[i];
      }
    }
  }

  ngOnInit(): void {
  }

}
