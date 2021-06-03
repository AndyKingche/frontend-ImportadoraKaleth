import { Component, HostBinding, OnInit } from '@angular/core';
import { Disenos } from '../../models/Diseno';
import { DisenosService } from '../../services/disenos.service';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacionService } from '../../services/notificacion.service';
declare let $ : any;
@Component({
  selector: 'app-disenos-form',
  templateUrl: './disenos-form.component.html',
  styleUrls: ['./disenos-form.component.css']
})
export class DisenosFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  disenos : Disenos = {
    nombre:''
  }
  edit : boolean = false;
  constructor(private disenoservice: DisenosService, 
    private router: Router,
    private activedrouter: ActivatedRoute,
    private notificacion: NotificacionService) { }

  ngOnInit() {
    const params = this.activedrouter.snapshot.params;
    if(params.id){
      this.disenoservice.getDiseno(params.id).subscribe(
        res=>{
          if(res!= null){
            this.disenos = res; 
            this.edit = true;

          }else{
            this.router.navigate(['/design']);
          }
          
        },
        err => console.log("hay error "+ err)
      )
    }
  }

  saveDisenos(){
    let nombre = this.quitarespacios('#nombre');
    if(nombre.length>0){
      this.disenos.nombre = nombre;
      
      this.disenoservice.saveDiseno(this.disenos).subscribe(
        res=>{

          setTimeout(()=>{
            this.notificacion.showSuccess('El diseno se ha agregado correctamente','Diseno agregado');
          },100)
          this.router.navigate(['/design']);
        },error => console.error(error)
      );
    }else{
      this.notificacion.showError('Revise si todos los campo esten llenos','**Error al agergar Disenos')
    }
  }

  updateDisenos(){
    let nombre = this.quitarespacios('#nombre');
    if(nombre.length > 0){
      this.disenos.nombre = nombre;
      
      this.disenoservice.updateDiseno(this.disenos.id, this.disenos).subscribe(
        res => {
          this.disenos.nombre = '';
         
          setTimeout(()=>{
            this.notificacion.showSuccess('El diseno se ha actualizado correctamente','Diseno se ha actualizado');
          },100)

          this.router.navigate(['/design'])
        },
        err => console.error(err)
      );
    }else{
      this.notificacion.showError('Revise si estan llenos los campos','**Error al actuclizar el Diseno')
    }
  }

  quitarespacios(atributoHTML: string){
    let obtenerletras = $(atributoHTML).val();

    return obtenerletras.trim();
  }
}
