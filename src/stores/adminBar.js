import { defineStore } from 'pinia';




export const useStoreAdminBar = defineStore({
    id: 'storeAdminBar',
    state: () => ({
        isSidebarActive: false,
        pagesActive: '',
        pagesSubSideBarActive: '',
        kataBijak: [],
        subMenuActive: ''
    }),
    // state: ()=>({
    //     isSidebarActive: false,
    // }),
    getters: {
        getIsSidebarActive: (state) => state.isSidebarActive,
        getPagesActive: (state) => state.pagesActive,
        getPagesSubSideBarActive: (state) => state.pagesSubSideBarActive,
        getsubMenuActive: (state) => state.subMenuActive,
        getKataBijak: (state) => state.kataBijak,
    },
    actions: {
        toggleSideBar() {
            this.isSidebarActive = !this.isSidebarActive;
        },
        setPagesActive(pages) {
            this.pagesActive = pages;
        },
        setPagesSubSideBarActive(pages) {
            this.pagesSubSideBarActive = pages;
        },
        setsubMenuActive(pages) {
            this.subMenuActive = pages;
        },
        setKataBijak(kataBijak) {
            this.kataBijak = kataBijak;
        }
    }
});
