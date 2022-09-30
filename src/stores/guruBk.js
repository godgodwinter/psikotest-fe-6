import { defineStore } from 'pinia';
export const useStoreGuruBk = defineStore({
    id: 'storeGuruBk',
    state: () => ({
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
            {
                sekolah_id: 2, // id 
                kelas_id: null
            },
        ],
    }),
    getters: {
        getIdentitas: (state) => state.identitas,
        getSekolah: (state) => state.sekolah,
        getPaket: (state) => state.paket,
        getStats: (state) => state.stats,
        getTempSekolah: (state) => state.tempSekolah,
    },
    actions: {
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
