import { Component, OnInit, HostListener } from '@angular/core';
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
    this.player = this.gameService.getPlayer;

    this.socket.on('PlayerAdded', (data) => {
      console.log('PlayerAdded: '+JSON.stringify(data));
      this.players.push(data.player);
    });

    this.socket.on('PlayerDeleted', (data) => {
      console.log('PlayerDeleted: '+JSON.stringify(data));
      const filteredPlayers = this.players.filter(t => t._id !== data.player._id);
      this.apiMessage = data.message;
      console.log(this.apiMessage);
      this.players = filteredPlayers;
    });

    this.socket.on('PlayerUpdated', (data) => {
      console.log('PlayerUpdated: '+JSON.stringify(data));
      const updatedPlayers = this.players.map(t => {
          if(data.player._id !== t._id){
            return t;
          }
          return { ...t, ...data.player };
        })
        this.apiMessage = data.message;
        this.players = updatedPlayers;
    });
  }

  @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
      if(this.player) {      
        this.gameService.deletePlayer(this.player, this.socket);
      }
    }

  UpdatePlayer():void{
    if(this.player) {
      this.gameService.updatePlayer(this.player, this.socket);
    }
  }

  setStyle(posX, posY, color) {
    let styles = {
      'top': posX + 'px',
      'left': posY + 'px',
      'background-color': color
    };
    return styles;
  }
}
