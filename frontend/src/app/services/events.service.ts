import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Event} from "../Event";
import {EventPhotos} from "../EventPhotos";

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private baseUrl = "http://mike19.pythonanywhere.com/api/events/search";
  private photosBaseUrl="http://mike19.pythonanywhere.com/api/event_photos/";
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
}
