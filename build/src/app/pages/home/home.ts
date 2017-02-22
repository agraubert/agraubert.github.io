import {Component} from '@angular/core';
import {GithubService} from '../../services/github';
import {Subscription} from 'rxjs/Subscription';
import * as _ from 'lodash';
declare var timeago:any;
declare var $:any;

@Component({
  selector: 'home',
  templateUrl: './home.html',
})
export class HomeComponent {
  blerg: any[];
  timeago: any;
  subscription: Subscription;

  constructor(public gh: GithubService) {
    this.timeago = timeago;

  }

  ngOnInit() {
    this.subscription = this.gh.getRepos()
      .map((repos) => _.chain(repos).sortBy('pushed_at').reverse().value())
      .subscribe(
        (repos) => this.blerg = repos,
        (error) => $("#ghErrorModal").modal('open')
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
