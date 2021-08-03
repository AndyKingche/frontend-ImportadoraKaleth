import { Injectable} from '@angular/core';
import  {HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, 
  HttpClient,
  HttpHeaders} from '@angular/common/http';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private httpClient:HttpClient) { }

  authenticate(token:any){
    new HttpHeaders({ Authorization: 'Bearer ' + token});
    sessionStorage.setItem('token', token)
    
    // return this.httpClient.get<User>('http://localhost:8080/employees/validateLogin',{headers}).pipe(
    //  map(
    //    userData => {
    //     sessionStorage.setItem('username',username);
    //     return userData;
    //    }
    //  )

    // );
    //   }
}
}