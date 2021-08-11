import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuariosService } from '../services/usuarios.service';
import { CookieService } from "ngx-cookie-service";
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordGuard implements CanActivate {
  constructor(private authservice:UsuariosService, private ruta:Router,
    private cookieService:CookieService,private activerouted: ActivatedRoute){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const resetpass = next.params['id'];
   
      return this.authservice.getUserByEmail(resetpass).pipe(map(
      res=>{
        console.log(res[0].resetPassword)
        if( res[0].resetPassword ){
          return true;
        }else{
          alert("El link ha caducado o no existe, por favor vuelva a ingresar el email en la session Olvide mi contraseña")
            this.ruta.navigate(['/login']);
          this.cookieService.delete('token');
        }
   
      
      }
    ));
  }
  
}
