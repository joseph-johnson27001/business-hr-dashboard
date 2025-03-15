<template>
  <div class="layout">
    <TopNav />
    <div class="main-content">
      <SideBar class="sidebar" />
      <div class="content">
        <!-- INSERT NEW NAVIGATION HERE -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/Navigation/SideBar.vue";
import TopNav from "@/components/Navigation/TopNav.vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

// Set global font family for all charts
Chart.defaults.font.family = '"Inter", sans-serif';

export default {
  name: "App",
  components: {
    SideBar,
    TopNav,
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
