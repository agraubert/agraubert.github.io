import { Injectable} from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/last';
import 'rxjs/add/operator/switch';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class GithubService {
  private urls: Observable<any>;

  constructor(private http: Http) {
    this.urls = this.makeRequest('https://api.github.com');
    this.urls.subscribe((response) => this.urls = Observable.of(response).last());
  }

  getRepos() {
    return this.urls
      .map((response) => this.makeRequest(
        response.user_repositories_url
          .replace('{user}', 'agraubert')
          .replace(/{\?.*?}/, '')
      ))
      .switch();
  }

  private makeRequest(url: string){
    console.log("FETCH: ", url);
    return this.http.get(url)
      .map((res) => res.json());
  }
}
