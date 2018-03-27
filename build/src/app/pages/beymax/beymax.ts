import {Component} from '@angular/core';

class Feature {
  header: string;
  body: string;

  constructor(header:string, body:string) {
    this.header = header;
    this.body = body;
  }
}

@Component({
  selector: 'beymax',
  templateUrl: './beymax.html',
})
export class BeymaxComponent {
  features: Feature[];

  constructor() {
    this.features = [
      new Feature(
        'Run Text Adventures',
        'Dedicate a channel where Beymax will run Text Adventures (like Zork). \
        Users bid to play during the next game session and the winner gets a \
        2-day (extendable) session of their game of choice. Any input they type \
        to the channel is forwarded to the game, and the game\'s responses are \
        printed back in the channel for everyone to see'
      ),
      new Feature(
        'Reward Economy',
        'Beymax will reward users with Tokens and XP points for continuing to use \
        your server and commands. XP is used to level up, which increases the \
        Tokens awarded every week. Tokens are used to buy game sessions in text \
        adventures'
      ),
      new Feature(
        'Create Polls',
        'Easily create a poll by sending a message. Beymax will create a poll in the channel \
        in the channel and add reactions to it so other members can vote easily. \
        As members vote, Beymax will notify you so you never miss anyone\'s vote'
      ),
      new Feature(
        'Overwatch Integration',
        'Provide Beymax your battletag with a simple command. Beymax will \
        periodically check your competitive rank and post messages when you \
        gain rank. Additionally, you can send commands to trigger end-of-season \
        and start-of-season messages for everyone who is tracking their rank'
      ),
      new Feature(
        'Unique Party System (Temporary Voice Channels)',
        'Users can issue a simple command to have Beymax create a voice channel \
        for them. They can issue a second command to delete the channel when they\'re \
        done, or Beymax will automatically delete it in 24 hours. This feature \
        allows users without permissions to create channels directly to have a \
        place to group up for a game without clogging pre-existing channels'
      ),
      new Feature(
        'Birthday Notifications',
        'Users can provide their birthday to Beymax with a simple command. Beymax \
        will then post a congratulatory message to the server on their birthday'
      ),
      new Feature(
        'Server fundraisers',
        'Beymax can run fundraisers on the server to collect money for server upkeep \
        or anything else you and your group are paying for'
      ),
      new Feature(
        'Status messages, random reactions, and greetings',
        'Beymax also supports a few features which are mostly just for fun, rather \
        than serving some need for the server. By default, these features are a \
        randomly changing status (Playing ...), random reactions to messages in \
        the server, and greetings for new users when they join'
      ),
      new Feature(
        'Customizable Permissions',
        'Beymax supports customizable permissions using the easy-to-read yaml format. \
        Enable or disable specific commands based on roles or usernames'
      ),
      new Feature(
        'Customizable feature set',
        'Don\'t like some of the features Beymax comes with? Or maybe you want to \
        add your own features? Beymax\'s codebase is built on top of a highly customizable \
        internal API allowing you to easily disable certain features or add your own'
      ),
      new Feature(
        'Bug Tracking System',
        'For servers working with their own versions of Beymax\'s code or with other \
        developmental features, Beymax supports a simple help ticketing system \
        allowing users to easily notify admins when they encounter a problem and \
        to be notified when the problem has been resolved. Also great for servers \
        which are used specifically as a hub for another software or service'
      )
    ]
  }
}
