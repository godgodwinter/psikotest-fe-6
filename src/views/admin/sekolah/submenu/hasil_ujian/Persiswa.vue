<script setup>
import ButtonCetak from "@/components/atoms/ButtonCetak.vue";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);

const BASE_URL = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : "http://localhost:8000/";

import CardLockedFitur from "@/components/organismes/CardLockedFitur.vue";
import Api from "@/axios/axios";
import { ref, watch, computed } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import { Field, Form } from "vee-validate";
import { useStoreAdminBar } from "@/stores/adminBar";
import { useRouter, useRoute } from "vue-router";
import Toast from "@/components/lib/Toast.js";

</script>
<template>

    Persiswa
</template>