import { Component } from '@angular/core';
import { RouterEvent, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { GameListComponent } from "./game-list/game-list.component";
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GameListComponent, HeaderComponent, RouterOutlet, RouterModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'game-list';
}
