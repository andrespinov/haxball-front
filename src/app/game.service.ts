import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://localhost:3000/api/player';
  showAddGameBox:boolean = true;

  constructor(private http: Http) { }

  getPlayers(): Observable<any> {
    return this.http.get(this.apiUrl);
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
