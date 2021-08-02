import { Productos } from "./catProducto";
import { PuntosVentas } from "./catPuntosVenta";

export interface peDetallePedidoAux{
    idDetallePe?: number;
    descripcion?: string;
    valorTotal?: number;
    valorUnit?: number;
    cantidadPe?:number;
    catProducto?: Productos;
    catPuntosVenta?: PuntosVentas;
    
}