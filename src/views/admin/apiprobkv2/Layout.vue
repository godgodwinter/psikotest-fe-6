<script setup>
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import { computed } from "vue";
import { useStoreAdminBar } from "@/stores/adminBar";
import { useStoreBanksoal } from "@/stores/data/banksoal";
const storeAdminBar = useStoreAdminBar();
const storeBankSoal = useStoreBanksoal();
storeAdminBar.setPagesActive("apiprobk");
storeBankSoal.setPagesActive("soal");
const pagesActive = computed(() => storeBankSoal.getPagesActive);
</script>
<template>
    <div class="divider">APIPROBK</div>
    <div class="navbar bg-base-100">
        <div class="navbar-start">
        </div>
        <!-- <div class="navbar-end space-x-2">
            <router-link :to="{ name: 'admin.kface.banksoal.aspek' }"><a class="btn btn-primary"> BANK
                    SOAL</a></router-link>
            <router-link :to="{ name: 'admin.kface.paketsoal' }"><a class="btn btn-primary"> PAKET
                    SOAL</a></router-link>
        </div> -->
    </div>
    <div class="divider"></div>

    <div class="py-2 lg:py-4 px-4">
        <router-view />
    </div>
</template>
