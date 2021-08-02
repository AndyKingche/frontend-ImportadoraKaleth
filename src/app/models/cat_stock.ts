import { Productos } from './catProducto'
import { PuntosVentas } from './catPuntosVenta';

export interface cat_stock {
    id?: {
        idPuntosVenta?: number;
        idProductos?: number;
    };
    cantidad?: number;
    stockMax?: number;
    stockMin?: number;
    precioDistribuidor?: number;
    precioMayor?: number;
    precioUnit?: number;
    existe?: string;

}