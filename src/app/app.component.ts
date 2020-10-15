import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'SpaceX Launch Programs';
  private subscriptions: Subscription[] = [];
  public response: any;
  public launchSuccess: boolean;
  public landSuccess: boolean;
  public launchYear: number;
  public year = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
  public launch = [true, false];
  public land = [true, false];
  constructor (private dataService: DataService) {};

  ngOnInit(): void {
    this.loadData();
  }
  
  loadData() {
    const subcription = this.dataService.loadData( this.launchSuccess, this.landSuccess, this.launchYear).subscribe( response => {
      this.response = response;
      console.log(this.response.length);
      
      },
      error => {
        console.log('error');
      }
    );
    this.subscriptions.push(subcription);
  }

  filterYear(year) {
    this.launchYear = year;
    this.loadData();
  }

  filterLaunch(launch) {
    this.launchSuccess = launch;
    this.loadData();
  }

  filterLand(land) {
    this.landSuccess = land;
    this.loadData();
  }

  ngOnDestroy() {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

}
