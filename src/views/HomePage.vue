<template>
  <div class="home-page">
    <LoadingSpinner v-if="isLoading" />

    <div v-else>
      <!-- KPI Cards -->
      <div class="kpi-container">
        <KPICard
          v-for="(kpi, index) in kpis"
          :key="index"
          :icon="kpi.icon"
          :stat="kpi.stat"
          :title="kpi.title"
          :color="kpi.color"
        />
      </div>

      <!-- Graph Cards -->
      <div class="graphs-container">
        <!-- Employee Performance Graph -->
        <GraphContainerCard
          title="Employee Performance"
          @timeframe-changed="onTimeframeChanged"
        >
          <EmployeePerformanceGraph
            v-if="graphData.employeePerformance"
            :labels="
              graphData.employeePerformance[timeframes['Employee Performance']]
                .labels
            "
            :data="
              graphData.employeePerformance[timeframes['Employee Performance']]
                .data
            "
          />
        </GraphContainerCard>

        <!-- Employee Satisfaction Graph -->
        <GraphContainerCard
          title="Employee Satisfaction"
          @timeframe-changed="onTimeframeChanged"
        >
          <EmployeeSatisfactionGraph
            v-if="graphData.employeeSatisfaction"
            :labels="
              graphData.employeeSatisfaction[
                timeframes['Employee Satisfaction']
              ].labels
            "
            :data="
              graphData.employeeSatisfaction[
                timeframes['Employee Satisfaction']
              ].data
            "
          />
        </GraphContainerCard>

        <!-- Salary Expenditure Graph -->
        <GraphContainerCard
          title="Salary Expenditure"
          @timeframe-changed="onTimeframeChanged"
        >
          <SalaryExpenditureGraph
            v-if="graphData.salaryExpenditure"
            :labels="
              graphData.salaryExpenditure[timeframes['Salary Expenditure']]
                .labels
            "
            :data="
              graphData.salaryExpenditure[timeframes['Salary Expenditure']].data
            "
          />
        </GraphContainerCard>

        <!-- Total Employees Graph -->
        <GraphContainerCard
          title="Total Employees"
          @timeframe-changed="onTimeframeChanged"
        >
          <TotalEmployeesGraph
            v-if="graphData.totalEmployees"
            :labels="
              graphData.totalEmployees[timeframes['Total Employees']].labels
            "
            :data="graphData.totalEmployees[timeframes['Total Employees']].data"
          />
        </GraphContainerCard>
      </div>
    </div>
  </div>
</template>

<script>
import KPICard from "@/components/UI/KPICard.vue";
import LoadingSpinner from "@/components/UI/LoadingSpinner.vue";
import GraphContainerCard from "@/components/UI/GraphContainerCard.vue";
import TotalEmployeesGraph from "@/components/Graphs/HomePage/TotalEmployeesGraph.vue";
import SalaryExpenditureGraph from "@/components/Graphs/HomePage/SalaryExpenditureGraph.vue";
import EmployeeSatisfactionGraph from "@/components/Graphs/HomePage/EmployeeSatisfactionGraph.vue";
import EmployeePerformanceGraph from "@/components/Graphs/HomePage/EmployeePerformanceGraph.vue";
import { fetchKPIData, fetchGraphData } from "@/api/homePage.js";

export default {
  name: "HomePage",
  components: {
    KPICard,
    LoadingSpinner,
    GraphContainerCard,
    TotalEmployeesGraph,
    EmployeeSatisfactionGraph,
    SalaryExpenditureGraph,
    EmployeePerformanceGraph,
  },
  data() {
    return {
      isLoading: true,
      kpis: [
        {
          icon: "fas fa-users",
          title: "Total Employees",
          color: "#1976d2",
          key: "totalEmployees",
        },
        {
          icon: "fas fa-user-plus",
          title: "New Hires",
          color: "#388e3c",
          key: "newHiresThisMonth",
        },
        {
          icon: "fas fa-user-times",
          title: "Employees Absent",
          color: "#f44336",
          key: "employeesAbsentToday",
        },
        {
          icon: "fas fa-smile",
          title: "Employee Satisfaction",
          color: "#0288d1",
          key: "employeeSatisfaction",
        },
        {
          icon: "fas fa-briefcase",
          title: "Open Positions",
          color: "#fbc02d",
          key: "openPositions",
        },
        {
          icon: "fas fa-refresh",
          title: "Retention Rate",
          color: "#388e3c",
          key: "retentionRate",
        },
      ],
      graphData: {},
      timeframes: {
        "Total Employees": "monthly",
        "Employee Satisfaction": "monthly",
        "Salary Expenditure": "monthly",
        "Employee Performance": "monthly",
      },
    };
  },

  created() {
    Promise.all([fetchKPIData(), fetchGraphData()]).then(
      ([kpiData, graphData]) => {
        this.kpis = this.kpis.map((kpi) => ({
          ...kpi,
          stat: kpiData[kpi.key],
        }));
        this.graphData = graphData;
        this.isLoading = false;
      }
    );
  },

  methods: {
    onTimeframeChanged({ title, selectedOption }) {
      this.timeframes[title] = selectedOption.toLowerCase();
    },
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
