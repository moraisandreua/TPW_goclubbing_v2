import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Business} from "../Business";
import {Event} from "../Event";
import {CookieService} from "ngx-cookie-service";



@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private baseUrl = "http://mike19.pythonanywhere.com/";

  constructor(private http: HttpClient, private cookieService : CookieService) {

  }

  getBusiness(id:number):Observable<Business[]>{
    const url = this.baseUrl + "api/business/search?id="+id;
    return this.http.get<Business[]>(url);
  }

  getBusinesses():Observable<Business[]>{
    const url = this.baseUrl + 'api/business/all';
    return this.http.get<Business[]>(url);
  }

  createBusiness(business : Business): Observable<any>{
    const url = this.baseUrl + 'api/create/business';
    let httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json', 'Authentication':"Bearer " + this.cookieService.get("goclubbingLoginCookie")})
    }

    return this.http.post(url, business, httpOptions);
  }

  updateBusiness(business: Business): Observable<any>{
    const url = this.baseUrl + 'api/update/business';
    let httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json', 'Authentication':"Bearer " + this.cookieService.get("goclubbingLoginCookie")})
    }
    return this.http.put(url, business, httpOptions);
  }

  deleteEvent(event: Event): Observable<any>{
    const url = this.baseUrl + 'api/delete/business/' + event.id;
    let httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json', 'Authentication':"Bearer " + this.cookieService.get("goclubbingLoginCookie")})
    }
    return this.http.delete<Event>(url, httpOptions);
  }
}
