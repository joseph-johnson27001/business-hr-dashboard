<template>
  <div class="home-page">
    <LoadingSpinner v-if="isLoading" />

    <!-- KPI Cards -->
    <div v-else class="kpi-container">
      <KPICard
        v-for="(kpi, index) in kpis"
        :key="index"
        :icon="kpi.icon"
        :stat="kpi.stat"
        :title="kpi.title"
        :gradient="kpi.gradient"
      />
    </div>
  </div>
</template>

<script>
import KPICard from "@/components/UI/KPICard.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { fetchKPIData } from "@/api/homepage.js";

export default {
  name: "HomePage",
  components: {
    KPICard,
    LoadingSpinner,
  },
  data() {
    return {
      isLoading: true,
      kpis: [
        {
          icon: "fas fa-users",
          title: "Total Employees",
          gradient: "linear-gradient(to right, #ff7043, #ff8a65)",
          key: "totalEmployees",
        },
        {
          icon: "fas fa-user-plus",
          title: "New Hires This Month",
          gradient: "linear-gradient(to right, #66bb6a, #81c784)",
          key: "newHiresThisMonth",
        },
        {
          icon: "fas fa-user-times",
          title: "Employees Absent Today",
          gradient: "linear-gradient(to right, #f06292, #f48fb1)",
          key: "employeesAbsentToday",
        },
        {
          icon: "fas fa-smile",
          title: "Employee Satisfaction (Pulse)",
          gradient: "linear-gradient(to right, #64b5f6, #81d4fa)",
          key: "employeeSatisfaction",
        },
        {
          icon: "fas fa-briefcase",
          title: "Open Positions",
          gradient: "linear-gradient(to right, #fdd835, #ffeb3b)",
          key: "openPositions",
        },
        {
          icon: "fas fa-refresh",
          title: "Retention Rate",
          gradient: "linear-gradient(to right, #66bb6a, #81c784)",
          key: "retentionRate",
        },
        {
          icon: "fas fa-dollar-sign",
          title: "Total Monthly Payroll",
          gradient: "linear-gradient(to right, #ffb74d, #ffcc80)",
          key: "totalMonthlyPayroll",
        },
        {
          icon: "fas fa-users-slash",
          title: "Employee Turnover This Month",
          gradient: "linear-gradient(to right, #ff7043, #ff8a65)",
          key: "employeeTurnoverThisMonth",
        },
      ],
    };
  },
  created() {
    fetchKPIData().then((data) => {
      // Update each KPI stat with the corresponding value from the fetched data
      this.kpis = this.kpis.map((kpi) => ({
        ...kpi, // Keep the original KPI properties
        stat: data[kpi.key], // Update the stat with the value from the fetched data
      }));
      this.isLoading = false;
    });
  },
};
</script>

<style scoped>
.kpi-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  flex-wrap: wrap;
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
