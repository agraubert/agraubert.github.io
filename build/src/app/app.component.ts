import {Component} from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import {GithubService} from './services/github';
declare var $:any;

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  loading: boolean = true;
  link: string = '';

  constructor(private gh: GithubService, router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      this.intercept(event);
    });
    gh.getUrls().subscribe((response) => this.link = response.user_url.replace("{user}", 'agraubert'));
  }

  intercept(event: RouterEvent) {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
      $(".button-collapse").sideNav({
        closeOnClick: true
      });
    }
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }
}
