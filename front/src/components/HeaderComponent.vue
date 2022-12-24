<script setup lang="ts">
import { ref } from "vue";
import {
  Filter16Filled,
} from "@vicons/fluent";

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
            <n-select :options="optionsType" />
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
  </div>
</template>
