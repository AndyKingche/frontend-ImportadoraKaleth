import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuariosService } from '../services/usuarios.service';
import { CookieService } from "ngx-cookie-service";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authservice:UsuariosService, private ruta:Router,private cookieService:CookieService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authservice.getUserLogged().pipe(map(
      res=>{
        if(res[0].rol==1){
          return true;

        }else{
          this.ruta.navigate(['/login']);
          this.cookieService.delete('token');
        }
      
      }
    ));
  }
  
}
