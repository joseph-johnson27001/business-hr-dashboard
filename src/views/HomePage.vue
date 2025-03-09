<template>
  <div class="home-page">
    <LoadingSpinner v-if="isLoading" />

    <!-- KPI Cards -->
    <div v-else>
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

      <!-- Graph Cards -->
      <div class="graphs-container">
        <GraphContainerCard title="Total Employees">
          <!-- Future graph component will go here -->
        </GraphContainerCard>
        <GraphContainerCard title="Absenteeism Trends">
          <!-- Future graph component will go here -->
        </GraphContainerCard>
        <GraphContainerCard title="Hiring vs Attrition Rate">
          <!-- Future graph component will go here -->
        </GraphContainerCard>
        <GraphContainerCard title="Employee Satisfaction">
          <!-- Future graph component will go here -->
        </GraphContainerCard>
      </div>
    </div>
  </div>
</template>

<script>
import KPICard from "@/components/UI/KPICard.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import GraphContainerCard from "@/components/UI/GraphContainerCard.vue";
import { fetchKPIData } from "@/api/homepage.js";

export default {
  name: "HomePage",
  components: {
    KPICard,
    LoadingSpinner,
    GraphContainerCard,
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
          title: "New Hires",
          gradient: "linear-gradient(to right, #66bb6a, #81c784)",
          key: "newHiresThisMonth",
        },
        {
          icon: "fas fa-user-times",
          title: "Employees Absent",
          gradient: "linear-gradient(to right, #f06292, #f48fb1)",
          key: "employeesAbsentToday",
        },
        {
          icon: "fas fa-smile",
          title: "Employee Satisfaction",
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
      ],
    };
  },
  created() {
    fetchKPIData().then((data) => {
      this.kpis = this.kpis.map((kpi) => ({
        ...kpi,
        stat: data[kpi.key],
      }));
      this.isLoading = false;
    });
  },
};
</script>

<style scoped>
.kpi-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
}

.graphs-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 10px;
}

@media (max-width: 1200px) {
  .kpi-container {
    grid-template-columns: repeat(3, 1fr);
  }
  .graphs-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 800px) {
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
