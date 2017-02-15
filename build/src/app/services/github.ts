import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
 import 'rxjs/add/operator/map';

@Injectable()
export class GithubService {
  private user_url: string;
  private repos_url: string;

  constructor(private http: Http) {
    let startup = this.makeRequest('')
      .subscribe(function(response){
        this.user_url = response.user_url;
        this.makeRequest(this.user_url)
          .subscribe(function(res){
            this.repos_url = res.repos_url;
          });
      });
  }

  getRepos() {
    return this.makeRequest(this.repos_url);
  }

  private makeRequest(path: string) {
    let url = `https://api.github.com/${ path }`;
    return this.http.get(url)
      .map((res) => res.json());
  }
}
