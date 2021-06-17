import { Component, HostBinding, OnInit } from '@angular/core';
import { Tallas } from '../../../models/catTalla';
import { MedidaService } from '../../../services/medida.service';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacionService } from '../../../services/notificacion.service';
declare let $ : any ;

@Component({
  selector: 'app-medida-form',
  templateUrl: './medida-form.component.html',
  styleUrls: ['./medida-form.component.css']
})
export class MedidaFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  tallas : Tallas = {
    medida:'',
    descripcion:'',
    tipo:''
  }
  edit : boolean = false;
  constructor(private tallasservice: MedidaService, 
              private router: Router,
              private activedrouter: ActivatedRoute,
              private notificacion: NotificacionService) { }

  ngOnInit() {
    const params = this.activedrouter.snapshot.params;
    if(params.id){
      this.tallasservice.getTalla(params.id).subscribe(
        res=>{
          if(res!= null){
            this.tallas = res; 
            this.edit = true;

          }else{
            this.router.navigate(['/size']);
          }
          
        },
        err => console.log("hay error "+ err)
      )
    }
  }

  saveTallas(){
    let medida = this.quitarespacios('#medida');
    let descripcion = this.quitarespacios('#descripcion');
    let tipo=this.quitarespacios('#tipo')
    if(medida.length>0){
      this.tallas.medida = medida;
      this.tallas.descripcion = descripcion;
      this.tallas.tipo =tipo;
      this.tallasservice.saveTalla(this.tallas).subscribe(
        res=>{
          this.tallas.medida='';
          this.tallas.descripcion ='';
          this.tallas.tipo ='';
          setTimeout(()=>{
            this.notificacion.showSuccess('La talla/medida se ha agregado correctamente','Medida agregada');
          },200)
          this.router.navigate(['/size']);
        },error => console.error(error)
      );
    }else{
      this.notificacion.showError('Revise si los campo estan llenos','**Error al Agergar Talla/Medida')
    }
  }

  updateTallas(){
    let medida = this.quitarespacios('#medida');
    let descripcion = this.quitarespacios('#descripcion');
    let tipo=this.quitarespacios('#tipo')
    if(medida.length > 0){
      this.tallas.medida = medida;
      this.tallas.descripcion = descripcion;
      this.tallas.tipo = tipo;
      this.tallasservice.updateTalla(this.tallas.idTallas ,this.tallas).subscribe(
        res => {
          this.tallas.medida = '';
          this.tallas.descripcion = '';
          this.tallas.tipo = '';
          setTimeout(()=>{
            this.notificacion.showSuccess('La medida/talla se ha actualizado correctamente','Medida/Talla actualizado');
          },200)

          this.router.navigate(['/size'])
        },
        err => console.error(err)
      );
    }else{
      this.notificacion.showError('Revise si estan llenos los campos','**Error al actuclizar Medida')
    }
  }

  quitarespacios(atributoHTML: string){
    let obtenerletras = $(atributoHTML).val();

    return obtenerletras.trim();
  }

}
