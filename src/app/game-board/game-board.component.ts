import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import io from "socket.io-client";

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  players:any[] = [];
  player:any = {};
  playerToEdit:any = {};
  playerToDelete:any = {};
  fetchingData:boolean = false;
  apiMessage:string;

  private url = 'http://localhost:3000/player';
  private socket;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.showAddGameBox = true;
    this.gameService.getPlayers().then(td => this.players = td.players );
    this.socket = io.connect(this.url);
    this.socket.on('addPlayer', (data) => {
      console.log('AddPlayer: '+JSON.stringify(data));
      this.players.push(data.player);
    });
  }

  AddPlayer(player:any):void{
    if(!player){ return; }
    this.gameService.createPlayer(player, this.socket);
  }
}
