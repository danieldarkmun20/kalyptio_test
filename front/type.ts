export type Type = "private" | "public";
export type Amenity = {
  description:
    | "Camaras de vigilancia"
    | "Cajon techado"
    | "Departamento"
    | "Planta baja"
    | "Estacionamiento cerrado"
    | "Lugar en bateria";
};

export type Image = {
  path: string;
};
export interface Parking {
  id: number;
  address: string;
  amenities: Amenity[];
  score: string;
  type: Type;
  price_total: string;
  price_month: string;
  images: Image[];
  description: string;
}

export type NewParkingEntry = Omit<Parking, "id">;