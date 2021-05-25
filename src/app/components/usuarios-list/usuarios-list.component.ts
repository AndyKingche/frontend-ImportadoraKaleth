import { Component, HostBinding, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  usuarios : any = [];
  constructor(private usuariosservices: UsuariosService) { }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios(){
    this.usuariosservices.getUsuarios().subscribe(
      res=> {
        
        this.usuarios = res;
      },
      error=> console.error(error)
      
    );
  }

  deleteUsuarios(id:number){
    this.usuariosservices.deleteUsuario(id).subscribe(
      res=>{
        this.getUsuarios();
      },error => console.error(error)
    );
  }

}
