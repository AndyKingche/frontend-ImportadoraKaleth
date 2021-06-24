import { Clientes } from "./Clientes";
import { Usuarios } from "./Usuarios";
import { VenDetalleFact } from "./VenDetalleFact";


export interface VenCabezaFactura{
    idCabezaFac?:number;
    estado?:string;
	iva?:number;
	fechaFactu?:string;
	total?:number;
    usUser?:Usuarios;
    detallefact?:Array<VenDetalleFact>;
    venCliente?:Clientes;
}