<template>
  <div class="topnav">
    <i class="fas fa-bars bars-icon" @click="$emit('toggle-mobile-nav')"></i>
    <h3 class="heading">HR Dashboard</h3>

    <div class="user-profile">
      <div class="search-container">
        <input
          type="text"
          placeholder="Search"
          v-model="searchQuery"
          @input="handleSearch"
          class="search-input"
        />
      </div>
      <i class="fas fa-bell notification-icon"></i>
      <img
        src="https://randomuser.me/api/portraits/men/1.jpg"
        alt="User Profile"
        class="profile-image"
        @click="navigateToUser"
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
    navigateToUser() {
      this.$router.push(`/employee`);
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
  color: #006ba6;
}

.heading {
  font-family: "Unica One", sans-serif;
  font-weight: 500;
  font-size: 1.4rem;
  margin: 0;
  letter-spacing: -1px;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-input {
  height: 25px;
  width: 250px;
  padding: 5px 10px;
  border: 1px solid #bbb;
  border-radius: 4px;
  font-size: 14px;
  margin-right: 10px;
  background-color: #f6f6fb;
  font-family: "Assistant";
}

.search-input:focus {
  outline: none;
  border-color: #01a9f2;
}

.search-input::placeholder {
  color: #888;
}

.user-profile {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.profile-image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #bbb;
}

.notification-icon {
  color: #006ba6;
  font-size: 20px;
  margin-right: 10px;
  cursor: pointer;
}

.bars-icon {
  display: none;
}

@media (max-width: 600px) {
  .search-input {
    display: none;
  }
  .bars-icon {
    display: block;
    color: #006ba6;
    font-size: 20px;

    cursor: pointer;
  }
}

@media (max-width: 300px) {
  .heading {
    display: none;
  }
}
</style>
