import { Component, HostBinding, OnInit } from '@angular/core';
import { DisenosService } from '../../../services/disenos.service';
import { Disenos } from '../../../models/catDiseno';
import { FormGroup } from '@angular/forms';
import { NotificacionService } from '../../../services/notificacion.service';

@Component({
  selector: 'app-disenos-list',
  templateUrl: './disenos-list.component.html',
  styleUrls: ['./disenos-list.component.css']
})
export class DisenosListComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  disenos: any = [];
  selectedDisenos : Disenos;
  
  constructor(private disenoservice : DisenosService,
    private notificacion: NotificacionService) { }

  ngOnInit() {
    this.getDisenos();
  }

  getDisenos(){
    this.disenoservice.getDisenos().subscribe(
      res => {
        this.disenos = res
      },
      err => console.error(err)
    );
  }

  deleteDisenos(id: number)
  {
    this.disenoservice.deleteDiseno(id).subscribe(
      res => {
        setTimeout(()=>{
          this.notificacion.showInfo('El diseno se ha eliminado','Diseno eliminado');

        },200);
        this.getDisenos()
      },
      err => console.error(err)
    );

  }


}
