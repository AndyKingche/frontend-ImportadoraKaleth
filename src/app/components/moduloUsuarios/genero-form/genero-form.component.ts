import { Component, HostBinding, OnInit } from '@angular/core';
import { GeneroService } from '../../../services/genero.service';
import { Genero } from '../../../models/Genero';

import { ActivatedRoute, Router} from '@angular/router';

declare let $: any; 

@Component({
  selector: 'app-genero-form',
  templateUrl: './genero-form.component.html',
  styleUrls: ['./genero-form.component.css']
})
export class GeneroFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  generos: Genero={
    nombre:''
  }
  edit: boolean = false;
  constructor(private activedrouter: ActivatedRoute, 
    private router: Router,
    private generoservice: GeneroService) { }

  ngOnInit() {
    const params = this.activedrouter.snapshot.params;
    if(params.id){
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
    }
  }

  saveGenero(){
    this.generoservice.saveGenero(this.generos).subscribe(
      res=>{

      },error => console.error(error)

    );
  }
  updateGenero(){
    this.generoservice.updateGenero(this.generos.id_genero,this.generos).subscribe(
      res =>{

      },error => console.error(error)
    );
  }

  quitaresapacios(atributoHTML:string){
    let obtenerletras = $(atributoHTML).val();
    return obtenerletras.trim();

  }
}
