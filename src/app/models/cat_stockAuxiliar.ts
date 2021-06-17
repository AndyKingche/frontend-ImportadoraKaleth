import { Productos } from './catProducto'
import { PuntosVentas } from './catPuntosVenta';

export interface cat_stockAuxiliar {
    cantidad?: number;
    catProducto?: Productos;
    catPuntosVenta?: PuntosVentas;
    existe: string;
    precioDistribuidor?: number;
    precioMayor?: number;
    precioUnit?: number;
    stockMax?: number;
    stockMin?: number;

}