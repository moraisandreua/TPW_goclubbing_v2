import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router, private cookieService : CookieService) { }

  ngOnInit(): void {
  }

  exit() {
    this.cookieService.set("goclubbingLoginCookie", "", 0);
    this.router.navigate(["/login"]);
  }
}
