import { Component, HostBinding, OnInit } from '@angular/core';
import { Rolusuarios } from '../../models/Rolusuarios';
import { RolesUsuariosService } from '../../services/roles-usuarios.service';

@Component({
  selector: 'app-roles-usuarios-list',
  templateUrl: './roles-usuarios-list.component.html',
  styleUrls: ['./roles-usuarios-list.component.css']
})
export class RolesUsuariosListComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  rol_users :any=[];
    constructor(private rolesusuarioservices : RolesUsuariosService) { }

  ngOnInit() {
    this.getRolusuarios();
  }

  getRolusuarios(){
    this.rolesusuarioservices.getRolusuarios().subscribe(
      res =>{
        console.log(res)
        this.rol_users = res;
      },err => console.error(err)
      
    );
  }

  deleteRolusuarios(id:number){
    this.rolesusuarioservices.deleteRolusuario(id).subscribe(
      res=>{
        this.getRolusuarios();
      },error => console.error(error)
    );
  }


}
