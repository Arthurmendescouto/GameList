import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  gameId!: number;
  gameDetails: any;
  loading: boolean =true;
  progress: number = 0;
  private interval: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.gameId=Number(params.get('gameId'))
      this.loadGameDetails();
    }
    )
  }

  loadGameDetails() {
    this.startProgress();
    const url = `http://localhost:8080/games/${this.gameId}`;
    this.http.get(url).subscribe({
      next:(data)=>{
        this.gameDetails=data;
        this.loading = false;
        this.progress = 100;
        clearInterval(this.interval);
        console.log('Game Details:', this.gameDetails);
        this.cdr.detectChanges();

      },
      error: (err) =>{
        console.error('Erro ao carregar os detalhes do jogo', err);
        this.loading=false;
        this.progress = 100;
        clearInterval(this.interval);
        this.cdr.detectChanges();
      }
    });
  }

  startProgress() {
    // Simula o progresso de 0 a 100%
    this.interval = setInterval(() => {
      if (this.progress < 100) {
        this.progress += 20;
        this.cdr.detectChanges();
      }
    });
  }
}
