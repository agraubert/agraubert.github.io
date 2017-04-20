import { Injectable} from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/last';
import 'rxjs/add/operator/switch';
import 'rxjs/add/operator/share';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class GithubService {
  private urls: Observable<any> = null;
  private repos: Observable<any> = null;
  private user: Observable<any> = null;
  private requestsRemaining = 0;
  private resetAt = 0;
  private urlRoot = 'https://api.github.com';

  constructor(private http: Http) {
    //having a fallback for the api rate would be really neat
    //I've moved the observable caching into the individual methods
  }

  getRemaining() {
    return this.requestsRemaining;
  }

  getReset() {
    return this.resetAt;
  }

  getUrls(): Observable<any> {
    if(!this.urls) {
      this.urls = this.makeRequest('/')
        .do((response) => this.urls = Observable.of(response).last());
    }
    return this.urls;
  }

  getUser(): Observable<any> {
    if(!this.user) {
      this.user = this.getUrls()
        .map((response) => this.makeRequest(
            response.user_url
              .replace('{user}', 'agraubert')
          )
          .do((response) => this.user = Observable.of(response).last())
        )
        .switch();
    }
    return this.user;
  }

  getRepos(): Observable<any> {
    if(!this.repos) {
      this.repos = this.getUrls()
        .map((response) => this.makeRequest(
            response.user_repositories_url
              .replace('{user}', 'agraubert')
              .replace(/{\?.*?}/, '')
          )
          .do((response) => this.repos = Observable.of(response).last())
        )
        .switch();
    }
    return this.repos;
  }

  private makeRequest(resource: string){
    let apiURL = 'https://1xao9d8kzk.execute-api.us-east-1.amazonaws.com/Production/api/github';
    let params = new URLSearchParams();
    params.set('resource', resource);
    let headers = new Headers();
    headers.append("content-type", "application/json");
    let opts = new RequestOptions();
    opts.search = params;
    opts.headers = headers;
    return this.http.get(apiURL, opts)
      .do((res) => {
        //Check the github api requests remaining.  Used for error handling
        let remainder = +res.json().rateremaining;
        let reset = +res.json().ratereset;
        console.log("GET: Github API (", resource, ")  :", remainder);
        if(Date.now() >= this.resetAt)
        {
          this.requestsRemaining = remainder;
          this.resetAt = reset*1000;
        }
        else this.requestsRemaining = Math.min(remainder, this.requestsRemaining);
      })
      .map((res) => JSON.parse(res.text().replace(/https:\/\/api\.github\.com/g, '')).result)
  }
}
