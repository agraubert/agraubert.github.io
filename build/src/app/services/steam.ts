import { Injectable} from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/last';
import 'rxjs/add/operator/switch';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class SteamService {

  private playerData: Observable<any>;

  constructor(private http: Http) {
    let apiURL = "https://1xao9d8kzk.execute-api.us-east-1.amazonaws.com/Production/api/steam";

    this.playerData = this.http.get(apiURL)
      .map((res) => res.json())
      .do((res) => {
        console.log("GET: Steam API");
        this.playerData = Observable.of(res).last();
      })
  }

  getPlayerData() {
    return this.playerData;
  }
}
