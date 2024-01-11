import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private http: HttpClient) { }


  getAggregatedInfo(): Observable<any>{
    return this.http.get<any>(`http://localhost:3000/aggregated-data`);
  }
}
