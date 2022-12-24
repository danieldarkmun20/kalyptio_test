<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useParkingStore } from "../stores/parking";
import { StarTwotone } from "@vicons/antd";
import {
  DirectionsCarTwotone,
  BatteryChargingFullSharp,
  ArrowForwardRound,
} from "@vicons/material";
import {
  Video16Filled,
  Umbrella24Filled,
  Building20Filled,
  Filter16Filled,
} from "@vicons/fluent";
const options = [
  {
    label: "Everybody's Got Something to Hide Except Me and My Monkey",
    value: "song0",
    disabled: true,
  },
  {
    label: "Drive My Car",
    value: "song1",
  },
];

const parkingStore = useParkingStore();

onBeforeMount(() => {
  parkingStore.getAll();
});

const isShowFilter = ref<boolean>(true);
const showFilter = () => {
  isShowFilter.value = !isShowFilter.value;
};
</script>

<template>
  <main>
    <n-card style="margin: 10px 0px" title="Parking">
      <n-space justify="end">
        <n-button @click.prevent="showFilter" type="secondary"
          ><n-icon size="30" color="#214881"> <Filter16Filled /> </n-icon
        ></n-button>
        <n-button type="primary">+</n-button>
      </n-space>
      <n-grid v-if="isShowFilter" :x-gap="6" :y-gap="6" :cols="2">
        <n-gi :span="2"><p>Filters</p></n-gi>
        <n-gi>
          <n-form-item label="Max Price" path="user.name">
            <n-input-number clearable />
          </n-form-item>
        </n-gi>
        <n-gi>
          <n-form-item label="Min Price" path="user.name">
            <n-input-number clearable />
          </n-form-item>
        </n-gi>
        <n-gi :span="2">
          <n-form-item label="Select Type" path="user.name">
            <n-select :options="options" />
          </n-form-item>
        </n-gi>
        <n-gi>
          <n-radio value="Camaras de vigilancia" name="basic-demo">
            Camaras de vigilancia
          </n-radio>
        </n-gi>
        <n-gi>
          <n-radio value="Cajon techado" name="basic-demo">
            Cajon techado
          </n-radio>
        </n-gi>
        <n-gi>
          <n-radio value="Departamento" name="basic-demo">
            Departamento
          </n-radio>
        </n-gi>
        <n-gi>
          <n-radio value="Planta baja" name="basic-demo"> Planta baja </n-radio>
        </n-gi>
        <n-gi>
          <n-radio value="Estacionamiento cerrado" name="basic-demo">
            Estacionamiento cerrado
          </n-radio>
        </n-gi>
        <n-gi>
          <n-radio value="Lugar en bateria" name="basic-demo">
            Lugar en bateria
          </n-radio>
        </n-gi>
      </n-grid>
    </n-card>
    <n-card
      v-for="parking in parkingStore.parkings"
      :id="parking.id"
      :content-style="{
        padding: '7px 15px',
        marginBottom: '10px'
      }"
      class="light-green"
    >
      <n-grid :x-gap="6" :cols="3">
        <n-gi>
          <n-carousel autoplay style="border-radius: 20px">
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
            />
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
            />
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
            />
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
            />
          </n-carousel>
        </n-gi>
        <n-gi :span="2">
          <n-space style="gap: 0px" justify="space-between" align="center">
            <h3>{{parking.address}}</h3>
            <div class="score">
              <n-icon size="40" color="#214881">
                <StarTwotone />
              </n-icon>
              <p>{{parking.score}}</p>
            </div>
          </n-space>
          <n-divider style="margin: 5px 0px 10px 0px" />
          <n-space justify="space-between">
            <n-icon size="30" color="#214881">
              <Video16Filled />
            </n-icon>
            <n-icon size="30" color="#214881">
              <Umbrella24Filled />
            </n-icon>
            <n-icon size="30" color="#214881">
              <Building20Filled />
            </n-icon>
            <n-icon size="30" color="#214881">
              <DirectionsCarTwotone />
            </n-icon>
            <n-icon size="30" color="#214881">
              <BatteryChargingFullSharp />
            </n-icon>
          </n-space>
          <div class="total">
            <p><sup>$</sup> 200/Mes</p>
            {{ " " }}
            <n-icon size="20" color="#214881"> <ArrowForwardRound /> </n-icon
            >{{ " " }}
            <span><sup>$</sup> 1,752 Total</span>
          </div>
        </n-gi>
      </n-grid>
    </n-card>
  </main>
</template>

<style scoped>
.light-green {
  border-radius: 20px;
  margin-bottom: 20px;
  box-shadow: 6px 9px 14px 0px rgba(0, 0, 0, 0.28);
  -webkit-box-shadow: 6px 9px 14px 0px rgba(0, 0, 0, 0.28);
  -moz-box-shadow: 6px 9px 14px 0px rgba(0, 0, 0, 0.28);
}
.green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.24);
}
.carousel-img {
  width: 100%;
  height: 120px;
  object-fit: cover;
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
</style>
