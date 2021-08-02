import { cat_stock } from "./cat_stock";

export interface VenDetalleFact {
    idDetalleFact?: number;
    cantidadFact?: number
    descripcion?: string;
    valorTotal?: number;
    valorUnit?: number;
    catStock?: {
        id: {
            idPuntosVenta?: number;
            idProductos?: number;
        }
    };
}