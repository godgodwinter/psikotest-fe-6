<script setup>
import ButtonOne from "@/components/atoms/ButtonOne.vue";
import ButtonTwo from "@/components/atoms/ButtonTwo.vue";
</script>
<template>
  <div class="py-20 lg:py-10 max-w-4xl mx-auto">
    <div class="hero min-h-96 bg-base-100">
      <div
        class="hero-content flex-col justify-between lg:flex-row-reverse w-full"
      >
        <img
          src="@/assets/img/other/img-landing2.svg"
          class="max-w-sm rounded-lg shadow-sm"
        />

        <!-- <div
          class="h-96 w-full carousel carousel-vertical rounded-box flex justify-center items-center"
        >
          <div class="carousel-item h-full">
            <img src="@/assets/img/other/img-landing2.svg" />
          </div>
          <div class="carousel-item h-full">
            <img src="@/assets/img/other/img-landing2.svg" />
          </div>
        </div> -->
        <div>
          <h1 class="text-5xl font-bold">Yayasan Pelita Multi Talenta</h1>
          <p class="py-6">
            Kantor Operasional Teratai No. 10 Sekretariat Letjen Sutoyo V Malang
            - Jawa Timur
          </p>
          <router-link :to="{ name: 'LandingLogin' }">
            <button class="btn btn-primary">Get Started</button></router-link
          >
        </div>
      </div>
    </div>
  </div>

  <section class="pt-20 pb-24 2xl:py-40 bg-base-content" id="paket">
    <div class="container mx-auto px-4">
      <div class="mb-16 md:mb-24 text-center">
        <h2
          class="mb-8 md:mb-14 text-5xl lg:text-6xl 2xl:text-7xl text-base-200 font-bold font-heading"
        >
          Fitur dan Paket
        </h2>
        <!-- <p class="text-lg text-gray-content">
          Beberapa pilihan Paket dan fitur yang tersedia.
        </p> -->
      </div>
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-wrap items-center -mx-3">
          <div class="w-full lg:w-1/3 px-3 mb-8 lg:mb-0">
            <div class="px-12 py-16 bg-base-300 rounded-3xl">
              <div class="pb-8 mb-14 border-b border-gray-400">
                <div class="flex justify-between items-center px-3">
                  <h3 class="text-4xl text-base-content font-bold font-heading">
                    Premium
                  </h3>
                  <p class="text-lg text-base-content font-bold">Rp -,00</p>
                </div>
              </div>
              <ul class="text-lg text-base-content mb-16">
                <li class="flex items-center mb-8" v-for="i in 4">
                  <span class="mr-6">
                    <svg
                      width="20"
                      height="16"
                      viewbox="0 0 20 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.81671 15.0418L0 8.2251L0.90027 7.32483L6.81671 13.2413L19.0997 0.958252L20 1.85852L6.81671 15.0418Z"
                        fill="gray"
                      ></path>
                    </svg>
                  </span>
                  <span>CIFIT</span>
                </li>
                <li class="flex items-center mb-8 text-gray-400" v-for="i in 4">
                  <span class="mr-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 fill-current"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </span>
                  <span>CIFIT X</span>
                </li>
              </ul>
              <div class="text-center">
                <a
                  class="inline-block px-10 py-4 border border-base-content hover:border-gray-100 rounded-full font-bold text-base-content"
                  href="#"
                  >Selengkapnya</a
                >
              </div>
            </div>
          </div>
          <div class="w-full lg:w-1/3 px-3 mb-8 lg:mb-0">
            <div class="px-12 py-16 bg-base-300 rounded-3xl">
              <div class="pb-8 mb-14 border-b border-gray-400">
                <div class="flex justify-between items-center px-3">
                  <h3 class="text-4xl text-base-content font-bold font-heading">
                    Gold
                  </h3>
                  <p class="text-lg text-base-content font-bold">Rp -,00</p>
                </div>
              </div>
              <ul class="text-lg text-base-content mb-16">
                <li class="flex items-center mb-8" v-for="i in 4">
                  <span class="mr-6">
                    <svg
                      width="20"
                      height="16"
                      viewbox="0 0 20 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.81671 15.0418L0 8.2251L0.90027 7.32483L6.81671 13.2413L19.0997 0.958252L20 1.85852L6.81671 15.0418Z"
                        fill="gray"
                      ></path>
                    </svg>
                  </span>
                  <span>CIFIT</span>
                </li>
              </ul>
              <div class="text-center">
                <a
                  class="inline-block px-10 py-4 border border-base-content hover:border-gray-100 rounded-full font-bold text-base-content"
                  href="#"
                  >Selengkapnya</a
                >
              </div>
            </div>
          </div>
          <div class="w-full lg:w-1/3 px-3 mb-8 lg:mb-0">
            <div class="px-12 py-16 bg-blue-500 rounded-3xl">
              <div class="pb-8 mb-14 border-b border-blueGray-300">
                <div class="flex justify-between items-center px-3">
                  <h3 class="text-4xl text-white font-bold font-heading">
                    Platinum
                  </h3>
                  <p class="text-lg text-white font-bold">Rp -,</p>
                </div>
              </div>
              <ul class="text-lg text-white mb-16">
                <li class="flex items-center mb-8">
                  <span class="mr-6">
                    <svg
                      width="20"
                      height="16"
                      viewbox="0 0 20 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.81671 15.0418L0 8.2251L0.90027 7.32483L6.81671 13.2413L19.0997 0.958252L20 1.85852L6.81671 15.0418Z"
                        fill="white"
                      ></path>
                    </svg>
                  </span>
                  <span>Complete files</span>
                </li>
                <li class="flex items-center mb-8">
                  <span class="mr-6">
                    <svg
                      width="20"
                      height="16"
                      viewbox="0 0 20 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.81671 15.0418L0 8.2251L0.90027 7.32483L6.81671 13.2413L19.0997 0.958252L20 1.85852L6.81671 15.0418Z"
                        fill="white"
                      ></path>
                    </svg>
                  </span>
                  <span>100GB cloud storage</span>
                </li>
                <li class="flex items-center mb-8">
                  <span class="mr-6">
                    <svg
                      width="20"
                      height="16"
                      viewbox="0 0 20 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.81671 15.0418L0 8.2251L0.90027 7.32483L6.81671 13.2413L19.0997 0.958252L20 1.85852L6.81671 15.0418Z"
                        fill="white"
                      ></path>
                    </svg>
                  </span>
                  <span>20 team members</span>
                </li>
                <li class="flex items-center mb-8">
                  <span class="mr-6">
                    <svg
                      width="20"
                      height="16"
                      viewbox="0 0 20 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.81671 15.0418L0 8.2251L0.90027 7.32483L6.81671 13.2413L19.0997 0.958252L20 1.85852L6.81671 15.0418Z"
                        fill="white"
                      ></path>
                    </svg>
                  </span>
                  <span>Unlimited anonymous board editors</span>
                </li>
                <li class="flex items-center">
                  <span class="mr-6">
                    <svg
                      width="20"
                      height="16"
                      viewbox="0 0 20 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.81671 15.0418L0 8.2251L0.90027 7.32483L6.81671 13.2413L19.0997 0.958252L20 1.85852L6.81671 15.0418Z"
                        fill="white"
                      ></path>
                    </svg>
                  </span>
                  <span>10GB cloud storage</span>
                </li>
              </ul>
              <div class="text-center">
                <a
                  class="inline-block px-10 py-4 border border-blueGray-300 hover:border-blueGray-100 rounded-full font-bold text-white"
                  href="#"
                  >Buy now</a
                >
              </div>
            </div>
          </div>

          <div class="w-full lg:w-1/3 px-3 mb-8 lg:mb-0">
            <div class="px-12 py-16 bg-base-300 rounded-3xl">
              <div class="pb-8 mb-14 border-b border-gray-400">
                <div class="flex justify-between items-center px-3">
                  <h3 class="text-4xl text-base-content font-bold font-heading">
                    Diamond
                  </h3>
                  <p class="text-lg text-base-content font-bold">Rp -,00</p>
                </div>
              </div>
              <ul class="text-lg text-base-content mb-16">
                <li class="flex items-center mb-8" v-for="i in 4">
                  <span class="mr-6">
                    <svg
                      width="20"
                      height="16"
                      viewbox="0 0 20 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.81671 15.0418L0 8.2251L0.90027 7.32483L6.81671 13.2413L19.0997 0.958252L20 1.85852L6.81671 15.0418Z"
                        fill="gray"
                      ></path>
                    </svg>
                  </span>
                  <span>CIFIT</span>
                </li>
              </ul>
              <div class="text-center">
                <a
                  class="inline-block px-10 py-4 border border-base-content hover:border-gray-100 rounded-full font-bold text-base-content"
                  href="#"
                  >Selengkapnya</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
