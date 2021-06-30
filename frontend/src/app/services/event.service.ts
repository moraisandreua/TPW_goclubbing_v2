import { Injectable } from '@angular/core';
import { Event } from "../Event";
import { Observable } from "rxjs/internal/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseURL = 'http://mike19.pythonanywhere.com/'
  constructor(private http : HttpClient, private cookieService : CookieService) { }

  getEvent(id : number) : Observable<Event[]>{
    const url = this.baseURL + 'api/events/search?id=' + id;
    return this.http.get<Event[]>(url);
  }

  getEvents() : Observable<Event[]>{
    const url = this.baseURL + 'api/events/all';
    return this.http.get<Event[]>(url)
  }

  createEvent(event : Event): Observable<any>{
    const url = this.baseURL + 'api/create/event';
    let httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json', 'Authentication':"Bearer " + this.cookieService.get("goclubbingLoginCookie")})
    }
    return this.http.post(url, event, httpOptions);
  }

  updateEvent(event: Event): Observable<any>{
    const url = this.baseURL + 'api/update/event';
    let httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json', 'Authentication':"Bearer " + this.cookieService.get("goclubbingLoginCookie")})
    }
    return this.http.put(url, event, httpOptions);
  }

  deleteEvent(event: Event): Observable<any>{
    const url = this.baseURL + 'api/delete/event/' + event.id;
    let httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json', 'Authentication':"Bearer " + this.cookieService.get("goclubbingLoginCookie")})
    }
    return this.http.delete<Event>(url, httpOptions);
  }
}
