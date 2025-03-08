<template>
  <div :class="['sidebar', { collapsed: isCollapsed }]">
    <!-- Toggle Button -->
    <div class="toggle-btn" @click="toggleSidebar">
      <i class="fas fa-bars"></i>
    </div>

    <nav>
      <ul>
        <li @click="goTo('/')">
          <i class="fas fa-home"></i>
          <span v-show="textVisible">Home</span>
        </li>
        <li @click="goTo('/employees')">
          <i class="fas fa-users"></i>
          <span v-show="textVisible">Employees</span>
        </li>
        <li @click="goTo('/payroll')">
          <i class="fas fa-chart-line"></i>
          <span v-show="textVisible">Payroll</span>
        </li>
        <li @click="goTo('/attendance')">
          <i class="fas fa-building"></i>
          <span v-show="textVisible">Attendance</span>
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
      textVisible: true,
    };
  },
  methods: {
    toggleSidebar() {
      if (this.isCollapsed) {
        setTimeout(() => {
          this.textVisible = true;
        }, 60);
      } else {
        this.textVisible = false;
      }

      this.isCollapsed = !this.isCollapsed;
    },
    goTo(route) {
      this.$router.push(route);
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
  transition: width 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.sidebar.collapsed {
  width: 65px;
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
  margin: 10px;
  border-radius: 5px;
}

nav li:hover {
  background-color: #f0f0f0;
}

nav li span {
  display: inline-block;
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
