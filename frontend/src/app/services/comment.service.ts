import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Comment} from "../Comment";

const httpOptions = {
  headers : new HttpHeaders({'Content-Type': 'application/json', 'Authentication':'1'})
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseURL = 'http://mike19.pythonanywhere.com/'
  constructor(private http : HttpClient) { }

  getComment(id : number) : Observable<Comment[]>{
    const url = this.baseURL + 'api/comments/search?id=' + id;
    return this.http.get<Comment[]>(url);
  }

  getComments() : Observable<Comment[]>{
    const url = this.baseURL + 'api/comments/all';
    return this.http.get<Comment[]>(url)
  }

  createComment(comment : Comment): Observable<any>{
    const url = this.baseURL + 'api/create/comment';
    return this.http.post(url, comment, httpOptions);
  }

  updateComment(comment: Comment): Observable<any>{
    const url = this.baseURL + 'api/update/comment';
    return this.http.put(url, comment, httpOptions);
  }

  deleteComment(comment: Comment): Observable<any>{
    const url = this.baseURL + 'api/delete/comment/' + comment.id;
    return this.http.delete<Comment>(url, httpOptions);
  }
}
