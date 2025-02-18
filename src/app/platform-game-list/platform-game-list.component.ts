import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
  loading: boolean = true;
  isBackendRunning: boolean = true;
  private interval: any;

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.checkBackend();
  }

  checkBackend() {
    this.startProgress(); // Inicia a barra de progresso

    this.http.get('http://localhost:8080/lists/2/games', { observe: 'response' })
      .subscribe({
        next: () => {
          this.isBackendRunning = true;
          setTimeout(() => {
            this.getGames(); // Chama getGames após o tempo de 3 segundos
          }, 3000); // Atraso de 3 segundos para a barra de progresso ser visível
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 0 || err.status === 404) {
            this.isBackendRunning = false;
            this.loading = false;
            this.progress = 100; // Finaliza a barra de progresso no erro
            this.cdr.detectChanges();
          }
        }
      });
  }

  getGames() {
    this.http.get<any[]>('http://localhost:8080/lists/2/games').subscribe({
      next: (data) => {
        console.log(data);
        this.games = data.map((game) => ({
          id: game.id,
          title: game.title,
          imgUrl: game.imgUrl,
          shortDescription: game.shortDescription,
          year: game.year
        }));

        const savedOrder = JSON.parse(localStorage.getItem('gameOrder') || '[]');
        if (savedOrder.length > 0) {
          this.games = this.reorderGames(savedOrder);
        }
        this.loading = false;
        this.progress = 100; // Barra de progresso vai até 100% após carregar
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar os jogos', err);
        this.loading = false;
        this.progress = 100; // Finaliza a barra de progresso em caso de erro
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

    localStorage.setItem('gameOrder', JSON.stringify(orderedIds));
    console.log('Ordem salva no localStorage!', orderedIds);
  }

  reorderGames(savedOrder: any[]) {
    return this.games.sort((a, b) => {
      const aOrder = savedOrder.find((item) => item.id === a.id)?.order || 0;
      const bOrder = savedOrder.find((item) => item.id === b.id)?.order || 0;
      return aOrder - bOrder;
    });
  }

  startProgress() {
    // Inicia a barra de progresso e garante que ela vai de 0 a 100 em 3 segundos
    this.progress = 0;
    let progressInterval = 100; // 3 segundos, aumentando de 10 em 10
    this.interval = setInterval(() => {
      if (this.progress < 100) {
        this.progress += 10;
        this.cdr.detectChanges();
      } else {
        clearInterval(this.interval); // Para a barra de progresso quando atingir 100%
      }
    }, progressInterval); // Atualiza a cada 300ms
  }

  navigateToDetails(gameId: number) {
    this.router.navigate(['/details', gameId]);
  }
}
