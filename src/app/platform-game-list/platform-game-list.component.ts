import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-platform-game-list',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './platform-game-list.component.html',
  styleUrls: ['./platform-game-list.component.css']
})
export class PlatformGameListComponent implements OnInit {
  games: {
    shortDescription: any;
    id: number;
    title: string;
    imgUrl: string;
    year: number;
  }[] = [];
  gameId?: number;
  progress = 0;

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getGames();
  }

  getGames() {
    const interval = setInterval(() => {
      if (this.progress < 100) {
        this.progress += 10;
        this.cdr.detectChanges();
      }
    });

    this.http.get<any[]>('https://dslist-production-8088.up.railway.app/lists/2/games').subscribe({
      next: (data) => {
        console.log(data);
        this.games = data.map((game) => ({
          id: game.id,
          title: game.title,
          imgUrl: game.imgUrl,
          shortDescription: game.shortDescription,
          year: game.year
        }));

        // Verifica se existe ordem salva no localStorage
        const savedOrder = JSON.parse(localStorage.getItem('gameOrder') || '[]');
        if (savedOrder.length > 0) {
          this.games = this.reorderGames(savedOrder);
        }

        this.progress = 100;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar os jogos', err);
        this.progress = 100; // Completa a barra de carregamento em caso de erro
        this.cdr.detectChanges();
      }
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.games, event.previousIndex, event.currentIndex);
    this.updateGameOrder();
  }

  updateGameOrder() {
    const orderedIds = this.games.map((game, index) => ({ id: game.id, order: index + 1 }));

    // Salva a ordem no localStorage
    localStorage.setItem('gameOrder', JSON.stringify(orderedIds));
    console.log('Ordem salva no localStorage!', orderedIds);
  }

  reorderGames(savedOrder: any[]) {
    // Ordena os jogos com base na ordem salva
    return this.games.sort((a, b) => {
      const aOrder = savedOrder.find((item) => item.id === a.id)?.order || 0;
      const bOrder = savedOrder.find((item) => item.id === b.id)?.order || 0;
      return aOrder - bOrder;
    });
  }

  navigateToDetails(gameId: number) {
    this.router.navigate(['/details', gameId]);
  }
}
