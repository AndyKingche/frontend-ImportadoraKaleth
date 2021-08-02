import { Component, HostBinding, OnInit } from '@angular/core';
import { MedidaService }from '../../../services/medida.service';
import { Tallas } from '../../../models/catTalla';
import { NotificacionService } from '../../../services/notificacion.service';

@Component({
  selector: 'app-medida-list',
  templateUrl: './medida-list.component.html',
  styleUrls: ['./medida-list.component.css']
})
export class MedidaListComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  medidas : any = [] ;
  selectedmedidas: Tallas;
  constructor( private medidaservice : MedidaService,
    private notificacion: NotificacionService) { }

  ngOnInit() {
    this.getTallas();
  }

  getTallas(){
    this.medidaservice.getTallas().subscribe(
      res => {
        this.medidas = res
      },
      err => console.error(err)
    );
  }

  deleteTallas(id: number)
  {
    this.medidaservice.deleteTalla(id).subscribe(
      res => {
        setTimeout(()=>{
          this.notificacion.showInfo('La medida se ha eliminado','Medida eliminada');

        },200);
        this.getTallas();
      },
      err => console.error(err)
    );

  }

}
