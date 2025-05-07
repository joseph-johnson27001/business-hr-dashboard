<template>
  <div class="layout">
    <TopNav @toggle-mobile-nav="isMobileNavVisible = !isMobileNavVisible" />
    <div class="main-content">
      <SideBar class="sidebar" />
      <div class="content" ref="contentArea">
        <MobileNav
          :isVisible="isMobileNavVisible"
          @close="isMobileNavVisible = false"
        />
        <router-view></router-view>
      </div>
    </div>
    <DashboardButton />
  </div>
</template>

<script>
import SideBar from "@/components/Navigation/SideBar.vue";
import TopNav from "@/components/Navigation/TopNav.vue";
import MobileNav from "@/components/Navigation/MobileNav.vue";
import { Chart, registerables } from "chart.js";
import DashboardButton from "./components/UI/DashboardButton.vue";

Chart.register(...registerables);

// Set global font family for all charts
Chart.defaults.font.family = '"Inter", sans-serif';

export default {
  name: "App",
  components: {
    SideBar,
    TopNav,
    MobileNav,
    DashboardButton,
  },
  data() {
    return {
      isMobileNavVisible: false,
    };
  },
  watch: {
    $route() {
      this.scrollToTop();
    },
  },
  mounted() {
    this.scrollToTop();
  },
  methods: {
    scrollToTop() {
      const contentArea = this.$refs.contentArea;
      if (contentArea) {
        contentArea.scrollTop = 0;
      }
    },
  },
};
</script>

<style>
body {
  margin: 0px !important;
  scrollbar-width: none;
}

::-webkit-scrollbar {
  display: none;
}
</style>

<style scoped>
* {
  font-family: "Assistant", sans-serif;
}

.layout {
  display: flex;
  height: 100dvh;
  width: 100%;
  flex-direction: column;
}

.main-content {
  display: flex;
  flex-direction: row;
  flex: 1;
  background-color: #f5f5f5;
  height: 100dvh;
  overflow-y: hidden;
}

.content {
  flex: 1;
  padding: 15px;
  overflow-y: scroll;
}

@media (max-width: 600px) {
  .sidebar {
    display: none;
  }
}
</style>
