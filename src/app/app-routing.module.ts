import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CheckInComponent } from './check-in/check-in.component';
import { GameBoardComponent } from './game-board/game-board.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'comenzar', component: CheckInComponent },
  { path: 'juego', component: GameBoardComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
