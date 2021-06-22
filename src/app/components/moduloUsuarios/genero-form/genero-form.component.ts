import { Component, HostBinding, OnInit } from '@angular/core';
import { GeneroService } from '../../../services/genero.service';
import { Genero } from '../../../models/Genero';

import { ActivatedRoute, Router} from '@angular/router';
import { NotificacionService } from '../../../services/notificacion.service';
declare let $: any; 

@Component({
  selector: 'app-genero-form',
  templateUrl: './genero-form.component.html',
  styleUrls: ['./genero-form.component.css']
})
export class GeneroFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  generos: Genero={
    genero:'',
    nombre:''
  }
  edit: boolean = false;
  actualizar: string = 'Ingresar';
  constructor(private activedrouter: ActivatedRoute, 
    private router: Router,
    private generoservice: GeneroService,
    private notificacion: NotificacionService) { }

  ngOnInit() {
    const params = this.activedrouter.snapshot.params;
    if(params.id){
      this.actualizar = 'Actualizar';
      this.generoservice.getGenero(params.id).subscribe(
        res => {
          if(res!=null){
            this.generos = res;
            this.edit = true;
            

          }else{
            this.router.navigate(['/gender']);
          }
        }, error=> console.error(error)
      );
    }else{
      this.actualizar = 'Ingresar';
    }
  }

  saveGenero(){
    let nombre = this.quitaresapacios('#nombre');
    let generostring =  this.quitaresapacios('#genero');
    if(nombre.length >0 &&
      generostring.length>0){
        this.generos.genero = generostring;
        this.generos.nombre = nombre;
        this.generoservice.saveGenero(this.generos).subscribe(
          res=>{
            this.notificacion.showSuccess('Genero creado correctamente','Genero Creado')
          },error => console.error(error)
    
        );
      }else{
        this.notificacion.showError('Revise si los campos estan llenos','***Error al crear un nuevo Genero')

      }
    
  }
  updateGenero(){
    let nombre = this.quitaresapacios('#nombre');
    let generostring = this.quitaresapacios('#genero');
    if(nombre.length>0 &&
      generostring.length>0){
        this.generos.genero = generostring;
        this.generos.nombre = nombre;
        this.generoservice.updateGenero(this.generos.idGenero,this.generos).subscribe(
          res =>{
            setTimeout(()=>{
              this.notificacion.showSuccess('El genero se actualizo correctamente','Genero actualizado');

            },200)

            this.router.navigate(['/gender'])
          },error => console.error(error)
        );

      }else{
        this.notificacion.showError('Revisar si los campos estan llenos','***Error al actualizar Genro')
      }
  }

  quitaresapacios(atributoHTML:string){
    let obtenerletras = $(atributoHTML).val();
    return obtenerletras.trim();

  }
}
