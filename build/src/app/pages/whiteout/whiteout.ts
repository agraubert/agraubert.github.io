import {Component} from '@angular/core';

class Entry {
  body: string;
  state: boolean;

  constructor(text:string, complete:boolean) {
    this.body = text;
    this.state = complete;
  }
}

@Component({
  selector: 'whiteout',
  templateUrl: './whiteout.html',
  styleUrls: ['./whiteout.css'],
})
export class WhiteoutComponent{

  private entries: Entry[];

  constructor() {
    this.entries = [
      new Entry(
        'Create a final sprite for enemies',
        false
      ),
      new Entry(
        'Add simple powerups (recharge/bullet time)',
        false
      ),
      new Entry(
        'Add interesting powerups (overheat)',
        false
      ),
      new Entry(
        'Add terrain',
        false
      ),
      new Entry(
        'Add bullet hit sfx',
        false
      ),
      new Entry(
        'Add bloodsplat effects',
        false
      ),
      new Entry(
        'Add more loops to the store (loop upgrades)',
        false
      ),
      new Entry(
        'Add multiple supply sprites with associated text at mission start',
        false
      ),
      new Entry(
        'Track down the bug where you exist in world without an active quest',
        false
      ),
      new Entry(
        'Fix the recoil bug',
        false
      ),
      new Entry(
        'Increase the bullet size',
        false
      ),
    ];
  }

}
