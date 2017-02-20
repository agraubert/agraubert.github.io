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
  private requestsRemaining = 0;
  private resetAt = 0;

  constructor(private http: Http) {
    //having a fallback for the api rate would be really neat
    this.urls = this.makeRequest('https://api.github.com')
      //this line sets up the observable to cache itself after the first time it runs
      .do((res) => this.urls = Observable.of(res).last());

    //Now setup the repos url observable from the urls observable
    this.repos = this.urls
      .map((response) => this.makeRequest( //map the response to a new request
        response.user_repositories_url
          .replace('{user}', 'agraubert')
          .replace(/{\?.*?}/, '')
      )
        .do((res) => this.repos = Observable.of(res).last()) //cache after completion
      )
      .switch(); //Reduce the nested observable
  }

  getRemaining() {
    return this.requestsRemaining;
  }

  getReset() {
    return this.resetAt;
  }

  getRepos() {
    //The old observable caching formula:
    //this.repos.subscribe((response) => this.repos = Observable.of(response).last());
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
    return this.http.get(url)
      .do((res) => {
        //Check the github api requests remaining.  Used for error handling
        let remainder = +res.headers.get("X-RateLimit-Remaining");
        let reset = +res.headers.get("X-RateLimit-Reset") * 1000;
        console.log("GET: ", url, "  :", remainder);
        if(Date.now() >= this.resetAt)
        {
          this.requestsRemaining = remainder;
          this.resetAt = reset;
        }
        else this.requestsRemaining = Math.min(remainder, this.requestsRemaining);
      })
      .map((res) => res.json());
  }
}
