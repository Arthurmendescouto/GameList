import { RedirectCommand, Routes } from '@angular/router';
import { GameListComponent } from './game-list/game-list.component';
import { RpgGameListComponent } from './rpggame-list/rpggame-list.component';
import { PlatformGameListComponent } from './platform-game-list/platform-game-list.component';

import { DetailsComponent } from './details/details.component';

export const routes: Routes = [

  {path: '', component: GameListComponent},
  {path:'rpg', component: RpgGameListComponent},
  {path:'platform', component: PlatformGameListComponent},
  {path: 'details/:gameId', component: DetailsComponent}

];
