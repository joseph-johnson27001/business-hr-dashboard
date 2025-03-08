<template>
  <div :class="['sidebar', { collapsed: isCollapsed }]">
    <!-- Toggle Button -->
    <div class="toggle-btn" @click="toggleSidebar">
      <i class="fas fa-bars"></i>
    </div>

    <nav>
      <ul>
        <li>
          <router-link to="/" class="nav-link">
            <i class="fas fa-home"></i>
            <span :style="{ visibility: isCollapsed ? 'hidden' : 'visible' }"
              >Home</span
            >
          </router-link>
        </li>
        <li>
          <router-link to="/employees" class="nav-link">
            <i class="fas fa-users"></i>
            <span :style="{ visibility: isCollapsed ? 'hidden' : 'visible' }"
              >Employees</span
            >
          </router-link>
        </li>
        <li>
          <router-link to="/payroll" class="nav-link">
            <i class="fas fa-chart-line"></i>
            <span :style="{ visibility: isCollapsed ? 'hidden' : 'visible' }"
              >Payroll</span
            >
          </router-link>
        </li>
        <li>
          <router-link to="/attendance" class="nav-link">
            <i class="fas fa-building"></i>
            <span :style="{ visibility: isCollapsed ? 'hidden' : 'visible' }"
              >Attendance</span
            >
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      isCollapsed: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 225px;
  background-color: #ffffff;
  height: 100%;
  border-right: 1px solid #ccc;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.sidebar.collapsed {
  width: 70px;
}

nav {
  width: 100%;
}

nav ul {
  list-style: none;
  padding: 0;
  width: 100%;
}

nav li {
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 10px;
  border-radius: 5px;
}

nav li:hover {
  background-color: #f0f0f0;
}

.nav-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

i {
  font-size: 1.2rem;
  width: 25px;
  text-align: center;
  margin-right: 10px;
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

.toggle-btn {
  margin-left: 20px;
  padding-top: 20px;
  cursor: pointer;
  color: #444;
}

.sidebar.collapsed i {
  margin-right: 0;
}
</style>
