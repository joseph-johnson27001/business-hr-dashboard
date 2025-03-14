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
      <div class="graph-container">
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

        <!-- Employee Net Promoter Score Graph -->
        <GraphContainerCard
          title="Employee Net Promoter Score"
          @timeframe-changed="onTimeframeChanged"
        >
          <EmployeeNetPromoterScoreGraph
            v-if="graphData.employeeNetPromoterScore"
            :labels="
              graphData.employeeNetPromoterScore[
                timeframes['Employee Net Promoter Score']
              ]?.labels
            "
            :data="
              graphData.employeeNetPromoterScore[
                timeframes['Employee Net Promoter Score']
              ]?.data
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
      </div>
    </div>
  </div>
</template>

<script>
import InfoCard from "@/components/UI/InfoCard.vue";
import TotalEmployeesGraph from "@/components/Graphs/EmployeesPage/TotalEmployeesGraph.vue";
import EmployeePerformanceGraph from "@/components/Graphs/EmployeesPage/EmployeePerformanceGraph.vue";
import EmployeeSatisfactionGraph from "@/components/Graphs/EmployeesPage/EmployeeSatisfactionGraph.vue";
import GraphContainerCard from "@/components/UI/GraphContainerCard.vue";
import EmployeeNetPromoterScoreGraph from "@/components/Graphs/EmployeesPage/EmployeeNetPromoterScoreGraph.vue";
import EmployeeTable from "@/components/Tables/EmployeeTable.vue";
import {
  fetchTableData,
  fetchEmployeeKPIs,
  fetchGraphData,
} from "@/api/employeesPage.js";
import LoadingSpinner from "@/components/UI/LoadingSpinner.vue";
import KPICard from "@/components/UI/KPICard.vue";

export default {
  components: {
    InfoCard,
    EmployeeTable,
    LoadingSpinner,
    KPICard,
    GraphContainerCard,
    TotalEmployeesGraph,
    EmployeeNetPromoterScoreGraph,
    EmployeeSatisfactionGraph,
    EmployeePerformanceGraph,
  },

  created() {
    Promise.all([fetchTableData(), fetchEmployeeKPIs(), fetchGraphData()])
      .then(([employeeData, kpiData, graphData]) => {
        this.employees = employeeData.employees;
        this.employeeKPIs = this.employeeKPIs.map((kpi, index) => ({
          ...kpi,
          stat: kpiData[index]?.stat || 0,
        }));
        this.graphData = graphData;
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
      timeframes: {
        "Total Employees": "monthly",
        "Employee Net Promoter Score": "monthly",
        "Employee Satisfaction": "monthly",
        "Employee Performance": "monthly",
      },
      employees: [],
      graphData: {},
      employeeNetPromoterScoreData: {},
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
          color: "#ff5722",
          stat: 0,
        },
        {
          title: "Gender Ratio",
          icon: "fas fa-restroom",
          color: "#fbc02d",
          stat: "0",
        },
      ],
    };
  },

  methods: {
    onTimeframeChanged({ title, selectedOption }) {
      this.timeframes[title] = selectedOption.toLowerCase();
    },
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

.graph-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 10px;
  gap: 10px;
}

@media (max-width: 1200px) {
  .kpi-container {
    grid-template-columns: repeat(2, 1fr);
  }
  .graph-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 500px) {
  .kpi-container {
    grid-template-columns: 1fr;
  }
}
</style>
