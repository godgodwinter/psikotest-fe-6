<script setup>
import { ref, watch, computed } from "vue";
import { useStoreAdminBar } from "@/stores/adminBar";
const storeAdminBar = useStoreAdminBar();
storeAdminBar.setsubMenuActive("dashboard");
import Api from "@/axios/axios";
import Toast from "@/components/lib/Toast";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const id = route.params.id;
const dataSekolah = ref([]);

const getDataDetail = async () => {
  try {
    const response = await Api.get(`owner/sekolah/${id}`);
    dataSekolah.value = response.data;
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
getDataDetail();
</script>
<template>
  <!-- <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm"
        >Dashboard Sekolah</span
      >
    </div>
    <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
  </div> -->

  <div class="md:py-4 px-4 lg:flex flex-wrap gap-4">
    <div class="w-full lg:w-full">
      <div class="bg-base-100 shadow rounded-lg px-4 py-4">
        <div class="overflow-x-auto">
          <table class="table table-compact">
            <tbody>
              <tr>
                <td class="whitespace-nowrap w-1/12">Nama Sekolah</td>
                <td class="whitespace-nowrap w-1/12">:</td>
                <td class="whitespace-nowrap w-10/12">
                  {{ dataSekolah.nama }}
                </td>
              </tr>
              <tr>
                <td class="whitespace-nowrap w-1/12">Alamat</td>
                <td class="whitespace-nowrap w-1/12">:</td>
                <td class="whitespace-nowrap w-10/12">
                  {{ dataSekolah.alamat }}
                </td>
              </tr>
              <tr>
                <td class="whitespace-nowrap w-1/12">Nama Kepala Sekolah</td>
                <td class="whitespace-nowrap w-1/12">:</td>
                <td class="whitespace-nowrap w-10/12">
                  {{ dataSekolah.kepsek_nama }}
                </td>
              </tr>
              <tr>
                <td class="whitespace-nowrap w-1/12">Wilayah</td>
                <td class="whitespace-nowrap w-1/12">:</td>
                <td class="whitespace-nowrap w-10/12">
                  {{ dataSekolah.provinsi }} - {{ dataSekolah.kabupaten }} -
                  {{ dataSekolah.kecamatan }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div class="px-4 py-10">
    <h3 class="font-bold"></h3>
  </div>
  <div class="w-full flex justify-center flex-wrap" v-if="dataSekolah.photo">
    <div
      class="xl:flex felx-wrap gap-10 xl:w-full px-4 justify-center space-y-4 w-full"
    >
      <div class="card xl:w-2/5 bg-base-100 shadow-xl">
        <div class="w-full flex justify-center">
          <label
            class="avatar hover:scale-110 transition-all duration-500"
            for="my-modal-1"
          >
            <div class="w-52 mask mask-squircle">
              <img
                v-if="dataSekolah.photo.logosekolah"
                :src="dataSekolah.photo.logosekolah"
              />
              <img v-else src="@/assets/img/logo/github-copilot.svg" />
            </div>
          </label>
        </div>

        <!-- modal -->
        <input type="checkbox" id="my-modal-1" class="modal-toggle" />
        <label for="my-modal-1" class="modal cursor-pointer">
          <label class="modal-box relative" for="">
            <img
              v-if="dataSekolah.photo.logosekolah"
              :src="dataSekolah.photo.logosekolah"
            />
            <img v-else src="@/assets/img/logo/github-copilot.svg" />
          </label>
        </label>

        <!-- modal -->

        <div class="card-body items-center text-center">
          <h2 class="card-title">{{ dataSekolah.nama }}</h2>
          <p>LOGO SEKOLAH</p>
          <div class="card-actions">
            <!-- <button class="btn btn-primary">Update Logo Sekolah</button> -->
          </div>
        </div>
      </div>

      <div class="card xl:w-2/5 bg-base-100 shadow-xl">
        <div class="w-full flex justify-center">
          <label
            class="avatar hover:scale-110 transition-all duration-500"
            for="my-modal-2"
          >
            <div class="w-52 mask mask-squircle">
              <img
                v-if="dataSekolah.photo.kepalasekolah"
                :src="dataSekolah.photo.kepalasekolah"
              />
              <img v-else src="@/assets/img/avatar/user.png" />
            </div>
          </label>

          <!-- modal -->
          <input type="checkbox" id="my-modal-2" class="modal-toggle" />
          <label for="my-modal-2" class="modal cursor-pointer">
            <label class="modal-box relative" for="">
              <img
                v-if="dataSekolah.photo.kepalasekolah"
                :src="dataSekolah.photo.kepalasekolah"
              />
              <img v-else src="@/assets/img/avatar/user.png" />
            </label>
          </label>

          <!-- modal -->
        </div>
        <div class="card-body items-center text-center">
          <h2 class="card-title">{{ dataSekolah.kepsek_nama }}</h2>
          <p>KEPALA SEKOLAH</p>
          <div class="card-actions">
            <!-- <button class="btn btn-primary">Update Photo Kepala Sekolah</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
