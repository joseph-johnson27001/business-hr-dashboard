<template>
  <div class="sidebar">
    <nav>
      <ul>
        <li>
          <router-link to="/" class="nav-link">
            <i class="fas fa-home"></i> <span>Home</span>
          </router-link>
        </li>
        <li>
          <router-link to="/employees" class="nav-link">
            <i class="fas fa-users"></i> <span>Employees</span>
          </router-link>
        </li>
        <li>
          <router-link to="/payroll" class="nav-link">
            <i class="fas fa-chart-line"></i> <span>Payroll</span>
          </router-link>
        </li>
        <li>
          <router-link to="/attendance" class="nav-link">
            <i class="fas fa-building"></i> <span>Attendance</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "SideBar",
};
</script>

<style scoped>
.sidebar {
  width: 225px;
  background-color: #ffffff;
  padding: 0 10px;
  height: 100%;
  border-right: 1px solid #ccc;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav li {
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0px;
  border-radius: 5px;
}

nav li:hover {
  background-color: #f0f0f0;
}

i {
  font-size: 1.2em;
  width: 25px;
  text-align: center;
  margin-right: 5px;
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

.nav-link {
  display: flex;
  align-items: center;
  width: 100%;
  text-decoration: none;
  color: inherit;
}

.nav-link:hover {
  background-color: #f0f0f0;
}
</style>
