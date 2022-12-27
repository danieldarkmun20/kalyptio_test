import fs from "fs";
import { Parking, NewParkingEntry, Filter } from "../../types";
import parkingData from "./parkings.json";

let parkings: Parking[] = parkingData as Parking[];
let parkingsFilter: Parking[] = parkingData as Parking[];

export const getAll = (filter: Filter): Parking[] => {
  console.log(filter);
  if (filter.max_price !== undefined) {
    parkingsFilter = parkings.filter(
      (parking) => Number(parking.price_total) <= Number(filter.max_price)
    );
  }
  if (filter.min_price !== undefined) {
    parkingsFilter = parkings.filter(
      (parking) => Number(parking.price_total) >= Number(filter.min_price)
    );
  }
  if (filter.type !== undefined) {
    parkingsFilter = parkings.filter((parking) => parking.type == filter.type);
  }
  if (filter.amenities !== undefined) {
    parkingsFilter = parkings.map((parking) => {
      let p = {} as Parking
      parking.amenities.forEach((a, index) => {
        if (
          a === filter.amenities[index] &&
          filter.amenities[index] !== undefined
        ) {
          p = parking;
        }
      });
      return p;
    });
    parkingsFilter = parkingsFilter.filter(pF => Object.keys(pF).length > 0)
  }
  if (
    filter.max_price === undefined ||
    filter.min_price === undefined ||
    filter.type === undefined
  ) {
    parkingsFilter = parkings;
  }
  return parkingsFilter;
};

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
