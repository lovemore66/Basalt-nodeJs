import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'app-teams-standing',
  templateUrl: './teams-standing.component.html',
  styleUrl: './teams-standing.component.scss'
})
export class TeamsStandingComponent implements OnInit {
  carName: string = '';
  result: any = {};

  constructor(private http: HttpClient, private teamsService: TeamsService) { }

  ngOnInit(): void {
    // this.getAggregatedData()
  }

  getAggregatedData() {
    this.teamsService.getAggregatedInfo().subscribe( res => {
      console.log(res.teamStandings.response);
    })
  }

}
