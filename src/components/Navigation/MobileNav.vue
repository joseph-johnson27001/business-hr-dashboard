<template>
  <transition name="slide-fade">
    <div v-if="isVisible" class="mobile-nav">
      <div class="close-btn" @click="closeMenu">&times;</div>
      <ul>
        <li @click="navigateTo('/')">
          <div class="icon-container"><i class="fas fa-home"></i></div>
          Home
        </li>
        <li @click="navigateTo('/employees')">
          <div class="icon-container"><i class="fas fa-users"></i></div>
          Employees
        </li>
        <li @click="navigateTo('/payroll')">
          <div class="icon-container"><i class="fas fa-chart-line"></i></div>
          Payroll
        </li>
        <li @click="navigateTo('/attendance')">
          <div class="icon-container"><i class="fas fa-building"></i></div>
          Attendance
        </li>
        <li @click="navigateTo('/jobs')">
          <div class="icon-container"><i class="fas fa-briefcase"></i></div>
          Jobs
        </li>
        <li @click="navigateTo('')">
          <div class="icon-container"><i class="fas fa-sign-out-alt"></i></div>
          Logout
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
export default {
  name: "MobileNav",
  props: {
    isVisible: Boolean,
  },
  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },
  watch: {
    isVisible(newVal) {
      if (newVal && this.windowWidth > 600) {
        this.closeMenu();
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    navigateTo(route) {
      this.$emit("close");
      this.$router.push(route);
    },
    closeMenu() {
      this.$emit("close");
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth > 600 && this.isVisible) {
        this.closeMenu();
      }
    },
  },
};
</script>

<style scoped>
.mobile-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 2rem;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 15px;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  justify-content: flex-start;
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 5px;
}

.icon-container i {
  font-size: 1.5rem;
}

li:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.fas.fa-home {
  color: #01a9f2;
}

.fas.fa-users {
  color: #d86890;
}

.fas.fa-chart-line {
  color: #ff5722;
}

.fas.fa-building {
  color: #4caf50;
}

.fas.fa-briefcase {
  color: #ff9800;
}

.fas.fa-sign-out-alt {
  color: #006ba6;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
