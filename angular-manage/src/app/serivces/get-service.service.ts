import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class GetServiceService {
 

  constructor(public http:HttpClient) { }
  getdata(url:string,params?:any):Observable<any>
  {
    if(params)
    {
      console.log(params);
      return this.http.get(url,{params});
    }
    return this.http.get(url);
  }
}
