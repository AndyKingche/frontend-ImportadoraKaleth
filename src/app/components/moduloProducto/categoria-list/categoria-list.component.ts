import { Component, HostBinding, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { FormGroup } from '@angular/forms';
import { NotificacionService } from '../../../services/notificacion.service';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  categorias: any = [];
  
  constructor(private categoriaservice : CategoriaService,
    private notificacion: NotificacionService) { }

  ngOnInit() {
    this.getCategoria();
  }

  getCategoria(){
    this.categoriaservice.getCategorias().subscribe(
      res => {
        this.categorias = res
      },
      err => console.error(err)
    );
  }

  deleteCategoria(id: number)
  {
    this.categoriaservice.deleteCategoria(id).subscribe(
      res => {
        setTimeout(()=>{
          this.notificacion.showInfo('El estado civil se ha eliminado','Estado civil eliminado');

        },200);
        this.getCategoria()
      },
      err => console.error(err)
    );

  }

}
