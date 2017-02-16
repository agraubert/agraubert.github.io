import { Injectable} from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/last';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/exhaust';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class GithubService {
  private user_url: string;
  private repos_url: Observable<string>;

  constructor(private http: Http) {
    this.repos_url = this.makeRequest('https://api.github.com')
      .flatMap((response) => {
        this.user_url = response.user_url.replace('{user}', 'agraubert');
        return this.makeRequest(this.user_url)
      })
      .map((response) => response.repos_url);
      // .subscribe(function(res) {
      //   this.repos_url = res.repos_url;
      // });
  }

  getRepos() {
    return this.repos_url
      .map((response) => this.makeRequest(response))
      .exhaust();
  }

  private makeRequest(url: string){
    console.log("FETCH: ", url);
    return this.http.get(url)
      .map((res) => res.json());
  }
}
