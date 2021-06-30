import { Injectable } from '@angular/core';
import { Event } from "../Event";
import { Observable } from "rxjs/internal/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers : new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseURL = 'http://mike19.pythonanywhere.com/'
  constructor(private http : HttpClient) { }

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
    return this.http.post(url, event, httpOptions);
  }

  updateEvent(event: Event): Observable<any>{
    const url = this.baseURL + 'api/update/event';
    return this.http.put(url, event, httpOptions);
  }

  deleteEvent(event: Event): Observable<any>{
    const url = this.baseURL + 'api/delete/event/' + event.id;
    return this.http.delete<Event>(url, httpOptions);
  }
}
