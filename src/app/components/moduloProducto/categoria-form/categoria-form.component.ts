import { Component, HostBinding, OnInit } from '@angular/core';
import { Categorias } from '../../../models/catCategoria';
import { CategoriaService } from '../../../services/categoria.service';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacionService } from '../../../services/notificacion.service';
declare let $ : any;
@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  categorias : Categorias = {
    nombreCategoria:'',
    descripcion:''
  }
  creacion:string='';
  edit : boolean = false;
  constructor(private categoriaservice: CategoriaService, 
    private router: Router,
    private activedrouter: ActivatedRoute,
    private notificacion: NotificacionService) { }

  ngOnInit() {
    this.creacion = 'Crear';
    const params = this.activedrouter.snapshot.params;
    if(params.id){
      this.categoriaservice.getCategoria(params.id).subscribe(
        res=>{
          if(res!= null){
            this.creacion = 'Actualizar';
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
    
    if(this.testingresar()){
     
      this.categoriaservice.saveCategoria(this.categorias).subscribe(
        res=>{

          setTimeout(()=>{
            this.notificacion.showSuccess('La categoria se ha agregado correctamente','Categoria agregada');
          },100)
          this.router.navigate(['/admin/category']);
        },error => console.error(error)
      );
    }else{
      this.notificacion.showError('Revise si todos los campo esten llenos','**Error al agergar Categoria')
    }
  }

  updateCategoria(){

    if(this.testingresar()){
      this.categoriaservice.updateCategoria(this.categorias.idCategoria, this.categorias).subscribe(
        res => {
          this.categorias.nombreCategoria = '';
          this.categorias.descripcion = '';
          setTimeout(()=>{
            this.notificacion.showSuccess('La categoria se ha actualizado correctamente','Categoria actualizada');
          },100)

          this.router.navigate(['/admin/category'])
        },
        err => console.error(err)
      );
    }else{
      this.notificacion.showError('Revise si estan llenos los campos','**Error al actuclizar la Categoria')
    }
  }


  quitarespacios(atributoHTML: string) {
    let obtenerletras = $(atributoHTML).val();
    return obtenerletras.trim();
  }

  testingresar() {
    
    if (this.categorias.nombreCategoria.length !=0 &&
      this.categorias.descripcion.length !=0) {
      return true;
    } else {
      
      return false;
    }
  }

}
