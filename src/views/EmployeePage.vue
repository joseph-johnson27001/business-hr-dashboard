<template>
  <div>
    <LoadingSpinner v-if="isLoading" />

    <div v-else class="employee-page">
      <div class="top-container">
        <!-- Employee Overview -->
        <EmployeeOverviewCard :employee="employee" />
      </div>

      <!-- KPI Section -->
      <div class="kpi-container">
        <KPICard
          icon="fas fa-dollar-sign"
          :stat="'£' + kpiData.monthlySalary"
          title="Monthly Salary"
          color="#4CAF50"
        />
        <KPICard
          icon="fas fa-money-bill-wave"
          :stat="'£' + kpiData.yearlySalary"
          title="Yearly Salary"
          color="#2196F3"
        />
        <KPICard
          icon="fas fa-gift"
          :stat="'£' + kpiData.bonus"
          title="Bonus"
          color="#FF9800"
        />
        <KPICard
          icon="fas fa-calendar"
          :stat="kpiData.yearsAtCompany + ' years'"
          title="Years at Company"
          color="#9C27B0"
        />
        <KPICard
          icon="fas fa-user-clock"
          :stat="kpiData.absenteeismRate + '%'"
          title="Absenteeism Rate"
          color="#E91E63"
        />
        <KPICard
          icon="fas fa-briefcase"
          :stat="kpiData.remainingHolidayDays"
          title="Remaining Holiday Days"
          color="#795548"
        />
      </div>

      <!-- Graph Section -->
      <div class="graphs-container">
        <GraphContainerCard title="Performance"> </GraphContainerCard>
        <GraphContainerCard title="Satisfaction"> </GraphContainerCard>
        <GraphContainerCard title="Absenteeism"> </GraphContainerCard>
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeOverviewCard from "@/components/UI/EmployeeOverviewCard.vue";
import GraphContainerCard from "@/components/UI/GraphContainerCard.vue";
import LoadingSpinner from "@/components/UI/LoadingSpinner.vue";
import KPICard from "@/components/UI/KPICard.vue";

import { fetchEmploymentData, fetchKPIData } from "@/api/employeePage.js";

export default {
  components: {
    EmployeeOverviewCard,
    GraphContainerCard,
    LoadingSpinner,
    KPICard,
  },

  data() {
    return {
      isLoading: true,
      employee: null,
      kpiData: null,
      graphData: {
        performance: { labels: [], data: [] },
        absenteeism: { labels: [], data: [] },
        satisfaction: { labels: [], data: [] },
      },
    };
  },

  async created() {
    try {
      const [employee, kpiData] = await Promise.all([
        fetchEmploymentData(),
        fetchKPIData(),
      ]);
      this.employee = employee;
      this.kpiData = kpiData;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      this.isLoading = false;
    }
  },
};
</script>

<style scoped>
.employee-page {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.top-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

.kpi-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
}

.graphs-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

@media (max-width: 1200px) {
  .kpi-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 800px) {
  .graphs-container {
    grid-template-columns: 1fr;
  }
  .kpi-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .kpi-container {
    grid-template-columns: 1fr;
  }
}
</style>
