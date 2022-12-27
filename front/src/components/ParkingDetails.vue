<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  DirectionsCarTwotone,
  BatteryChargingFullSharp,
  MovingFilled,
} from "@vicons/material";
import {
  Video16Filled,
  Umbrella24Filled,
  Building20Filled,
} from "@vicons/fluent";
import { useParkingStore } from "../stores/parking";

const parkingStore = useParkingStore();
const route = useRoute();
const router = useRouter();
const { id } = route.params;
onBeforeMount(() => {
  parkingStore.getOne(Number(id));
});

const handleBack = () => {
  router.push("/");
};
const handleDeleteParking = async () => {
  await parkingStore.deleteParking(Number(id));
  router.push("/");
};
</script>

<template>
  <div>
    <n-card style="margin: 10px 0px" title="Parking Detail">
      <n-grid
        :x-gap="6"
        :y-gap="9"
        :cols="3"
        item-responsive
        responsive="screen"
      >
        <n-gi span="3">
          <n-space justify="space-between">
            <n-button type="secondary" @click.prevent="handleBack">
              Back
            </n-button>
            <n-button type="error" @click.prevent="handleDeleteParking">
              Delete
            </n-button>
          </n-space>
        </n-gi>
        <n-gi span="3 m:1 l:1">
          <n-carousel style="border-radius: 20px" autoplay>
            <img
              v-for="(img, index) in parkingStore.parking.images"
              :key="index"
              class="carousel-img"
              :src="`http://localhost:3000/images/${img.path}`"
            />
          </n-carousel>
        </n-gi>
        <n-gi span="3 m:2 l:2">
          <h4>{{ parkingStore.parking.address }}</h4>
          <div class="prices">
            <p>
              Price/month:
              <strong>${{ parkingStore.parking.price_month }}</strong>
            </p>
            <p>
              Price Total:
              <strong>${{ parkingStore.parking.price_total }}</strong>
            </p>
          </div>
          <p>
            {{ parkingStore.parking.description }}
          </p>
        </n-gi>
        <n-gi span="3">
          <n-space justify="space-between">
            <template
              v-for="(amenity, index) in parkingStore.parking.amenities"
              :key="index"
            >
              <div
                class="amenity-info"
                v-if="amenity === 'Camaras de vigilancia'"
              >
                <n-icon class="amenity" size="35" color="#fff">
                  <Video16Filled />
                </n-icon>
                <p>Camaras de vigilancia</p>
              </div>
              <div class="amenity-info" v-if="amenity === 'Cajon techado'">
                <n-icon class="amenity" size="35" color="#fff">
                  <Umbrella24Filled />
                </n-icon>
                <p>Cajon techado</p>
              </div>
              <div class="amenity-info" v-if="amenity === 'Departamento'">
                <n-icon class="amenity" size="35" color="#fff">
                  <Building20Filled />
                </n-icon>
                <p>Departamento</p>
              </div>
              <div class="amenity-info" v-if="amenity === 'Planta baja'">
                <n-icon class="amenity" size="35" color="#fff">
                  <MovingFilled />
                </n-icon>
                <p>Planta baja</p>
              </div>
              <div
                class="amenity-info"
                v-if="amenity === 'Estacionamiento cerrado'"
              >
                <n-icon class="amenity" size="35" color="#fff">
                  <DirectionsCarTwotone />
                </n-icon>
                <p>Estacionamiento cerrado</p>
              </div>
              <div class="amenity-info" v-if="amenity === 'Lugar en bateria'">
                <n-icon class="amenity" size="35" color="#fff">
                  <BatteryChargingFullSharp />
                </n-icon>
                <p>Lugar en bateria</p>
              </div>
            </template>
          </n-space>
        </n-gi>
      </n-grid>
    </n-card>
  </div>
</template>
<style scoped>
.prices {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.amenity-info {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
