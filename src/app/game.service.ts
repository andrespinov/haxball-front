import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://localhost:3000/player';
  showAddGameBox:boolean = true;

  constructor(private http: Http) { }

  getPlayers(): Promise<any>{
    return this.http.get(this.apiUrl)
               .toPromise()
    }
  getPlayer(id:string): Promise<any>{
    return this.http.get(this.apiUrl + id)
                    .toPromise()
  }
  createPlayer(player:any,socket:any): void{
    socket.emit('addPlayer', player);
  }
  updatePlayer(player:any,socket:any):void{
    socket.emit('updatePlayer', player);
  }
  deletePlayer(player:any,socket:any):void{
    socket.emit('deletePlayer', player);
  }

}
