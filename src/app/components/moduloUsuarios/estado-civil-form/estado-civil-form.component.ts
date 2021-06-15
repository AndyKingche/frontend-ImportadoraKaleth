import { Component, HostBinding, OnInit } from '@angular/core';
import { Estadocivil } from '../../../models/Estadocivil';
import { EstadoCivilService } from '../../../services/estado-civil.service';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacionService } from '../../../services/notificacion.service';
declare let $ : any;
@Component({
  selector: 'app-estado-civil-form',
  templateUrl: './estado-civil-form.component.html',
  styleUrls: ['./estado-civil-form.component.css']
})
export class EstadoCivilFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  state : Estadocivil = {
    nombre:''
  }
  edit : boolean = false;
  actualizar: string = 'Ingresar';
  constructor(private estadocivilservice: EstadoCivilService, 
              private router: Router,
              private activedrouter: ActivatedRoute,
              private notificacion: NotificacionService) { }

  ngOnInit() {
    const params = this.activedrouter.snapshot.params;
    if(params.id){
      this.actualizar = 'Actualizar'
      this.estadocivilservice.getEstadocivil(params.id).subscribe(
        res=>{
          if(res!= null){
            this.state = res; 
            this.edit = true;
            
          }else{
            this.router.navigate(['/civil-status']);
          }
          
        },
        err => console.log("hay error "+ err)
      )
    }else{
      this.actualizar='Ingresar';
    }
  }

  saveEstado_Civil(){
    let nombre = this.quitarespacios('#nombre');
    if(nombre.length>0){
      this.state.nombre = nombre;
      this.estadocivilservice.saveEstadocivil(this.state).subscribe(
        res=>{
          this.state.nombre=' ';
          setTimeout(()=>{
            this.notificacion.showSuccess('El estado civil se ha agregado correctamente','Estado civil agregado');
          },200)
          this.router.navigate(['/civil-status']);
        },error => console.error(error)
      );
    }else{
      this.notificacion.showError('Revise si el campo esta lleno','**Error al Agergar Estado civil')
    }
  }

  updateEstado_Civil(){
    let nombre = this.quitarespacios('#nombre');
    if(nombre.length > 0){
      this.state.nombre = nombre;
      this.estadocivilservice.updateEstadocivil(this.state.idEstadocivil ,this.state).subscribe(
        res => {
          this.state.nombre = ' ';
          setTimeout(()=>{
            this.notificacion.showSuccess('El estado civil se ha actualizado correctamente','Estado civil actualizado');
          },200)

          this.router.navigate(['/civil-status'])
        },
        err => console.error(err)
      );
    }else{
      this.notificacion.showError('Revise si estan llenos los campos','**Error al actuclizar Estado Civil')
    }
  }

  quitarespacios(atributoHTML: string){
    let obtenerletras = $(atributoHTML).val();

    return obtenerletras.trim();
  }

}
