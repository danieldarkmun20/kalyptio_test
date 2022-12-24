<script setup lang="ts">
import {
  DirectionsCarTwotone,
  BatteryChargingFullSharp,
  ArrowForwardRound,
  MovingFilled,
} from "@vicons/material";
import {
  Video16Filled,
  Umbrella24Filled,
  Building20Filled,
} from "@vicons/fluent";
import { StarTwotone } from "@vicons/antd";

const props = defineProps({
  parking: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <n-card
    :content-style="{
      padding: '7px 15px',
      marginBottom: '10px',
    }"
    class="parking"
  >
    <n-grid :x-gap="6" :cols="3">
      <n-gi>
        <n-carousel autoplay style="border-radius: 20px">
          <img v-for="(img, index) in props.parking.images" :key="index" />
          class="carousel-img" :src="`http://localhost:3000/images/${img.path}`"
          />
        </n-carousel>
      </n-gi>
      <n-gi :span="2">
        <div class="parking-info">
          <n-ellipsis style="max-width: 100px"
            ><strong>{{ props.parking.address }}</strong></n-ellipsis
          >
          <div class="score">
            <n-icon size="40" color="#214881">
              <StarTwotone />
            </n-icon>
            <p>{{ props.parking.score }}</p>
          </div>
        </div>
        <n-divider style="margin: 5px 0px 10px 0px" />
        <n-space style="gap: 0px" justify="space-between">
          <template
            v-for="(amenity, index) in props.parking.amenities"
            :key="index"
          >
            <div
              v-if="amenity.description === 'Camaras de vigilancia'"
              class="amenity"
            >
              <n-icon size="20" color="#fff">
                <Video16Filled />
              </n-icon>
              <p>Camaras de vigilancia</p>
            </div>
            <div v-if="amenity.description === 'Cajon techado'" class="amenity">
              <n-icon size="20" color="#fff">
                <Umbrella24Filled />
              </n-icon>
              <p>Cajon techado</p>
            </div>
            <div v-if="amenity.description === 'Departamento'" class="amenity">
              <n-icon size="20" color="#fff">
                <Building20Filled />
              </n-icon>
              <p>Departamento</p>
            </div>
            <div v-if="amenity.description === 'Planta baja'" class="amenity">
              <n-icon size="20" color="#fff">
                <MovingFilled />
              </n-icon>
              <p>Planta baja</p>
            </div>
            <div
              v-if="amenity.description === 'Estacionamiento cerrado'"
              class="amenity"
            >
              <n-icon size="20" color="#fff">
                <DirectionsCarTwotone />
              </n-icon>
              <p>Estacionamiento cerrado</p>
            </div>
            <div
              v-if="amenity.description === 'Lugar en bateria'"
              class="amenity"
            >
              <n-icon size="20" color="#fff">
                <BatteryChargingFullSharp />
              </n-icon>
              <p>Lugar en bateria</p>
            </div>
          </template>
        </n-space>
        <div class="total">
          <p><sup>$</sup> {{ props.parking.price_month }}/Mes</p>
          {{ " " }}
          <n-icon size="20"> <ArrowForwardRound /> </n-icon>{{ " " }}
          <span><sup>$</sup>{{ props.parking.price_total }} Total</span>
        </div>
      </n-gi>
    </n-grid>
  </n-card>
</template>

<style scoped>
.carousel-img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}
.parking {
  border-radius: 20px;
  margin-bottom: 20px;
  box-shadow: 6px 9px 14px 0px rgba(0, 0, 0, 0.28);
  -webkit-box-shadow: 6px 9px 14px 0px rgba(0, 0, 0, 0.28);
  -moz-box-shadow: 6px 9px 14px 0px rgba(0, 0, 0, 0.28);
}
.parking:hover {
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.4);
  transform: translateY(-3%);
  transition: all 400ms ease-out;
  cursor: default;
}

.parking-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.parking-info > h3 {
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100px;
  overflow: hidden;
}
.score {
  display: flex;
  align-items: center;
}
.score > p {
  margin: 0;
  font-weight: 900;
}
.total {
  display: flex;
  align-items: center;
  color: #012838;
  font-weight: 700;
  gap: 3px;
}
.total > p {
  margin: 0px;
}
.total > span {
  color: #2e4874;
}
.amenity {
  background-color: #012838;
  border-radius: 50%;
  padding: 5px;
  display: flex;
}
.amenity > p {
  display: none;
}
</style>
