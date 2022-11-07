import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {Subscription} from 'rxjs';
import { HttpService } from '../services/http.service';
import { APIResponse, Game } from '../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public sort:string = '';
  gamesub:Subscription = new Subscription;
  routesub:Subscription = new Subscription;
  games:Array<Game>=[];
  constructor(private httpService:HttpService, private router:Router, private activatedroute:ActivatedRoute) { }

  ngOnInit() {
    this.routesub = this.activatedroute.params.subscribe((params:Params)=>{
      if(params['game-search']){
        this.searchgames('metacrit',params['game-search']);
      }
      else{
        this.searchgames('metacrit');
      }
    })
  }
searchgames(sort:string, search?:string){
  this.gamesub = this.httpService.getgameslist(sort,search).subscribe((getallgamesdata:APIResponse<Game>)=>{
    this.games = getallgamesdata.results;
  })
}
opengamedetails(id:string){
  this.router.navigate(['details',id])
}
}