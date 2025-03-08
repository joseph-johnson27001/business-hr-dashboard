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
          stat: 1200,
          title: "Total Employees",
          gradient: "linear-gradient(to right, #ff7043, #ff8a65)",
        },
        {
          icon: "fas fa-user-plus",
          stat: 15,
          title: "New Hires This Month",
          gradient: "linear-gradient(to right, #66bb6a, #81c784)",
        },
        {
          icon: "fas fa-user-times",
          stat: 8,
          title: "Employees Absent Today",
          gradient: "linear-gradient(to right, #f06292, #f48fb1)",
        },
        {
          icon: "fas fa-smile",
          stat: "85%",
          title: "Employee Satisfaction (Pulse)",
          gradient: "linear-gradient(to right, #64b5f6, #81d4fa)",
        },
        {
          icon: "fas fa-briefcase",
          stat: 7,
          title: "Open Positions",
          gradient: "linear-gradient(to right, #fdd835, #ffeb3b)",
        },
        {
          icon: "fas fa-sync-alt",
          stat: "90%",
          title: "Retention Rate",
          gradient: "linear-gradient(to right, #81c784, #a5d6a7)",
        },
        {
          icon: "fas fa-dollar-sign",
          stat: "$500,000",
          title: "Total Monthly Payroll",
          gradient: "linear-gradient(to right, #ffb74d, #ffcc80)",
        },
        {
          icon: "fas fa-user-minus",
          stat: 5,
          title: "Employee Turnover This Month",
          gradient: "linear-gradient(to right, #e57373, #f44336)",
        },
      ],
    };
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
