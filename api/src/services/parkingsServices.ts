import fs from "fs";
import { Parking, NewParkingEntry } from "../../types";
import parkingData from "./parkings.json";

let parkings: Parking[] = parkingData as Parking[];

export const getAll = (): Parking[] => parkings;

export const getOne = (id: number): Parking | undefined =>
  parkings.find((p) => p.id === id);

export const post = (parking: NewParkingEntry): Parking => {
  const newParking = {
    ...parking,
    id: Math.max(...parkings.map((d) => d.id)) + 1,
  };
  parkings.push(newParking);
  return newParking;
};

export const deleteParking = (id: number): Parking[] => {
  const parking = parkings.find((p) => p.id === id);
  parking?.images.map((i) => {
    fs.unlink(`public/images/${i.path}`, (err) => {
      if (err) {
        console.log("ERROR");
      }
    });
  });
  parkings = parkings.filter((p) => p.id !== id);
  return parkings;
};
