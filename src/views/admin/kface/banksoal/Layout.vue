<script setup>
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import { computed } from "vue";
import { useStoreAdminBar } from "@/stores/adminBar";
import { useStoreBanksoal } from "@/stores/data/banksoal";
const storeAdminBar = useStoreAdminBar();
const storeBankSoal = useStoreBanksoal();
storeAdminBar.setPagesActive("kface-banksoal");
storeBankSoal.setPagesActive("soal");
const pagesActive = computed(() => storeBankSoal.getPagesActive);
</script>
<template>
    <div class="divider">BANKSOAL KARAKTER FACE</div>
    <div class="navbar bg-base-100">
        <div class="navbar-start">
            <div class="dropdown">
                <label tabindex="0" class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </label>
                <ul tabindex="0"
                    class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li> <router-link :to="{ name: 'admin.kface.banksoal.aspek' }"><a>ASPEK</a></router-link></li>
                    <li><router-link :to="{ name: 'admin.kface.banksoal.soal' }"><a>SOAL</a></router-link></li>
                </ul>
            </div>
            <!-- <router-link :to="{ name: 'admin.skolastik.banksoal' }"
        class="btn btn-ghost normal-case text-xl shadow-md">MENU SKOLASTIK</router-link> -->
        </div>
        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-1 space-x-2">
                <li> <router-link :to="{ name: 'admin.kface.banksoal.aspek' }"><button
                            class="btn btn-md btn-info ">ASPEK</button></router-link></li>
                <li> <router-link :to="{ name: 'admin.kface.banksoal.soal' }"><button
                            class="btn btn-md btn-info ">SOAL</button></router-link></li>
            </ul>
        </div>
        <div class="navbar-end space-x-2">
            <router-link :to="{ name: 'admin.kface.banksoal.aspek' }"><a class="btn btn-primary"> BANK
                    SOAL</a></router-link>
            <router-link :to="{ name: 'admin.kface.paketsoal' }"><a class="btn btn-primary"> PAKET
                    SOAL</a></router-link>
        </div>
    </div>
    <div class="divider"></div>

    <div class="py-2 lg:py-4 px-4">
        <router-view />
    </div>
</template>
