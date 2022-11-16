import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute,Router,Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from '../../models';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  gameId:string='';
 gameRating = 0;
 game!:Game;
 private routeSub:Subscription=new Subscription;
 private gameSub:Subscription=new Subscription;
  constructor(
    private httpService:HttpService, 
    private activatedRoute:ActivatedRoute, 
    private router:Router
  ) { }

  ngOnInit() {
    this.routeSub=this.activatedRoute.params.subscribe((params:Params)=>{
      this.gameId=params['id'];
      this.gameDetails(this.gameId);
    })
  }
  gameDetails(id:string){
    this.gameSub=this.httpService.getGameDetail(id).subscribe((gameResp:Game)=>{
      console.log(gameResp);
      this.game=gameResp;
      setTimeout(()=>{
        this.gameRating=this.game.metacritic;
      },1000)
    })
  }

  getColor(value:number):string{
    if (value > 75) {
    return '#5ee432';
    } else if (value > 50) {
    return '#fffa50';
    } else if (value > 30) {
    return '#f7aa38';
    } else {
    return '#ef4655';
    }
    }
}