import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuariosService } from '../services/usuarios.service';
import { CookieService } from "ngx-cookie-service";
@Injectable({
  providedIn: 'root'
})
export class CashierGuard implements CanActivate {
  constructor(private authservice:UsuariosService, private ruta:Router,private cookieService:CookieService){}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean>
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
    if(rol == 2){
      return true;
    }else{
      this.ruta.navigate(['/login']);
      this.cookieService.delete('token');
    }
  
    //Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return this.authservice.getUserLogged().pipe(map(
    //   res=>{
    //     if(res[0].rol==2){
    //       return true;

    //     }else{
    //       this.ruta.navigate(['/login']);
    //       this.cookieService.delete('token');
    //     }
      
    //   }
    // ));
  }
  
}
