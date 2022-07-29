<script setup></script>
<template>
  <div class="py-2 lg:py-4 px-4">Form Buat Jadwal Ujian</div>
  <!-- <div class="py-2 lg:py-4 px-4">Data :</div> -->
  <!-- <div class="py-2 lg:py-4 px-4">Waktu : 90mnt | 120mnt | etc</div> -->
  <div class="py-2 lg:py-4 px-4">
    Pilih Paket Soal : Data dari Tabel Paket soal
  </div>
  <div class="py-2 lg:py-4 px-4">Peserta : Sekolah | Umum</div>
  <div>
    <h1 class="font-bold text-2xl">jika sekolah</h1>
    <div class="py-2 lg:py-4 px-4">Pilih Sekolah : dari Tabel Sekolah</div>
    <div class="py-2 lg:py-4 px-4">
      Pilih Kelas : dari Tabel Kelas [array] => pilih siswa | all
    </div>
    atau
    <div class="py-2 lg:py-4 px-4">
      Pilih Siswa : dari Tabel Siswa [array] // generate dari pilih kelas
    </div>
  </div>

  <div>
    <h1 class="font-bold text-2xl">jika Umum</h1>
    <div class="py-2 lg:py-4 px-4">
      Pilih Perserta : dari Tabel Umum [array]
    </div>
  </div>
  <div class="py-2 lg:py-4 px-4">
    <button class="btn btn-primary">Buat Jadwal</button>
  </div>
</template>
