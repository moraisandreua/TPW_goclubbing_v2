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

  thisBusiness: string;

  constructor() {
    this.thisBusiness = "Estudio 22";
    this.profile = this.getMyBusiness(BUSINESS, this.thisBusiness);
  }

  getMyBusiness(BUSINESS : Business[], thisBusiness: String) : any{
    for(let i = 0; i < BUSINESS.length; i++){
      if(BUSINESS[i].name == thisBusiness){
        return BUSINESS[i];
      }
    }
  }

  ngOnInit(): void {
  }

}
