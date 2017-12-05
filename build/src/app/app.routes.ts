import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { AboutComponent } from './pages/about/about';
import { BeymaxComponent } from './pages/beymax/beymax';
import { WhiteoutComponent } from './pages/whiteout/whiteout';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'beymax', component: BeymaxComponent },
  { path: 'whiteout', component: WhiteoutComponent }
  // { path: 'github', component: RepoBrowserComponent,
  //   children: [
  //     { path: '', component: RepoListComponent },
  //     { path: ':org', component: RepoListComponent,
  //       children: [
  //         { path: '', component: RepoDetailComponent },
  //         { path: ':repo', component: RepoDetailComponent }
  //       ]
  //     }]
  // },
  // { path: 'contact', component: ContactComponent }
];
