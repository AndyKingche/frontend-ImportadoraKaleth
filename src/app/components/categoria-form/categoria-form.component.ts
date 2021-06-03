import { Component, HostBinding, OnInit } from '@angular/core';
import { Categorias } from '../../models/Categorias';
import { CategoriaService } from '../../services/categoria.service';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacionService } from '../../services/notificacion.service';
declare let $ : any;
@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  categorias : Categorias = {
    nombre:'',
    descripcion:''
  }
  edit : boolean = false;
  constructor(private categoriaservice: CategoriaService, 
    private router: Router,
    private activedrouter: ActivatedRoute,
    private notificacion: NotificacionService) { }

  ngOnInit() {
    const params = this.activedrouter.snapshot.params;
    if(params.id){
      this.categoriaservice.getCategoria(params.id).subscribe(
        res=>{
          if(res!= null){
            this.categorias = res; 
            this.edit = true;

          }else{
            this.router.navigate(['/category']);
          }
          
        },
        err => console.log("hay error "+ err)
      )
    }
  }

  saveCategoria(){
    let nombre = this.quitarespacios('#nombre');
    let descripcion = this.quitarespacios('#descripcion')
    if(nombre.length>0){
      this.categorias.nombre = nombre;
      this.categorias.descripcion = descripcion;
      this.categoriaservice.saveCategoria(this.categorias).subscribe(
        res=>{

          setTimeout(()=>{
            this.notificacion.showSuccess('La categoria se ha agregado correctamente','Categoria agregada');
          },100)
          this.router.navigate(['/category']);
        },error => console.error(error)
      );
    }else{
      this.notificacion.showError('Revise si todos los campo esten llenos','**Error al agergar Categoria')
    }
  }

  updateCategoria(){
    let nombre = this.quitarespacios('#nombre');
    let descripcion = this.quitarespacios('#descripcion');
    if(nombre.length > 0){
      this.categorias.nombre = nombre;
      this.categorias.descripcion = descripcion;
      this.categoriaservice.updateCategoria(this.categorias.id, this.categorias).subscribe(
        res => {
          this.categorias.nombre = '';
          this.categorias.descripcion = '';
          setTimeout(()=>{
            this.notificacion.showSuccess('La categoria se ha actualizado correctamente','Categoria actualizada');
          },100)

          this.router.navigate(['/category'])
        },
        err => console.error(err)
      );
    }else{
      this.notificacion.showError('Revise si estan llenos los campos','**Error al actuclizar la Categoria')
    }
  }

  quitarespacios(atributoHTML: string){
    let obtenerletras = $(atributoHTML).val();

    return obtenerletras.trim();
  }

}
