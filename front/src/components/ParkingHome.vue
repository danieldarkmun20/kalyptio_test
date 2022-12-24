<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useParkingStore } from "../stores/parking";
import HeaderComponent from "./HeaderComponent.vue";
import Parking from "./ParkingComponent.vue";

import type { FormInst } from "naive-ui";
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

const parkingStore = useParkingStore();

onBeforeMount(() => {
  parkingStore.getAll();
});

const showModal = ref<boolean>(false);
const formRef = ref<FormInst | null>(null);
const file_path = ref<HTMLInputElement | null>(null);
const rules = ref({
  address: {
    required: true,
    message: "Please input the Address",
    trigger: ["input"],
  },
  score: {
    required: true,
    message: "Please input the score",
    trigger: ["input"],
  },
  description: {
    required: true,
    message: "Please input the description",
    trigger: ["input"],
  },
  type: {
    required: true,
    message: "Please input the description",
    trigger: ["input"],
  },
  amenities: {
    type: "array",
    required: true,
    trigger: "change",
    message: "Please select amenities",
  },
});

const openModal = () => {
  showModal.value = true;
  parkingStore.clearAllData();
};
const closeModal = () => {
  showModal.value = false;
};

function handleValidateClick(e: MouseEvent) {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      console.log("validate");
      await parkingStore.post(file_path.value);
      showModal.value = false;
    } else {
      console.log(errors);
    }
  });
}
</script>

<template>
  <main>
    <HeaderComponent>
      <n-button type="primary" @click.prevent="openModal">+</n-button>
    </HeaderComponent>
    <Parking v-for="p in parkingStore.parkings" :parking="p" :key="p.id" />
  </main>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      title="Parking Formulary"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        <n-button type="error" @click.prevent="closeModal">-</n-button>
      </template>
      <n-form
        ref="formRef"
        inline
        :label-width="80"
        :model="parkingStore.parking"
        :rules="rules"
      >
        <n-grid :x-gap="12" :cols="2">
          <n-gi :span="2">
            <n-form-item label="Address" path="address">
              <n-input
                v-model:value="parkingStore.parking.address"
                placeholder="Input Address"
              />
            </n-form-item>
          </n-gi>
          <n-gi :span="2"
            ><n-form-item label="Description" path="description">
              <n-input
                type="textarea"
                v-model:value="parkingStore.parking.description"
                placeholder="Input Description"
              /> </n-form-item
          ></n-gi>
          <n-gi>
            <n-form-item label="Score" path="score">
              <n-input
                v-model:value="parkingStore.parking.score"
                placeholder="Input Score"
              />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label="Price by Month" path="price_month">
              <n-input
                v-model:value="parkingStore.parking.price_month"
                placeholder="Input Price by Month"
              />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label="Price Total" path="price_total">
              <n-input
                v-model:value="parkingStore.parking.price_total"
                placeholder="Input Price Total"
              />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label="Type" path="type">
              <n-select
                v-model:value="parkingStore.parking.type"
                size="medium"
                :options="optionsType"
                clearable
              />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label="Amenities" path="amenities">
              <n-checkbox-group v-model:value="parkingStore.parking.amenities">
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
                  <n-checkbox
                    value="Lugar en bateria"
                    label="Lugar en bateria"
                  />
                </n-space>
              </n-checkbox-group>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label="Images">
              <input
                ref="file_path"
                multiple
                type="file"
                name="images"
                id="images"
                accept="image/png, image/gif, image/jpeg"
              />
            </n-form-item>
          </n-gi>
        </n-grid>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button type="primary" @click.prevent="handleValidateClick"
            >Save</n-button
          >
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<style scoped></style>
