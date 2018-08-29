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

  constructor(private gameService: GameService) {
    this.player = this.gameService.getPlayer();
   }

  ngOnInit() {
    this.gameService.showAddGameBox = true;
    this.gameService.getPlayers().subscribe(data => this.players = data);
    this.socket = io.connect(this.url);
    this.socket.on('PlayerAdded', (data) => {
      this.players.push(data.player);
    });

    this.socket.on('PlayerDeleted', (data) => {
      const filteredPlayers = this.players.filter(t => {
        if(data.player.name !== t.name){
          return t;
        }
      });
      this.players = filteredPlayers;
      console.log('borrado');
      console.log(this.players);
    });

    this.socket.on('PlayerUpdated', (data) => {
      const updatedPlayers = this.players.map(t => {
          if(data.player.name !== t.name){
            return t;
          }
          return data.player;
        });
        this.players = updatedPlayers;
        console.log('actualizado');
      console.log(this.players);
    });
  }

  @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
      if(this.player) {
        this.gameService.deletePlayer(this.player, this.socket);
      }
    }

  @HostListener('window:keydown', ['$event']) 
    keyEvent(event: KeyboardEvent) {
    if (event.keyCode === 37) { // Left key
      this.player.posX = this.player.posX - 5;
    } else if (event.keyCode === 38) { // Up key
      this.player.posY = this.player.posY - 5;
    } else if (event.keyCode === 39) { // Right key
      this.player.posX = this.player.posX + 5;
    } else if (event.keyCode === 40) { // Down key
      this.player.posY = this.player.posY + 5;
    }
    this.UpdatePlayer();
  }

  UpdatePlayer():void{
    if(this.player) {
      this.gameService.updatePlayer(this.player, this.socket);
    }
  }

  setStyle(posX, posY, color) {
    let styles = {
      'top': posY + 'px',
      'left': posX + 'px'
    };
    return styles;
  }
  setColor(color) {
    let styles = {
      'background-color': color
    };
    return styles;
  }
}
