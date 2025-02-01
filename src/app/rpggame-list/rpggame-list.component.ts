import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './rpggame-list.component.html',
  styleUrls: ['./rpggame-list.component.css']
})
export class RpggameListComponent implements OnInit {
  games: {
shortDescription: any;id:number, title: String,imgUrl: String,
year: number
}[]=[];
gameId?: number;
progress=0;

  constructor(private http:HttpClient, private router: Router, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
      this.getGames();
  }

  getGames(){
    const interval=setInterval(()=>{
      if(this.progress < 100){
        this.progress +=10;
        this.cdr.detectChanges();
      }
    })
    this.http.get<any[]>('https://dslist-production-8088.up.railway.app/lists/1/games').subscribe({
      next: (data)=>{
        console.log(data);
        this.games=data.map((game)=>({
          id:game.id,
          title:game.title,
          imgUrl:game.imgUrl,
          shortDescription:game.shortDescription,
          year:game.year
        }));
          this.progress=100;
          this.cdr.detectChanges();
      },
      error: (err)=>{
        console.error('Erro ao carregar os jogos',err);
        this.progress = 100; // Completa a barra de carregamento em caso de erro
        this.cdr.detectChanges();

      }
    })
  }
  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.games, event.previousIndex, event.currentIndex);
    this.updateGameOrder();
  }
  updateGameOrder() {
    const orderedIds = this.games.map((game, index) => ({ id: game.id, order: index + 1 }));

    this.http.post('https://dslist-production-8088.up.railway.app/lists/1/games', orderedIds).subscribe({
      next: () => console.log('Ordem atualizada com sucesso!'),
      error: (err) => console.error('Erro ao atualizar a ordem', err),
    });
  }
  navigateToDetails(gameId: number) {
    this.router.navigate(['/details', gameId]);
  }
}
