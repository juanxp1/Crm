// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    rail: true,
    drawer: false,
  }),

  actions: {
    toggleRail() {
      this.rail = !this.rail;
    },

    sideBar() {
      this.rail = !this.rail;
    },

    setDrawer() {
      this.drawer = !this.drawer;
    },
  }
})
