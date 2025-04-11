<template>
  <div :class="['sidebar', { collapsed: isCollapsed }]">
    <!-- Toggle Button -->
    <div class="toggle-btn" @click="toggleSidebar">
      <i
        :class="['fas', isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left']"
      ></i>
    </div>

    <nav>
      <ul>
        <div>
          <li :class="{ active: currentRoute === '/' }" @click="goTo('/')">
            <div class="icon-container">
              <i class="fas fa-home"></i>
            </div>
            <span v-show="textVisible">Home</span>
          </li>
          <li
            :class="{ active: currentRoute === '/employees' }"
            @click="goTo('/employees')"
          >
            <div class="icon-container">
              <i class="fas fa-users"></i>
            </div>
            <span v-show="textVisible">Employees</span>
          </li>
          <li
            :class="{ active: currentRoute === '/payroll' }"
            @click="goTo('/payroll')"
          >
            <div class="icon-container">
              <i class="fas fa-chart-line"></i>
            </div>
            <span v-show="textVisible">Payroll</span>
          </li>
          <li
            :class="{ active: currentRoute === '/attendance' }"
            @click="goTo('/attendance')"
          >
            <div class="icon-container">
              <i class="fas fa-building"></i>
            </div>
            <span v-show="textVisible">Attendance</span>
          </li>
          <li
            :class="{ active: currentRoute === '/jobs' }"
            @click="goTo('/jobs')"
          >
            <div class="icon-container">
              <i class="fas fa-briefcase"></i>
            </div>
            <span v-show="textVisible">Jobs</span>
          </li>
        </div>
        <li @click="goTo('')" style="margin-top: auto">
          <div class="icon-container">
            <i class="fas fa-sign-out-alt"></i>
          </div>
          <span v-show="textVisible">Logout</span>
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
      currentRoute: "",
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.currentRoute = this.$route.path;
    });
  },
  watch: {
    $route(to) {
      this.currentRoute = to.path;
    },
  },
  methods: {
    toggleSidebar() {
      if (this.isCollapsed) {
        setTimeout(() => {
          this.textVisible = true;
        }, 75);
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
  width: 200px;
  font-family: "Inter", sans-serif;
  background-color: #ffffff;
  height: 100%;
  border-right: 1px solid #ccc;
  transition: width 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
}

.sidebar.collapsed {
  width: 65px;
}

nav {
  width: 100%;
  height: 100%;
  padding-bottom: 10px;
}

nav ul {
  list-style: none;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
}

nav li {
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 5px;
  border-radius: 8px;
  font-weight: 400;
  color: #222;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-family: "Assistant", sans-serif;
  text-wrap: nowrap;
}

.sidebar.collapsed nav li {
  justify-content: center;
  padding: 10px;
}

nav li.active {
  background-color: #f0f0f0;
  border-radius: 8px;
}

nav li:hover {
  background-color: #f0f0f0;
}

nav li span {
  display: inline-block;
}

.icon-container {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 7px;
}

.sidebar.collapsed .icon-container {
  margin-right: 0px;
}

i {
  font-size: 1.2rem;
  text-align: center;
  color: inherit;
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

.toggle-btn {
  position: absolute;
  right: -0.65rem;
  bottom: 10%;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #bbb;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
}

.toggle-btn i {
  font-size: 10px;
  color: #006ba6;
  text-align: center;
  display: flex;
  justify-content: center;
  margin: 0px;
}
</style>
