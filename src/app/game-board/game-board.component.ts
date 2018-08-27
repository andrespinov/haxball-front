import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GameService } from '../game.service';
import io  from "socket.io-client";

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
  response;

  private url = 'http://localhost:3001';
  private socket;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.showAddGameBox = true;
    this.gameService.getPlayers().subscribe(data => this.players = data);
    this.socket = io.connect(this.url);
    this.socket.on('PlayerAdded', (data) => {
      console.log('PlayerAdded: '+JSON.stringify(data));
      this.players.push(data.player);
    });
  }

  AddPlayer(player:any):void{
    
    if(!player){ return; }
    this.gameService.createPlayer(player, this.socket);
  }
}
