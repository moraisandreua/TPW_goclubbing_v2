import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Event} from "../Event";
import {EventPhotos} from "../EventPhotos";
import {EventTypes} from "../EventTypes";

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private baseUrl = "http://mike19.pythonanywhere.com/api/events/search";
  private photosBaseUrl="http://mike19.pythonanywhere.com/api/event_photos/";
  private typesBaseUrl = "http://mike19.pythonanywhere.com/api/events/types";
  constructor(private http: HttpClient) { }

  getEvents():Observable<Event[]>{
    const url = this.baseUrl;
    return this.http.get<Event[]>(url);
  }

  getEventPhotos(id:number):Observable<EventPhotos[]>{
    const url=this.photosBaseUrl+id;
    return this.http.get<EventPhotos[]>(url);
  }

  getFilteredEvents(queryString:string):Observable<Event[]>{
    const url=this.baseUrl+queryString;
    return this.http.get<Event[]>(url);
  }

  getEventTypes():Observable<EventTypes[]>{
    const url=this.typesBaseUrl;
    return this.http.get<EventTypes[]>(url);
  }
}
