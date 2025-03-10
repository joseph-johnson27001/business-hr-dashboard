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
          :gradient="kpi.gradient"
        />
      </div>

      <!-- Graph Cards -->
      <div class="graphs-container">
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

        <!-- Future Graph (Placeholder) -->
        <GraphContainerCard title="Future Graph">
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
import TotalEmployeesGraph from "@/components/Graphs/HomePage/TotalEmployeesGraph.vue";
import SalaryExpenditureGraph from "@/components/Graphs/HomePage/SalaryExpenditureGraph.vue";
import EmployeeSatisfactionGraph from "@/components/Graphs/HomePage/EmployeeSatisfactionGraph.vue";
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
      graphData: {},
      timeframes: {
        "Total Employees": "monthly",
        "Employee Satisfaction": "monthly",
        "Salary Expenditure": "monthly",
      },
    };
  },
  created() {
    // Fetching KPI data and graph data in parallel
    Promise.all([fetchKPIData(), fetchGraphData()]).then(
      ([kpiData, graphData]) => {
        // Assigning KPI stats to their respective KPIs
        this.kpis = this.kpis.map((kpi) => ({
          ...kpi,
          stat: kpiData[kpi.key],
        }));
        // Assigning graph data
        this.graphData = graphData;
        console.log("graph daata", graphData);
        // Set loading state to false once data is fetched
        this.isLoading = false;
      }
    );
  },
  methods: {
    // Handle timeframe changes for each graph
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
