import { HttpEvent,HttpHandler,HttpInterceptor,HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor{
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
        setHeaders: {
            'X-RapidAPI-Key': '9648dcf4bamsh58c59b38b5a8d97p1a2452jsn7da5b9eba7d9',
            'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
         },
         setParams:{
          key:'36a4f685a3544e10998c8dd8751cecc7' 
         }
 });
return next.handle(req)
}
}