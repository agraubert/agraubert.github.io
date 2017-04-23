import {Component} from '@angular/core';
import {GithubService} from '../../services/github';
import {SteamService} from '../../services/steam';
declare var $:any;
import {isString, isUndefined, bind} from 'lodash';

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
  private gamestring: string = '';

  constructor(public gh: GithubService, private steam: SteamService) {
    //this.gh.getUser().subscribe((response) => this.link = response.avatar_url);
    this.chips = [
      new Chip(
        'https://s3.amazonaws.com/jrsimgassets/github_logo.png',
        'GitHub',
        'https://github.com/agraubert',
        'agraubert'
      ),
      new Chip(
        'https://s3.amazonaws.com/jrsimgassets/steam_logo.png',
        'Steam',
        'http://steamcommunity.com/id/captianjroot',
        'Jroot'
      ),
      new Chip(
        'https://s3.amazonaws.com/jrsimgassets/battlenet_logo.png',
        'Battle.net',
        'http://masteroverwatch.com/profile/pc/us/Jroot-1196',
        'Jroot#1196'
      ),
      new Chip(
        'https://s3.amazonaws.com/jrsimgassets/discord_logo.png',
        'Discord',
        null,
        'Jroot#8988'
      ),
      new Chip(
        'https://s3.amazonaws.com/jrsimgassets/warframe_logo.png',
        'Warframe',
        null,
        'captianjroot'
      ),
      new Chip(
        'https://s3.amazonaws.com/jrsimgassets/uplay_logo.png',
        'Uplay',
        null,
        'captianjroot'
      ),
      //others?
    ];
  }

  ngOnInit() {
    console.log("HEYO", this);
    this.steam.getPlayerData().subscribe((response) => {
      setTimeout(bind(this.ngOnInit, this), 60000);
      this.link = response.avatarfull;
      if (!isUndefined(response.gameid)) {
        //setTimeout is definitely not the best solution, but whatever
        setTimeout(function(){$('.tooltipped').tooltip();}, 150);
        this.colorClass = 'light-green tooltipped';
        this.gamestring = "Playing: "+(
          //response.game_data.gameName.length?response.game_data.gameName:'a game on Steam'
          isString(response.gameextrainfo)?response.gameextrainfo:(
            response.game_data.gameName.length?response.game_data.gameName:'a game on Steam'
          )
        );
      }
      else if (response.personastate == 0){
        this.colorClass = 'grey darken-2';
        this.gamestring = '';
      }
      else{
        this.colorClass = 'light-blue darken-1';
        this.gamestring = '';
      }
    });
  }

}
