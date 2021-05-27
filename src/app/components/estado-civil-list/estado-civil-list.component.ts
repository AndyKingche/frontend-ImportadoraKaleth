import { Component, HostBinding, OnInit } from '@angular/core';
import { Estadocivil } from '../../models/Estadocivil';
import { EstadoCivilService } from '../../services/estado-civil.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-estado-civil-list',
  templateUrl: './estado-civil-list.component.html',
  styleUrls: ['./estado-civil-list.component.css']
})
export class EstadoCivilListComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  status: any = [];
  constructor( private estadocivilservice : EstadoCivilService) { }

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
        this.getEstado_Civil()
      },
      err => console.error(err)
    );

  }

}
