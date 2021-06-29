import { cat_stock } from "./cat_stock";

export interface peDetallePedido{
    idDetallePe?: number;
    descripcion?: string;
    valorTotal?: number;
    valorUnit?: number;
    canidadPe?:number;
    catStock?: {
        id: {
            idPuntosVenta?: number;
            idProductos?: number;
        }
    };
}