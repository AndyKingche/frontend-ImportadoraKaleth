import { Clientes } from "./Clientes";
import { peDetallePedido } from "./peDetallePedido";


export interface peCabezaPedido{
    idCabezaFac?:number;
    estado?:string;
	fechaPe?:string;
	total?:number;
    detallepedido?:Array<peDetallePedido>;
    venCliente?:Clientes;
}