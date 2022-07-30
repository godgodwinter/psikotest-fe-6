<template>
  <div class="py-2 lg:py-4 px-4 flex justify-start flex-col">
    <div class="tabs tabs-boxed">
      <RouterLink :to="{ name: 'admin.ujian.paketsoal' }">
        <span class="tab tab-bordered">Paket Soal Index</span></RouterLink
      >
      <RouterLink :to="{ name: 'admin.ujian.paketsoal.create' }">
        <span class="tab tab-bordered">Buat Paket Soal </span></RouterLink
      >
      <RouterLink :to="{ name: 'admin.ujian.paketsoal.kategori' }">
        <span class="tab tab-bordered">Kategori</span></RouterLink
      >
      <RouterLink
        :to="{ name: 'admin.ujian.paketsoal.kategori.create' }"
        class="tab tab-bordered"
      >
        <a class="tab tab-bordered">Add Kategori</a></RouterLink
      >
      <!-- <RouterLink
        :to="{ name: 'admin.ujian.paketsoal' }"
        class="tab tab-bordered"
      >
        <a class="tab tab-bordered"> Paket Soal</a></RouterLink
      >
      <RouterLink
        :to="{ name: 'admin.ujian.paketsoal.create' }"
        class="tab tab-bordered"
      >
        <a class="tab tab-bordered">Buat Paket Soal</a></RouterLink
      > -->
    </div>
  </div>
</template>
