<template>
  <div>
    <LoadingSpinner v-if="isLoading" />

    <div v-else class="employee-page">
      <div class="top-container">
        <!-- Employee Overview -->
        <EmployeeOverviewCard :employee="employee" />

        <!-- KPI Cards -->
        <KPICard
          icon="fas fa-phone"
          :stat="kpiData.contact.phone"
          title="Phone"
          color="#4CAF50"
          style="margin-top: auto"
        />
        <KPICard
          icon="fa fa-envelope"
          :stat="kpiData.contact.email"
          title="Email"
          color="#2196F3"
          style="margin-top: auto"
        />
        <KPICard
          icon="fas fa-chart-line"
          :stat="kpiData.performanceScores['2024-Q4'] + '%'"
          title="Performance Score"
          color="#FF9800"
          style="margin-top: auto"
        />
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
        <GraphContainerCard
          title="Performance"
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

        <GraphContainerCard
          title="Satisfaction"
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
        <GraphContainerCard
          title="Total Absences"
          @timeframe-changed="onTimeframeChanged"
        >
          <TotalAbsencesGraph
            v-if="graphData.totalAbsences"
            :labels="
              graphData.totalAbsences[timeframes['Total Absences']].labels
            "
            :data="graphData.totalAbsences[timeframes['Total Absences']].data"
          />
        </GraphContainerCard>

        <!-- <GraphContainerCard
          title="Absenteeism"
          @timeframe-changed="onTimeframeChanged"
        >
          <TotalAbsencesGraph
            v-if="graphData.absenteeism"
            :labels="graphData.absenteeism[timeframes.absenteeism].labels"
            :data="graphData.absenteeism[timeframes.absenteeism].data"
          />
        </GraphContainerCard>

 
        <GraphContainerCard
          title="Payroll"
          @timeframe-changed="onTimeframeChanged"
        >
          <PayrollGraph
            v-if="graphData.payroll"
            :labels="graphData.payroll[timeframes.payroll].labels"
            :data="graphData.payroll[timeframes.payroll].data"
          />
        </GraphContainerCard>  -->
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeOverviewCard from "@/components/UI/EmployeeOverviewCard.vue";
import GraphContainerCard from "@/components/UI/GraphContainerCard.vue";
import LoadingSpinner from "@/components/UI/LoadingSpinner.vue";
import KPICard from "@/components/UI/KPICard.vue";

import EmployeePerformanceGraph from "@/components/Graphs/EmployeePage/EmployeePerformanceGraph.vue";
import EmployeeSatisfactionGraph from "@/components/Graphs/EmployeePage/EmployeeSatisfactionGraph.vue";
import TotalAbsencesGraph from "@/components/Graphs/EmployeePage/TotalAbsencesGraph.vue";
// import PayrollGraph from "@/components/Graphs/EmployeePage/PayrollGraph.vue";

import {
  fetchEmploymentData,
  fetchKPIData,
  fetchGraphData,
} from "@/api/employeePage.js";

export default {
  components: {
    EmployeeOverviewCard,
    GraphContainerCard,
    LoadingSpinner,
    KPICard,
    EmployeePerformanceGraph,
    EmployeeSatisfactionGraph,
    TotalAbsencesGraph,
    // PayrollGraph,
  },

  data() {
    return {
      isLoading: true,
      employee: null,
      kpiData: null,
      graphData: {},
      timeframes: {
        "Employee Satisfaction": "monthly",
        "Total Absences": "monthly",
        "Employee Performance": "monthly",
      },
    };
  },

  async created() {
    try {
      const [employee, kpiData, graphData] = await Promise.all([
        fetchEmploymentData(),
        fetchKPIData(),
        fetchGraphData(),
      ]);
      this.employee = employee;
      this.kpiData = kpiData;
      this.graphData = graphData;

      // Log the graph data to check its structure
      console.log("Graph Data:", this.graphData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      this.isLoading = false;
    }
  },

  methods: {
    onTimeframeChanged({ title, selectedOption }) {
      this.timeframes[title] = selectedOption.toLowerCase();
    },
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
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
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
