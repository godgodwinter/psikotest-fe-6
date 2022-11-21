<script setup>
const BASE_URL = import.meta.env.VITE_API_URL;
const VITE_API_URLFE_ADMIN = import.meta.env.VITE_API_URLFE_ADMIN;
const VITE_API_URLFE_SEKOLAH = import.meta.env.VITE_API_URLFE_SEKOLAH;
const VITE_API_URLFE_SISWA = import.meta.env.VITE_API_URLFE_SISWA;
const VITE_API_URLFE_YAYASAN = import.meta.env.VITE_API_URLFE_YAYASAN;
const VITE_API_URLFE_ORTU = import.meta.env.VITE_API_URLFE_ORTU;
const VITE_API_URLFE_OWNER = import.meta.env.VITE_API_URLFE_OWNER;
const VITE_API_URLFE = import.meta.env.VITE_API_URLFE;
import { ref } from "vue";
import { computed } from "vue";
import { useCounterStore } from "@/stores/counter";
import Toast from "@/components/lib/Toast";
import Api from "@/axios/axios";
import Footer from "@/components/template/Footer.vue";

const storeCounter = useCounterStore();
const counter = computed(() => storeCounter.count);
let isSidebarActive = ref(false);
function sidebarToggle() {
  isSidebarActive.value = !isSidebarActive.value;
  // console.log(isSidebarActive.value);
}
function scrollBehavior(to) {
  if (to.hash) {
    const element = document.getElementById(to.hash.slice(1));
    if (element) {
      return window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  }
  return window.scrollTo({ top: 0, behavior: "smooth" });
}
const doIncrement = () => {
  storeCounter.$patch((state) => {
    state.count++;
  });
};
// reset otomatis ke nilai awal state
const doReset = () => {
  storeCounter.$reset();
};

// subscribe mirip watcher divue
storeCounter.$subscribe((mutation, state) => {
  console.log(mutation, state);
});

// getter
const getCount = computed(() => storeCounter.doubleCount);
// send param example
const divideByTwo = computed(() => storeCounter.divideBy(2));

// action
const actIncrement = () => {
  storeCounter.increment();
};
const actIncrementBy = (num) => {
  storeCounter.incrementBy(num);
};

// const arr = ref([
//   "Kegembiraan yang Anda miliki gunakan secara wajar dan realita",
//   "Nikmatilah hidup itu dengan gembira seperti menyongsong terbitnya Matahari dengan penuh harapan",
//   "Menanti datangnya kegembiraan hal yang sangat diharapkan setiap orang maka nikmatilah kegembiraan dengan hati riang, lembut",
// ]);

const arr = ref([
  "Kegembiraan yang Anda miliki gunakan secara wajar dan realita",
  "Nikmatilah hidup itu dengan gembira seperti menyongsong terbitnya Matahari dengan penuh harapan",
  "Menanti datangnya kegembiraan hal yang sangat diharapkan setiap orang maka nikmatilah kegembiraan dengan hati riang, lembut",
]);
const data = ref([]);
const getData = async () => {
  try {
    const response = await Api.get(`guest/katabijak`);
    // console.log(response);
    data.value = response.data;
    data.value.map((item, index) => {
      arr.value.push(item.penjelasan);
    });

    return response.data;
  } catch (error) {
    // Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};
getData();
</script>
<template>
  <!-- aside sidebar -->
  <div v-if="isSidebarActive" id="aside"
    class="z-10 top-0 block z-998 font-serif h-full fixed flex-row bg-base-200 text-base-content w-4/5 md:hidden shadow-xl border-r-2 border-base-100">
    <div class="px-2 ml-5 pt-0 pb-5 overflow-y-auto h-full">
      <router-link :to="{ name: 'LandingIndex' }">
        <h1 class="text-xs text-base-content font-bold py-2 pt-6">Home</h1>
      </router-link>

      <router-link :to="{ name: 'LandingLogin' }">
        <h1 class="text-xs text-base-content font-bold py-2 pt-6">Login</h1>
      </router-link>

      <!-- <h1 class="text-xs text-gray-400 font-bold py-2">Installation</h1> -->
    </div>
  </div>
  <!-- aside sidebar -->

  <!-- scrolltotop -->

  <div class="fixed bottom-4 right-4 xl:right-20 z-999">
    <a class="transform duration-500 ease-in-out animate-bounce bg-gradient-to-br from-sky-500 to-vue-500 px-1 py-1 md:px-4 md:py-3 font-mono font-semibold rounded-lg shadow hover:shadow-xl flex justify-between items-center gap-4"
      @click="scrollBehavior('top')">
      <svg xmlns="http://www.w3.org/2000/svg" class="text-white h-6 w-6" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
      </svg>
    </a>
  </div>
  <!-- scrolltotop -->

  <!-- <LandingHeader class="sticky z-10" /> -->
  <div class="static" v-if="!isSidebarActive">
    <div
      class="fixed z-50 w-full font-serif font-semibold text-sm bg-base-content text-base-100 flex justify-center py-2 px-4 text-center">
      <VueWriter v-if="arr.length > 0" :array="arr" :eraseSpeed="50" :typeSpeed="40" :delay="2000" :intervals="500" />
    </div>
  </div>

  <div class="border-b-2 top-10 relative bg-base-200 text-base-content border-base-100">
    <div class="container max-w-4xl mx-auto font-serif">
      <div class="w-full">
        <div class="flex justify-between px-3 pt-2 pb-4">
          <router-link :to="{ name: 'LandingIndex' }" class="flex px-2 py-0 w-2/5">
            <img src="../assets/img/logo/google-developers.svg" alt="icon" class="w-10 hover:shadow-lg" />
            <h3 class="pt-2 lg:pt-0 ml-4 mt-1 text-md font-bold text-base-content hover:link">
              YPMT PSIKOTEST
            </h3>
          </router-link>
          <div class="md:w-3/5">
            <div class="hidden md:block">
              <div class="flex justify-end gap-10 pt-2">
                <a :href="VITE_API_URLFE_SEKOLAH" target="_blank"
                  class="text-base-content font-normal text-sm hover:link">Home</a>

                <!-- <a
                  href="#paket"
                  class=" text-base-content font-normal text-sm   hover:link"
                  >Paket</a
                > -->
                <a :href="VITE_API_URLFE_SEKOLAH + 'login'" target="_blank"
                  class="text-base-content font-normal text-sm hover:link">Sekolah</a>
                <a :href="VITE_API_URLFE_YAYASAN" target="_blank"
                  class="text-base-content font-normal text-sm hover:link">Yayasan</a>
                <a :href="VITE_API_URLFE_SISWA" target="_blank"
                  class="text-base-content font-normal text-sm hover:link">Siswa</a>
                <a :href="VITE_API_URLFE_ORTU" target="_blank"
                  class="text-base-content font-normal text-sm hover:link">Wali Murid</a>
                <a :href="VITE_API_URLFE_ORTU" target="_blank"
                  class="text-base-content font-normal text-sm hover:link">Wali Murid</a>
                <a :href="VITE_API_URLFE_UJIAN" target="_blank"
                  class="text-base-content font-normal text-sm hover:link">Ujian Bidang Studi</a>

                <!-- <a href="https://github.com/godgodwinter" target="blank" class=" text-base-content font-semibold text-sm hover:text-vue-600 hover:link">Github </a> -->
              </div>
            </div>

            <span class="text-gray-600 text-xl md:hidden block">
              <label class="btn btn-circle swap swap-rotate">
                <!-- this hidden checkbox controls the state -->
                <input type="checkbox" @click="sidebarToggle" />

                <!-- hamburger icon -->
                <svg class="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                  viewBox="0 0 512 512">
                  <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>

                <!-- close icon -->
                <svg class="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                  viewBox="0 0 512 512">
                  <polygon
                    points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                </svg>
              </label>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <main class="font-serif md:min-h-screen pt-10 lg:pt-10">
    <router-view />
  </main>
  <Footer />
  <!-- <footer class="footer items-center p-4 bg-neutral text-neutral-content">
    <div class="items-center grid-flow-col">
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
        class="fill-current"
      >
        <path
          d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"
        ></path>
      </svg>
      <p>Copyright © 2022 - All right reserved</p>
    </div>
    <div class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
      <a
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="fill-current"
        >
          <path
            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
          ></path>
        </svg>
      </a>
      <a
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="fill-current"
        >
          <path
            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
          ></path></svg
      ></a>
      <a
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="fill-current"
        >
          <path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
          ></path></svg
      ></a>
    </div>
  </footer> -->
</template>
