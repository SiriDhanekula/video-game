import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  getgameslist(ordering:string, search?:string):Observable<APIResponse<Game>>{
    let params = new HttpParams().set('ordering',ordering);
    if(search){
      params = new HttpParams().set('ordering',ordering).set('search',search);
    }
    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {params:params});

  }
  getGameDetail(id:string):Observable<Game>{
    const gameInfoRequest=this.http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailersRequest=this.http.get(`${env.BASE_URL}/games/${id}/movies`);
    const gameScreenshotsRequest=this.http.get(`${env.BASE_URL}/games/${id}/screenshots`);
    return forkJoin({gameInfoRequest,gameTrailersRequest,gameScreenshotsRequest
    }).pipe(map((resp:any)=>{
      console.log(resp);
      return {
        ...resp['gameInfoRequest'],
        trailers:resp['gameTrailersRequest']?.results,
        screenshots:resp['gameScreenshotsRequest']?.results
      }
    }))
  }  
}