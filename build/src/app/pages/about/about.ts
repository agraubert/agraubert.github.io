import {Component} from '@angular/core';

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
  constructor() {
    this.chips = [
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
        'http://mercadocripto.xyz/wp-content/uploads/2015/10/icon175x1751.png',
        'Uplay',
        '#/about',
        'captianjroot'
      ),
      new Chip(
        "https://github.com/fluidicon.png",
        'GitHub',
        "https://github.com/agraubert",
        'agraubert'
      )
      //others?
    ];
  }
}
