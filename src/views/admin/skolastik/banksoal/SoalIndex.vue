<script setup>
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
</script>
<template>
    <div class="pt-4 px-10 md:flex justify-between">
        <div>
            <span class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm">Soal Index
            </span>
        </div>
        <div class="md:py-0 py-4">
            <BreadCrumb>
                <template v-slot:content>
                    Soal Index
                    <BreadCrumbSpace /> Index
                </template>
            </BreadCrumb>
        </div>
    </div>
    <div class="divider"></div>
</template>