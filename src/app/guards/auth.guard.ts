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
  constructor(private authservice:UsuariosService, 
    private ruta:Router,private cookieService:CookieService){}
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean>
    // : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
     {
    const rolObtenido = new Promise(async(resolve, reject) => {
      try {
        await this.authservice.getUserLogged().subscribe(
          res=>{
            console.log(res)
            if(res){
              resolve(res[0].rol)
            }
            else{
            this.ruta.navigate(['/login']);
            this.cookieService.delete('token');
            }
          }
        )  
      } catch (error) {
        this.ruta.navigate(['/login']);
        this.cookieService.delete('token');
      }
      
      
    });

  let rol = await rolObtenido.then(res=>res);
  //console.log("este es el rol"+rol)
  if(rol == 1){
    return true;
  }else{
    this.ruta.navigate(['/login']);
    this.cookieService.delete('token');
  }

    
    // return this.authservice.getUserLogged()
    // .pipe(map(
    //   res=>{
    //     if(res[0].rol==1){
    //       return true;

    //     }else{
    //       this.ruta.navigate(['/login']);
    //       this.cookieService.delete('token');
    //     }
      
    //   }
    // ));
  }
 
}
