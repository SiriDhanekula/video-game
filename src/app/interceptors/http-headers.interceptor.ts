import { HttpEvent,HttpHandler,HttpInterceptor,HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor{
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
        setHeaders: {
            'X-RapidAPI-Key': '55c6cf3466mshb7419f670ea0914p17568ejsn7ce36e865a9b',
            'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
         },
         setParams:{
          key:'d06422e8223048cdafd33667deec2889' 
         }
 });
return next.handle(req)
}
}