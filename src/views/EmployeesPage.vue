<template>
  <div>
    <LoadingSpinner v-if="isLoading" />
    <div v-else class="main-content">
      <div class="table-container">
        <InfoCard title="Employees">
          <EmployeeTable :employees="employees" />
        </InfoCard>
      </div>
    </div>
  </div>
</template>

<script>
import InfoCard from "@/components/UI/InfoCard.vue";
import EmployeeTable from "@/components/Tables/EmployeeTable.vue";
import { fetchTableData } from "@/api/employeePage.js";
import LoadingSpinner from "@/components/UI/LoadingSpinner.vue";

export default {
  components: {
    InfoCard,
    EmployeeTable,
    LoadingSpinner,
  },

  created() {
    Promise.all([fetchTableData()])
      .then(([employeeData]) => {
        this.employees = employeeData.employees;
        this.isLoading = false;
      })
      .catch((error) => {
        this.isLoading = false;
        console.error("Error fetching employee data:", error);
      });
  },

  data() {
    return {
      isLoading: true,
      employees: [],
    };
  },
};
</script>

<style scoped>
.main-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.stat-section {
  margin-bottom: 10px;
  width: 100%;
}

.card-header {
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
}
</style>
