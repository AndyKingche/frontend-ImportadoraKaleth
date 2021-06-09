import { Component, HostBinding, OnInit } from '@angular/core';
import { Estadocivil } from '../../models/Estadocivil';
import { EstadoCivilService } from '../../services/estado-civil.service';
import { FormGroup } from '@angular/forms';
import { NotificacionService } from '../../services/notificacion.service';

@Component({
  selector: 'app-estado-civil-list',
  templateUrl: './estado-civil-list.component.html',
  styleUrls: ['./estado-civil-list.component.css']
})
export class EstadoCivilListComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  status: any = [];
  constructor( private estadocivilservice : EstadoCivilService,
    private notificacion: NotificacionService) { }

  ngOnInit() {
    this.getEstado_Civil();
  }

  getEstado_Civil(){
    this.estadocivilservice.getEstadociviles().subscribe(
      res => {
        this.status = res
      },
      err => console.error(err)
    );
  }

  deleteEstado_Civil(id: number)
  {
    this.estadocivilservice.deleteEsatdocivil(id).subscribe(
      res => {
        setTimeout(()=>{
          this.notificacion.showInfo('El estado civil se ha eliminado','Estado civil eliminado');

        },200);
        this.getEstado_Civil()
      },
      err => console.error(err)
    );

  }

}
