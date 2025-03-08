<template>
  <div class="home-page">
    <!-- KPI Cards -->
    <div class="kpi-container">
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
import { fetchKPIData } from "@/api/homepage.js"; // Updated import

export default {
  name: "HomePage",
  components: {
    KPICard,
  },
  data() {
    return {
      kpis: [
        {
          icon: "fas fa-users",
          title: "Total Employees",
          gradient: "linear-gradient(to right, #ff7043, #ff8a65)", // Slightly lighter orange
          key: "totalEmployees",
        },
        {
          icon: "fas fa-user-plus",
          title: "New Hires This Month",
          gradient: "linear-gradient(to right, #66bb6a, #81c784)", // Slightly lighter green
          key: "newHiresThisMonth",
        },
        {
          icon: "fas fa-user-times",
          title: "Employees Absent Today",
          gradient: "linear-gradient(to right, #f06292, #f48fb1)", // Slightly lighter pink
          key: "employeesAbsentToday",
        },
        {
          icon: "fas fa-smile",
          title: "Employee Satisfaction (Pulse)",
          gradient: "linear-gradient(to right, #64b5f6, #81d4fa)", // Slightly lighter blue
          key: "employeeSatisfaction",
        },
        {
          icon: "fas fa-briefcase",
          title: "Open Positions",
          gradient: "linear-gradient(to right, #fdd835, #ffeb3b)", // Slightly lighter yellow
          key: "openPositions",
        },
        {
          icon: "fas fa-refresh",
          title: "Retention Rate",
          gradient: "linear-gradient(to right, #66bb6a, #81c784)", // Slightly lighter green
          key: "retentionRate",
        },
        {
          icon: "fas fa-dollar-sign",
          title: "Total Monthly Payroll",
          gradient: "linear-gradient(to right, #ffb74d, #ffcc80)", // Slightly lighter yellow-orange
          key: "totalMonthlyPayroll",
        },
        {
          icon: "fas fa-users-slash",
          title: "Employee Turnover This Month",
          gradient: "linear-gradient(to right, #ff7043, #ff8a65)", // Slightly lighter orange
          key: "employeeTurnoverThisMonth",
        },
      ],
    };
  },
  created() {
    fetchKPIData().then((data) => {
      this.kpis = this.kpis.map((kpi) => ({
        ...kpi,
        stat: data[kpi.key],
      }));
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
