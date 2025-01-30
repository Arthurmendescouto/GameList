import { Routes } from '@angular/router';
import { GameListComponent } from './game-list/game-list.component';
import { RpggameListComponent } from './rpggame-list/rpggame-list.component';

export const routes: Routes = [
  {
    path: '',
     component: GameListComponent},
    {path:'rpg',
      component: RpggameListComponent}
];
