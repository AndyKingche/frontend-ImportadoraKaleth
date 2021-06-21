import { Component, HostBinding, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { NotificacionService } from '../../../services/notificacion.service';
import { Usuarios } from '../../../models/Usuarios';
@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  usuarios : any=[];
  selectedusuarios: Usuarios;
  cols: any[];
  constructor(private usuariosservices: UsuariosService,
    private notificacion: NotificacionService) { }

  ngOnInit() {
  
    this.getUsuarios();  

    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'apellido', header: 'Apellido' },
      { field: 'cedula', header: 'Cedula' },
      { field: 'email', header: 'Email' },
      { field: 'telefono', header: 'Telefono' },
      { field: 'estado', header: 'Estado'},
      { field: 'genero nombre', header: 'Estado Civil'},
      { field: 'fechanacimiento', header: 'Fecha de nacimiento'}
  ];
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
    try {
      
      this.usuariosservices.deleteUsuario(id).subscribe(
        res=>{
          setTimeout(()=>{
            this.notificacion.showInfo('Usuario eliminado correctamente','Usuario Eliminado');
          },100)
          this.getUsuarios();
        },err => {console.log(err); this.notificacion.showWarning('El Usuario no se puede eliminar ya que sus datos estan con rol muy importante','Informacion')}
      );
    } catch (error) {
       
    }
  }

}
