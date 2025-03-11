<template>
  <div>
    <LoadingSpinner v-if="isLoading" />
    <div v-else class="main-content">
      <!-- KPI Cards Section Below Table -->
      <div class="kpi-container">
        <KPICard
          v-for="(kpi, index) in employeeKPIs"
          :key="index"
          :icon="kpi.icon"
          :stat="kpi.stat"
          :title="kpi.title"
          :color="kpi.color"
        />
      </div>
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
import { fetchTableData, fetchEmployeeKPIs } from "@/api/employeePage.js";
import LoadingSpinner from "@/components/UI/LoadingSpinner.vue";
import KPICard from "@/components/UI/KPICard.vue";

export default {
  components: {
    InfoCard,
    EmployeeTable,
    LoadingSpinner,
    KPICard,
  },

  created() {
    Promise.all([fetchTableData(), fetchEmployeeKPIs()])
      .then(([employeeData, kpiData]) => {
        this.employees = employeeData.employees;
        this.employeeKPIs = this.employeeKPIs.map((kpi, index) => ({
          ...kpi,
          stat: kpiData[index]?.stat || 0,
        }));

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
      employeeKPIs: [
        {
          icon: "fas fa-users",
          title: "Total Employees",
          color: "#1976d2",
          stat: 0,
        },
        {
          icon: "fas fa-user-plus",
          title: "New Hires",
          color: "#388e3c",
          stat: 0,
        },
        {
          icon: "fas fa-user-times",
          title: "Employees Absent",
          color: "#f44336",
          stat: 0,
        },
        {
          icon: "fas fa-smile",
          title: "Employee Satisfaction",
          color: "#0288d1",
          stat: 0,
        },
        {
          icon: "fas fa-briefcase",
          title: "Open Positions",
          color: "#fbc02d",
          stat: 0,
        },
        {
          icon: "fas fa-refresh",
          title: "Retention Rate",
          color: "#388e3c",
          stat: 0,
        },
        {
          icon: "fas fa-exchange-alt",
          title: "Employee Turnover Rate",
          color: "#d32f2f",
          stat: 0,
        },
        {
          icon: "fas fa-balance-scale",
          title: "Gender Pay Gap",
          color: "#8e24aa",
          stat: 0,
        },
        {
          icon: "fas fa-clock",
          title: "Absenteeism",
          color: "#ff5722", // Orange
          stat: 0,
        },
        {
          title: "Average Employee Tenure",
          icon: "fas fa-calendar-alt",
          color: "#fbc02d", // Yellow
          stat: 0,
        },
      ],
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

.kpi-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-bottom: 10px;
}

@media (max-width: 1200px) {
  .kpi-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .kpi-container {
    grid-template-columns: 1fr;
  }
}
</style>
