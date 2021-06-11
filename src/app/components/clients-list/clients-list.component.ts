import { Component, HostBinding, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { FormGroup } from '@angular/forms';
import { NotificacionService } from '../../services/notificacion.service';
@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  client: any = [];
  
  constructor(private clientesservice : ClientesService,
    private notificacion: NotificacionService) { }

  ngOnInit() {
    this.getCliente();
  }

  getCliente(){
    this.clientesservice.getClientes().subscribe(
      res => {
        this.client = res;
      },
      err => console.error(err)
    );
  }

  deleteCliente(id: number)
  {
    this.clientesservice.deleteCliente(id).subscribe(
      res => {
        setTimeout(()=>{
          this.notificacion.showInfo('El Cliente se ha eliminado','Estado civil eliminado');

        },200);
        this.getCliente()
      },
      err => console.error(err)
    );

  }

}
