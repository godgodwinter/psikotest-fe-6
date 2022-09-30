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
                sekolah_id: null, // id 
                kelas_id: null
            },
        ],
    }),
    getters: {
        getIdentitas: (state) => state.identitas,
        getSekolah: (state) => state.sekolah,
        getPaket: (state) => state.paket,
        getStats: (state) => state.stats,
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
        }

    }

});
