import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameListComponent } from "./game-list/game-list.component";
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-root',
  imports: [GameListComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'game-list';
}
