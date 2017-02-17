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
  private repos: Observable<any>;

  constructor(private http: Http) {
    //having a fallback for the api rate would be really neat
    this.urls = this.makeRequest('https://api.github.com');
    this.urls.subscribe((response) => this.urls = Observable.of(response).last());
    this.repos = this.urls
      .map((response) => this.makeRequest(
        response.user_repositories_url
          .replace('{user}', 'agraubert')
          .replace(/{\?.*?}/, '')
      ))
      .switch();
  }

  getRepos() {
    this.repos.subscribe((response) => this.repos = Observable.of(response).last());
    return this.repos;
  }

  // getMessage(repo: string) {
  //   return this.urls
  //     .map((response) => this.makeRequest(
  //       response.repository_url
  //         .replace('{owner}', 'agraubert')
  //         .replace('{repo}', repo) + "?per_page=1"
  //     ))
  //     .switch()
  //     .map((response) => response[0].message);
  // }

  private makeRequest(url: string){
    console.log("FETCH: ", url);
    return this.http.get(url)
      .map((res) => res.json());
  }
}
