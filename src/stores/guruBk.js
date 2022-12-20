import { defineStore } from 'pinia';
export const useStoreGuruBk = defineStore({
    id: 'storeGuruBk',
    state: () => ({
        settings: {
            superadmin: localStorage.getItem('superadmin_001') ? JSON.parse(localStorage.getItem('superadmin_001')) :false,
        },
        identitas: [],
        sekolah: {
            status: 'NonAktif',
        },
        paket: {
            penanganandeteksi: true,
            terapiskarakterpositif: false,

        },
        stats: [],
        // untuk pencarian temporary tersimpan
        tempSekolah: [
            // {
            //     sekolah_id: 2, // id 
            //     kelas_id: null,
            // nama_kelas: null
            // },
        ],
    }),
    getters: {
        getSettings: (state) => state.settings,
        getSuperadminMode: (state) => state.settings.superadmin,
        getIdentitas: (state) => state.identitas,
        getSekolah: (state) => state.sekolah,
        getPaket: (state) => state.paket,
        getStats: (state) => state.stats,
        getTempSekolah: (state) => state.tempSekolah,
    },
    actions: {
        setSettings(settings) {
            this.settings = settings;
        },
        setSuperadminMode(superadminMode) {
            this.settings.superadmin = superadminMode;
        },
        setIdentitas(identitas) {
            this.identitas = identitas;
        },
        setSekolah(sekolah) {
            this.sekolah = sekolah;
        },
        setPaket(paket) {
            this.paket = paket;
        },
        setStats(stats) {
            this.stats = stats;
        },
        setTempSekolah(tempSekolah) {
            this.tempSekolah = tempSekolah;
        }

    }

});
