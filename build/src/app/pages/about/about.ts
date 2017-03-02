import {Component} from '@angular/core';
import {GithubService} from '../../services/github';
import {SteamService} from '../../services/steam';

class Chip {
  img_src: string;
  img_alt: string;
  href: string;
  text: string;
  constructor(src:string, alt:string, href:string, text:string) {
    this.img_src = src;
    this.img_alt = alt;
    this.href = href;
    this.text = text;
  }

}

@Component({
  selector: 'about',
  templateUrl: './about.html',
})
export class AboutComponent {
  private chips: Chip[];
  private link: string;
  private colorClass: string = '';
  constructor(public gh: GithubService, private steam: SteamService) {
    //this.gh.getUser().subscribe((response) => this.link = response.avatar_url);
    this.steam.getPlayerData().subscribe((response) => {
      this.link = response.avatarfull;
      if (response.gameid !== undefined) {
        this.colorClass = 'light-green';
      }
      else if (response.personastate == 1) {
        this.colorClass = 'light-blue darken-1';
      }
      else {
        this.colorClass = 'grey darken-2';
      }
      // console.log("Player:", response);
    });
    this.chips = [
      new Chip(
        "https://github.com/fluidicon.png",
        'GitHub',
        "https://github.com/agraubert",
        'agraubert'
      ),
      new Chip(
        "http://seeklogo.com/images/S/steam-logo-37A2862F0B-seeklogo.com.png",
        'Steam',
        'http://steamcommunity.com/id/captianjroot',
        'Jroot'
      ),
      new Chip(
        'http://orig13.deviantart.net/7553/f/2013/231/2/9/battlenet_by_johnkict-d6ive6z.png',
        'Battle.net',
        'http://masteroverwatch.com/profile/pc/us/Jroot-1196',
        'Jroot#1196'
      ),
      new Chip(
        'https://camo.githubusercontent.com/4b028e8e841f57ee96b472fa88ea7ed66ddd3720/687474703a2f2f692e696d6775722e636f6d2f65597779386c632e706e67',
        'Discord',
        null,
        'Jroot#8988'
      ),
      new Chip(
        'http://vignette3.wikia.nocookie.net/warframe/images/f/f9/Lotus_Icon.png/revision/latest?cb=20130923220134',
        'Warframe',
        null,
        'captianjroot'
      ),
      new Chip(
        'http://mercadocripto.xyz/wp-content/uploads/2015/10/icon175x1751.png',
        'Uplay',
        null,
        'captianjroot'
      ),
      //others?
    ];
  }

}
