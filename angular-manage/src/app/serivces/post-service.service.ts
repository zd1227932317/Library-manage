import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor(public http:HttpClient) { }

  post(url:string,param:any):Observable<any>
  {
    return this.http.post(url,param)
  }
}
