<template>
  <div class="layout">
    <TopNav />
    <div class="main-content">
      <SideBar />
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/Navigation/SideBar.vue";
import TopNav from "@/components/Navigation/TopNav.vue";

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
  scrollbar-width: none; /* Hide scrollbar (Firefox) */
}

::-webkit-scrollbar {
  display: none; /* Hide scrollbar (Chrome, Safari, Edge) */
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
</style>
