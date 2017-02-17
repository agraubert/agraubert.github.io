import {Component} from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
declare var $:any;

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  loading: boolean = true;
  link: string = 'https://github.com/agraubert';

  constructor(router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      this.intercept(event);
    });
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
      $('.collapsible').collapsible();
    }
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }
}
