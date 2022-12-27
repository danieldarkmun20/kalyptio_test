export type Type = "private" | "public";
export type Amenity =
  | "Camaras de vigilancia"
  | "Cajon techado"
  | "Departamento"
  | "Planta baja"
  | "Estacionamiento cerrado"
  | "Lugar en bateria";
export type Image = {
  path: string;
};
export interface Parking {
  id: number;
  address: string;
  amenities: Amenity[];
  score: string;
  type: Type;
  images: Image[];
  description: string;
  price_total: string;
  price_month: string;
}

export type Filter = {
  amenities: Array<string>;
  max_price: string;
  min_price: string;
  type: string;
};

export type NewParkingEntry = Omit<Parking, "id">;
