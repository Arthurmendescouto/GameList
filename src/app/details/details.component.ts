import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'] // Corrigido para styleUrls (plural)
})
export class DetailsComponent {
  gameId!: number;
  gameDetails: any; // Esta é a variável que armazena os detalhes do jogo

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.gameId=Number(params.get('gameId'))
      this.loadGameDetails();
    }
    )
  }

  loadGameDetails() {
    const url = `https://dslist-production-8088.up.railway.app/games/${this.gameId}`;
    this.http.get(url).subscribe({
      next:(data)=>{
        this.gameDetails=data;
        console.log('Game Details:', this.gameDetails);
      }
    }
    )
  }
}
