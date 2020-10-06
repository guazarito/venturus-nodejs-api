import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { GoogleChartInterface } from 'ng2-google-charts';
import { HttpService } from '../../services/http-service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {

  constructor(private httpService:HttpService) { }

  hasData = false;
  isLoading = false;

  inputSearchModel;
  resultSearch;
  dataIssues;

  ngOnInit(): void {
  }

    //chart
    public lineChart: GoogleChartInterface = {
      chartType: 'LineChart',
      dataTable: [
        ['Day', 'Issues'],
        ['10/04/2020',     250],
        ['15/04/2020',     200],
        ['20/04/2020',     300],
        ['30/04/2020',     150],
        ['05/05/2020',     220]
      ],
      options: {'title': 'Issues per day'},
    };

  search(){
    this.hasData = false;
    this.isLoading = true;

    this.httpService.get("/github/searchrepos/" + this.inputSearchModel)
    .subscribe(
      reposname => {
        this.resultSearch = reposname;
        if (this.resultSearch.full_name){
          this.getIssuesData(this.resultSearch.full_name);
        }
      },
      err => {
        this.resultSearch = "";
        this.isLoading = false;
        console.log(err);
      });
  }

  getIssuesData(repos){
    this.httpService.get("/github/getissues/" + repos)
    .subscribe(
      data => {
        this.dataIssues = data;
        console.log(this.dataIssues);
        this.hasData = true;
        this.isLoading = false;
      },
      err => {
        console.log(err);
        this.isLoading = false;
      });
  }



}
