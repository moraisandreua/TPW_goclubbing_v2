import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Business} from "../Business";
import {BusinessPhotos} from "../BusinessPhotos";
import {BusinessType} from "../BusinessType";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private baseUrl = "http://mike19.pythonanywhere.com/api/business/search";
  private photosBaseUrl = "http://mike19.pythonanywhere.com/api/business_photos/";
  private typesBaseUrl = "http://mike19.pythonanywhere.com/api/business/types";
  constructor(private http: HttpClient) { }

  getBusiness(id:number):Observable<Business[]>{
    const url = this.baseUrl + "?id="+id;
    return this.http.get<Business[]>(url);
  }

  getBusinesses():Observable<Business[]>{
    const url = this.baseUrl;
    return this.http.get<Business[]>(url);
  }

  getBusinessPhotos(id:number):Observable<BusinessPhotos[]>{
    const url = this.photosBaseUrl+id;
    return this.http.get<BusinessPhotos[]>(url);
  }

  getFilteredBusinesses(queryString:string):Observable<Business[]>{
    const url = this.baseUrl+queryString;
    return this.http.get<Business[]>(url);
  }

  getBusinessesTypes():Observable<BusinessType[]>{
    const url = this.typesBaseUrl;
    return this.http.get<BusinessType[]>(url);
  }
}
