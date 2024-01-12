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
  teamsStandings: any[] = [];
  columnTitles: string[] = ['Club', 'League', 'Wins', 'Lose', 'Played', 'Points', 'Recent Form'];
  loading: boolean = true;

  constructor(private teamsService: TeamsService) { }

  ngOnInit(): void {
    this.getAggregatedData()
  }

  getAggregatedData() {
    this.teamsService.getAggregatedInfo().subscribe( res => {
      this.loading = false;
      console.log(res.teamStandings.response);
      this.teamsStandings = res.teamStandings.response[0];
    })
  }

}
