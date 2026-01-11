<script setup lang="ts">
import { SpecimenObservationImpl } from '@/api/SPObservation/SpecimenObservationImpl';
import { SpecimenObservation } from '@/types/SpecimenObservationType';
import { ref } from 'vue';
import { onMounted } from 'vue';
import useDialog from '@/composables/useDialog';
import { DialogType } from '@/const/DialogType';
const SpecimenObservationImplInstance = new SpecimenObservationImpl();
onMounted(async () => {
  observations.value = await SpecimenObservationImplInstance.getAll();
});
const observations = ref<SpecimenObservation[]>([]);
const { closeDialogByEsc, closeOnBackdrop } = useDialog(DialogType.FORM);
const uuid = ref('');
const selectedSpecimenInfoid = ref<string | null>(null);
const selectedgeospatialDataId = ref<string | null>(null);
const observedAt = ref('');
const comments = ref('');

function saveNewSpecimenObservation() {
  if (!uuid.value) {
    alert('Debes indicar un UUID');
    return;
  }
  if (!selectedSpecimenInfoid.value) {
    alert('Debes seleccionar un Specimen Info');
    return;
  }
  if (!selectedgeospatialDataId.value) {
    alert('Debes seleccionar un Geospatial Data');
    return;
  }
  if (!observedAt.value) {
    alert('Debes indicar la fecha de observación');
    return;
  }
  SpecimenObservationImplInstance.create({
    uuid: uuid.value,
    specimenInfo: onSpecimenInfoChange()!,
    observedAt: observedAt.value,
    geospatialData: onGeospatialDataChange()!,
    comments: comments.value,
  }).then(() => {
    closeOnBackdrop(void 0);
  });
  function onSpecimenInfoChange() {
    const specimenInfoId = selectedSpecimenInfoid.value;
    if (observations.value) {
      for (const observation of observations.value) {
        if (observation.specimenInfo.id === Number(specimenInfoId)) {
          return observation.specimenInfo;
        }
      }
    }
    return null;
  }
  function onGeospatialDataChange() {
    const geospatialDataId = selectedgeospatialDataId.value;
    if (observations.value) {
      for (const observation of observations.value) {
        if (observation.geospatialData.id === Number(geospatialDataId)) {
          return observation.geospatialData;
        }
      }
    }
    return null;
  }
}
</script>
<template>
  <transition name="bounce">
    <div
      v-if="true"
      id="dialog-overlay-form"
      class="fixed inset-0 bg-black/40 flex items-center justify-center"
      @click="closeOnBackdrop"
      @keydown="closeDialogByEsc"
      tabindex="0"
    >
      <dialog
        role="dialog"
        aria-modal="true"
        class="static w-[40%] h-[60%] backdrop-blur-sm flex justify-center rounded-lg shadow-lg p-4"
      >
        <div class="w-full h-full flex flex-col justify-between">
          <h2 class="text-2xl font-bold mb-4">Registrar nueva observación</h2>
          <div class="flex-1 overflow-y-auto">
            <form @submit.prevent="saveNewSpecimenObservation" class="flex flex-col gap-4">
              <label for="uuidInput">Uuid:</label>

              <input
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 cursor-pointer"
                v-model="uuid"
                required="true"
                name="uuidInput"
              />
              <label for="specimenInfoInput" class="block">Specimen info:</label>

              <select
                name="specimenInfoInput"
                v-model="selectedSpecimenInfoid"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 cursor-pointer"
              >
                <option :value="null">Seleccione una opción</option>
                <option
                  v-for="observation in observations"
                  :key="observation.specimenInfo.id"
                  :value="observation.specimenInfo.id"
                >
                  {{ observation.specimenInfo.scientificName }}
                  - {{ observation.specimenInfo.genus }} -
                  {{ observation.specimenInfo.family }}
                </option>
              </select>
              <label for="observedAtInput">Observed at:</label>
              <input
                type="date"
                v-model="observedAt"
                required="true"
                name="observedAtInput"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 cursor-pointer"
              />
              <label for="commentsInput">Comments:</label>
              <textarea
                v-model="comments"
                name="commentsInput"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 cursor-pointer"
              />
              <label for="geospatialDataInput">Geospatial Data:</label>
              <select
                name="geospatialDataInput"
                v-model="selectedgeospatialDataId"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 cursor-pointer"
              >
                <option :value="null">Seleccione una opción</option>
                <option
                  v-for="observation in observations"
                  :key="observation.geospatialData.id"
                  :value="observation.geospatialData.id"
                >
                  {{ observation.geospatialData.locality }}
                  -
                  {{ observation.geospatialData.province }}
                  -
                  {{ observation.geospatialData.observationSite }}
                </option>
              </select>
              <button type="submit">Registrar observación</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  </transition>
</template>
<style scoped>
@import '@/assets/bounceAnimation.css';
</style>
