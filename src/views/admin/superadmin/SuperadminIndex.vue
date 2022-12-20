<script setup>
import { ref, computed } from 'vue';
import { useStoreGuruBk } from "@/stores/guruBk";
const storeGuruBk = useStoreGuruBk();
const settings = computed(() => storeGuruBk.getSettings);
const superadmin = computed(() => storeGuruBk.getSuperadminMode);

console.log(superadmin.value);
const doUpdateSuperadminMode = () => {
    let inputSuperadminMode = !superadmin.value;
    localStorage.setItem('superadmin_001', inputSuperadminMode);
    storeGuruBk.setSuperadminMode(inputSuperadminMode);
    // console.log(superadmin.value);
}

const doReset = () => {
    localStorage.removeItem('superadmin_001');
    storeGuruBk.setSuperadminMode(false);
}
</script>
<template>
    <div class="alert alert-warning shadow-lg p-4">
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Warning: Hati-hati dalam penggunaan Mode Superadmin karena dapat menghilangkan data secara
                permanent!</span>
        </div>
    </div>

    <div class="p-10">
        <article class="prose">
            <div class="flex gap-4">
                <!-- <input type="checkbox" class="toggle toggle-success" v-model="superadmin" disabled /> -->

                <button class="btn btn-warning" @click="doUpdateSuperadminMode()">Ganti Mode</button>
                <h1>Mode Superadmin : {{ superadmin ? "Aktif" : "Tidak Aktif" }}</h1>
            </div>
        </article>
    </div>
    <div>
        <button class="btn btn-info" @click="doReset()">RESET / MODE AMAN</button>
    </div>
</template>