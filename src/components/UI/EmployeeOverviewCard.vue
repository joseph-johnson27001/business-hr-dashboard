<template>
  <div class="employee-card">
    <div class="profile-image">
      <img :src="employee.photo" :alt="employee.name" />
    </div>
    <div class="employee-info">
      <h2>{{ employee.name }}</h2>
      <p class="position">{{ employee.position }}</p>
      <!-- <div class="details">
        <span
          ><i class="fas fa-map-marker-alt"></i> {{ employee.location }}</span
        >
        <span
          ><i class="fas fa-birthday-cake"></i> {{ employee.birthday }}</span
        >
        <span :class="statusClass"
          ><i class="fas fa-circle"></i> {{ employee.status }}</span
        >
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    employee: Object,
  },
  computed: {
    statusClass() {
      return {
        active: this.employee.status === "Active",
        inactive: this.employee.status === "Inactive",
        leave: this.employee.status === "On Leave",
      };
    },
  },
};
</script>

<style scoped>
.employee-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.profile-image img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
}

.employee-info {
  flex: 1;
}

h2 {
  margin: 0;
  font-family: "Inter";
  font-size: 1rem;
  font-weight: 400;
  margin-top: 5px;
  color: #006ba6;
}

.position {
  color: #666;
  font-size: 1rem;
  margin: 5px 0;
}

.details {
  display: flex;
  gap: 15px;
  font-size: 0.8rem;
  color: #777;
}

.details i {
  margin-right: 5px;
}

.active {
  color: #388e3c;
}

.inactive {
  color: #d32f2f;
}

.leave {
  color: #fbc02d;
}

@media (max-width: 400px) {
  .details {
    flex-direction: column;
  }
}

@media (max-width: 300px) {
  h2 {
    font-size: 1rem;
  }

  .profile-image img {
    height: 50px;
    width: 50px;
  }
  details {
    font-size: 0.6rem;
  }
}
</style>
