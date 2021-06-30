import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginToken} from "../LoginToken";
import {RegisterToken} from "../RegisterToken";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrlLogin = "http://mike19.pythonanywhere.com/api/login/";
  private baseUrlSignup = "http://mike19.pythonanywhere.com/api/create/business";
  constructor(private http: HttpClient) { }

  login(username:string, password:string):Observable<LoginToken>{
    const url = this.baseUrlLogin;
    return this.http.post<LoginToken>(url, {username:username, password:password})
  }

  signup(name:string, location:string, type:string, company_name:string, contact_email:string, contact_phone:string, username:string, password:string):Observable<RegisterToken>{
    const url = this.baseUrlSignup;
  }
}
