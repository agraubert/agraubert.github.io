import {Component} from '@angular/core';
import {GithubService} from '../../services/github';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';

@Component({
  selector: 'home',
  templateUrl: './home.html',
})
export class HomeComponent {
  blerg: any[];

  constructor(public gh: GithubService) {

  }

  ngOnInit() {
    this.gh.getRepos()
      .subscribe((repos) => this.blerg = _.chain(repos).sortBy('updated_at').reverse().value());
  }
}
