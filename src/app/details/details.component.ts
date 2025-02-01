import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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
  loading: boolean | undefined;

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
        this.loading = false; // Definido como false quando os dados são carregados

        console.log('Game Details:', this.gameDetails);
      }
    }
    )
  }
}
