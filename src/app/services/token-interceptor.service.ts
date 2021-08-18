import { Injectable} from '@angular/core';
import  {HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, 
  HttpClient,
  HttpErrorResponse} from '@angular/common/http';
import { UsuariosService } from './usuarios.service';
import {CookieService} from "ngx-cookie-service";
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private httpClient:HttpClient,private cookieService:CookieService,
    private ruta:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<unknown>>{
    const token: string = this.cookieService.get('token');
    
    
    
    req = req.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    })
    
    
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {

        
        if (err.status === 401) {
          this.ruta.navigateByUrl('/login');
        }

        return throwError(err);

      })
    );

  }
}
