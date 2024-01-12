import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private teamsStandingsSubject = new BehaviorSubject<any>(null);
  teamsStandings$ = this.teamsStandingsSubject.asObservable();

  constructor(private http: HttpClient) { }

  getAggregatedInfo(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/aggregated-data').pipe(
      tap((res) => {
        this.teamsStandingsSubject.next(res.teamStandings.response[0]);
      })
    );
  }
}
