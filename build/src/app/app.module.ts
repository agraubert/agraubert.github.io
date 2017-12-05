import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { HomeComponent } from './pages/home/home';
import { AboutComponent } from './pages/about/about';
import { BeymaxComponent } from './pages/beymax/beymax';
import { WhiteoutComponent } from './pages/whiteout/whiteout';

import { GithubService } from './services/github';
import { SteamService } from './services/steam';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    BeymaxComponent,
    WhiteoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],
  providers: [
    GithubService,
    SteamService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
