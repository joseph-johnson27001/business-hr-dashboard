<template>
  <div class="topnav">
    <h3>HR Dashboard</h3>

    <!-- User Profile Section -->
    <div class="user-profile">
      <!-- Search Section -->
      <div class="search-container">
        <input
          type="text"
          placeholder="Search..."
          v-model="searchQuery"
          @input="handleSearch"
          class="search-input"
        />
      </div>
      <img
        src="https://via.placeholder.com/40"
        alt="User Profile"
        class="profile-image"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TopNav",
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    handleSearch() {
      console.log("Searching for:", this.searchQuery);
    },
  },
};
</script>

<style scoped>
.topnav {
  height: 55px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid #ccc;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-input {
  height: 30px;
  width: 100px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  transition: width 0.3s ease;
  margin-right: 10px;
  background-color: #fefefe;
}

.search-input:focus {
  outline: none;
  border-color: #01a9f2;
  width: 250px;
}

.search-input::placeholder {
  color: #888;
}

.user-profile {
  display: flex;
  align-items: center;
}

.profile-image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #ccc;
}
</style>
