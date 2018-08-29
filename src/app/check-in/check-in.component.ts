import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../game.service';
import io  from "socket.io-client";

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {
  player: any = {};
  private socket;
  private url = 'http://localhost:3001';

  constructor( private gameService: GameService, public router: Router ) { }

  ngOnInit() {
    this.socket = io.connect(this.url);
    this.gameService.setSocket(this.socket);
    this.socket.on('PlayerAdded', (data) => {
      console.log('PlayerAdded: '+JSON.stringify(data));
    });
  }

  AddPlayer():void{
    if(this.player) {
      this.player.posX = Math.floor(Math.random() * 100);
      this.player.posY = Math.floor(Math.random() * 100);
      this.player.color = "#088A4B";
      this.gameService.createPlayer(this.player, this.socket);
      this.gameService.setPlayer(this.player);
      this.router.navigate(['juego']);
    }
  }

}
