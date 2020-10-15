import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  loadData( launch_success, land_success, launch_year) {
    let url = 'https://api.spaceXdata.com/v3/launches?limit=100';

    if ((launch_success === true) || (launch_success === false)) {
      url += '&launch_success=' + launch_success;
    }

    if((land_success === true) || (land_success === false)) {
      url += '&land_success=' + land_success;
    }

    if(launch_year) {
      url += '&launch_year=' + launch_year;
    }
    console.log('string: ', url);
    return this.http.get(url)
    .pipe(
      map(response => {
        return response;
      })
    );
  }

}
