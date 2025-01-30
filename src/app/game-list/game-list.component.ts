import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import {  RouterLinkActive, RouterModule } from '@angular/router'; // Adicione isso aqui

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule,  RouterModule],
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  @Injectable({
    providedIn:'root'
  })
  games: {
shortDescription: any;id:number, title: String,imgUrl: String,
year: number
}[]=[];

  constructor(private http:HttpClient){}

  ngOnInit(): void {
      this.getGames();
  }
  getGames(){
    this.http.get<any[]>('https://dslist-production-8088.up.railway.app/lists/1/games').subscribe({
      next: (data)=>{
        console.log(data);
        this.games=data.map((game)=>({
          id:game.id,
          title:game.title,
          imgUrl:game.imgUrl,
          shortDescription:game.shortDescription,
          year:game.year}));
      },
      error: (err)=>{
        console.error('Erro ao carregar os jogos',err)
      }
    })
  }
}
