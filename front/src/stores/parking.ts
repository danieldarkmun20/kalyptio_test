import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import type { Parking } from "type";

export const useParkingStore = defineStore("parking", () => {
  const parkings = ref<Parking[]>([]);

  const getAll = async () => {
    const resp = await axios.get("http://localhost:3000/api/parkings");
    const data = resp.data
    console.log(data)
    parkings.value = data
  };

  return { parkings, getAll };
});
