import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import type { NewParkingEntry, Parking, Type } from "type";

const url = "http://localhost:3000";
const module = "parkings";

export const useParkingStore = defineStore("parking", () => {
  const parkings = ref<Parking[]>([]);
  const parking = ref<NewParkingEntry>({
    address: "",
    amenities: [],
    score: "",
    type: "" as Type,
    images: [],
    description: "",
    price_total: "",
    price_month: "",
  });

  const getAll = async () => {
    const resp = await axios.get(`${url}/api/${module}`);
    const data = resp.data;
    parkings.value = data;
  };

  const getOne = async (id: number) => {
    const resp = await axios.get(`${url}/api/${module}/${id}`);
    const data = resp.data;
    parking.value = data;
  };

  const post = async (filePath: HTMLInputElement | null) => {
    const fd = new FormData();
    if (filePath !== null) {
      fd.append("address", parking.value.address);
      fd.append("score", parking.value.score);
      fd.append("type", parking.value.type);
      fd.append("description", parking.value.description);
      fd.append("price_total", parking.value.price_total);
      fd.append("price_month", parking.value.price_month);
      parking.value.amenities.forEach((amenity, index) => {
        fd.append(
          `amenities[${index}]`,
          amenity as string
        );
      });
      console.log(filePath?.files);
      if (filePath?.files !== null) {
        for (let i = 0; i < filePath?.files?.length; ++i) {
          const file = filePath.files[i];
          fd.append(`images`, file);
        }
      }
      const resp = await axios.post(`${url}/api/${module}`, fd, {
        headers: {
          "Content-Type": `multipart/form-data`,
          Accept: `application/json`,
        },
      });
      const data = await resp.data;
      console.log(data);
    }
  };
  const deleteParking = async (id: number) => {
    const resp = await axios.delete(`${url}/api/${module}/${id}`);
    const data = await resp.data;
    console.log(data);
  };

  const clearAllData = () => {
    parking.value.address = "";
    parking.value.amenities = [];
    parking.value.score = "";
    parking.value.type = "" as Type;
    parking.value.images = [];
    parking.value.description = "";
    parking.value.price_total = "";
    parking.value.price_month = "";
  };

  return { parkings, parking, getAll, getOne, post, clearAllData, deleteParking};
});
