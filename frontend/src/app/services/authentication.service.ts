import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginToken} from "../LoginToken";
import {Business} from "../Business";
import {LoginComponent} from "../components/login/login.component";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrlLogin = "http://mike19.pythonanywhere.com/api/login";

  constructor(private http: HttpClient) { }

  login(username:string, password:string):Observable<LoginToken>{
    const url = this.baseUrlLogin;
    return this.http.post<LoginToken>(url, {username:username, password:password}, httpOptions)
  }
}
