import {Component} from '@angular/core';
import {GithubService} from '../../services/github';
import * as _ from 'lodash';
declare var timeago:any;

@Component({
  selector: 'home',
  templateUrl: './home.html',
})
export class HomeComponent {
  blerg: any[];
  timeago: any;

  constructor(public gh: GithubService) {
    this.timeago = timeago;

  }

  ngOnInit() {
    this.gh.getRepos()
      .subscribe((repos) => this.blerg = _.chain(repos).sortBy('pushed_at').reverse().value());
  }
}
