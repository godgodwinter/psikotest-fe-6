<script setup>
import { ref } from "vue";
import RadialProgressBar from "vue3-radial-progress";

const completedSteps = ref(0);
const totalSteps = ref(10);
const prosesBerhasil = ref(0);
const prosesGagal = ref(0);

// proses
const doGenerate = () => {};

const doGenerateAll = () => {};
</script>
<template>
  <div class="w-full flex flex-wrap justify-center">
    <div class="w-1/2 flex justify-center gap-10">
      <div>
        <radial-progress-bar
          :diameter="200"
          :completed-steps="completedSteps"
          :total-steps="totalSteps"
        >
          <h2 class="font-bold text-2xl">
            {{ completedSteps }} / {{ totalSteps }}
          </h2>
          <!-- Your inner content here -->
        </radial-progress-bar>
      </div>
      <div>
        <div class="py-4 font-bold">
          <h1>Proses Stats :</h1>
          <h4># Total Steps : {{ totalSteps }}</h4>
          <h4># Completed Steps :{{ completedSteps }}</h4>
          <h4># Proses Berhasil : {{ prosesBerhasil }}</h4>
          <h4># Proses Gagal :{{ prosesBerhasil }}</h4>
        </div>
      </div>
    </div>
    <div class="w-1/2 flex justify-center">
      <div>
        <div class="py-4 font-bold">
          <h1>Statistik Akun Siswa:</h1>
          <h4># Akun Belum di Generate :</h4>
          <h4># Akun Sudah di Generate :</h4>
        </div>
      </div>
    </div>
  </div>

  <div class="space-x-2 py-2">
    <button class="btn btn-warning" @click="doGenerate()">
      Generate Akun Baru
    </button>
    <button class="btn btn-danger" @click="doGenerateAll()">
      Generate Semua Akun
    </button>
    <button class="btn btn-primary" @click="completedSteps++">+1</button>
  </div>
</template>
