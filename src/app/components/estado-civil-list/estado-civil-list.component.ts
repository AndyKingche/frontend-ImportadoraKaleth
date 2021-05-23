import { Component, HostBinding, OnInit } from '@angular/core';
import { Estado_Civl } from '../../models/Estado_Civil';
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

}
