<!-- SideBar.vue -->
<template>
  <div class="sidebar">
    <nav>
      <ul>
        <li>Employees</li>
        <li>Revenue</li>
        <li>Departments</li>
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
  padding: 20px;
  height: 100%;
  border-right: 1px solid #ccc;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav li {
  padding: 10px 0;
  cursor: pointer;
}

nav li:hover {
  background-color: #f0f0f0;
}
</style>
