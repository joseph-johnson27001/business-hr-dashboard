<template>
  <div class="sidebar">
    <nav>
      <ul>
        <li><i class="fas fa-users"></i> <span>Employees</span></li>
        <li><i class="fas fa-chart-line"></i> <span>Payroll</span></li>
        <li><i class="fas fa-building"></i> <span>Attendance</span></li>
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
  padding: 10px;
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
}

.fas.fa-users {
  color: #2196f3;
}

.fas.fa-chart-line {
  color: #ff5722;
}

.fas.fa-building {
  color: #4caf50;
}
</style>
