import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Business} from "../Business";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private baseUrl = "http://mike19.pythonanywhere.com/api/business/search";
  constructor(private http: HttpClient) { }

  getBusiness(id:number):Observable<Business[]>{
    const url = this.baseUrl + "?id="+id;
    return this.http.get<Business[]>(url);
  }

  getBusinesses():Observable<Business[]>{
    const url = this.baseUrl;
    return this.http.get<Business[]>(url);
  }
}
