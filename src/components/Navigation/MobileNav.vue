<template>
  <transition name="slide-fade">
    <div v-if="isVisible" class="mobile-nav">
      <div class="close-btn" @click="closeMenu">&times;</div>
      <ul>
        <li @click="navigateTo('/')"><i class="fas fa-home"></i> Home</li>
        <li @click="navigateTo('/employees')">
          <i class="fas fa-users"></i> Employees
        </li>
        <li @click="navigateTo('/payroll')">
          <i class="fas fa-chart-line"></i> Payroll
        </li>
        <li @click="navigateTo('/attendance')">
          <i class="fas fa-building"></i> Attendance
        </li>
        <li @click="navigateTo('/jobs')">
          <i class="fas fa-briefcase"></i> Jobs
        </li>
        <li @click="navigateTo('')">
          <i class="fas fa-sign-out-alt"></i> Logout
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
  methods: {
    navigateTo(route) {
      this.$emit("close");
      this.$router.push(route);
    },
    closeMenu() {
      this.$emit("close");
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
}

li:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
