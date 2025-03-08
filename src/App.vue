<template>
  <div class="layout">
    <TopNav />
    <div class="main-content">
      <SideBar />
      <div class="content">
        <!-- This is where dynamic content will go -->
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
}
</style>

<style scoped>
.layout {
  display: flex;
  height: 100dvh;
  width: 100%;
  flex-direction: column;
}

.main-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #f5f5f5; /* Light grey background */
}

.content {
  flex: 1;
  padding: 20px;
}
</style>
