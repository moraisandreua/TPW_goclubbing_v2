import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Event} from "../Event";

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private baseUrl = "http://mike19.pythonanywhere.com/api/events/search";
  constructor(private http: HttpClient) { }

  getEvents():Observable<Event[]>{
    const url = this.baseUrl;
    return this.http.get<Event[]>(url);
  }
}
