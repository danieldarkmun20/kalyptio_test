<script setup lang="ts">
import { ref } from "vue";
import { Filter16Filled } from "@vicons/fluent";
import { useParkingStore } from "../stores/parking";
const parkingStore = useParkingStore();

const isShowFilter = ref<boolean>(false);
const showFilter = () => {
  isShowFilter.value = !isShowFilter.value;
};
const optionsType = [
  {
    label: "Private",
    value: "private",
  },
  {
    label: "Public",
    value: "public",
  },
];
const handleFilter = () => {
  parkingStore.getAll()
}
</script>

<template>
  <div>
    <n-card style="margin: 10px 0px" title="Parking">
      <n-space justify="space-between">
        <n-button @click.prevent="showFilter" type="secondary"
          ><n-icon size="30" color="#214881"> <Filter16Filled /> </n-icon
        ></n-button>
        <slot></slot>
      </n-space>
      <n-grid v-if="isShowFilter" :x-gap="6" :y-gap="6" :cols="2">
        <n-gi :span="2"><p>Filters</p></n-gi>
        <n-gi>
          <n-form-item label="Max Price" path="user.name">
            <n-input-number clearable v-model:value="parkingStore.filter.max_price" />
          </n-form-item>
        </n-gi>
        <n-gi>
          <n-form-item label="Min Price" path="user.name">
            <n-input-number clearable v-model:value="parkingStore.filter.min_price" />
          </n-form-item>
        </n-gi>
        <n-gi :span="2">
          <n-form-item label="Select Type" path="user.name">
            <n-select :options="optionsType" v-model:value="parkingStore.filter.type" />
          </n-form-item>
        </n-gi>
        <n-gi>
          <n-checkbox-group v-model:value="parkingStore.filter.amenities">
            <n-space item-style="display: flex;">
              <n-checkbox
                value="Camaras de vigilancia"
                label="Camaras de vigilancia"
              />
              <n-checkbox value="Cajon techado" label="Cajon techado" />
              <n-checkbox value="Departamento" label="Departamento" />
              <n-checkbox value="Planta baja" label="Planta baja" />
              <n-checkbox
                value="Estacionamiento cerrado"
                label="Estacionamiento cerrado"
              />
              <n-checkbox value="Lugar en bateria" label="Lugar en bateria" />
            </n-space>
          </n-checkbox-group>
        </n-gi>
        <n-gi>
          <n-button type="info" @click.prevent="handleFilter">Filter</n-button>
        </n-gi>
      </n-grid>
    </n-card>
  </div>
</template>
