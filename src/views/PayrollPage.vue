<template>
  <div>
    <LoadingSpinner v-if="isLoading" />
    <div v-else class="payroll-page">
      <!-- KPI Cards Grid -->
      <div class="kpi-grid">
        <KpiCard
          v-for="(kpi, index) in kpiData"
          :key="index"
          :icon="kpi.icon"
          :stat="kpi.stat"
          :title="kpi.title"
          :color="kpi.color"
        />
      </div>

      <!-- Payroll Graph -->
      <div class="graphs-container">
        <!-- Total Payroll Graph -->
        <GraphContainerCard
          title="Total Payroll"
          @timeframe-changed="onTimeframeChanged"
        >
          <PayrollGraph
            v-if="graphData.totalPayroll"
            :labels="graphData.totalPayroll[timeframes['Total Payroll']].labels"
            :data="graphData.totalPayroll[timeframes['Total Payroll']].data"
          />
        </GraphContainerCard>

        <!-- Average Salary Graph -->
        <GraphContainerCard
          title="Average Salary"
          @timeframe-changed="onTimeframeChanged"
        >
          <AveragesalaryGraph
            v-if="graphData.salaryExpenditure"
            :labels="
              graphData.salaryExpenditure[timeframes['Average Salary']].labels
            "
            :data="
              graphData.salaryExpenditure[timeframes['Average Salary']].data
            "
          />
        </GraphContainerCard>
      </div>

      <div class="table-container">
        <InfoCard title="Employees">
          <EmployeePayrollTable :employees="employees" />
        </InfoCard>
      </div>
    </div>
  </div>
</template>

<script>
import KpiCard from "@/components/UI/KPICard.vue";
import GraphContainerCard from "@/components/UI/GraphContainerCard.vue";
import EmployeePayrollTable from "@/components/Tables/EmployeePayrollTable.vue";
import InfoCard from "@/components/UI/InfoCard.vue";
import {
  fetchKPIData,
  fetchTableData,
  fetchGraphData,
} from "@/api/payrollPage";
import LoadingSpinner from "@/components/UI/LoadingSpinner.vue";
import PayrollGraph from "@/components/Graphs/PayrollPage/PayrollGraph.vue";
import AveragesalaryGraph from "@/components/Graphs/PayrollPage/AverageSalaryGraph.vue";

export default {
  components: {
    KpiCard,
    GraphContainerCard,
    EmployeePayrollTable,
    InfoCard,
    LoadingSpinner,
    PayrollGraph,
    AveragesalaryGraph,
  },
  data() {
    return {
      isLoading: true,
      kpiData: [],
      employees: [],
      graphData: {},
      timeframes: {
        "Total Payroll": "monthly",
        "Average Salary": "monthly",
      },
    };
  },
  async mounted() {
    this.isLoading = true;
    try {
      const [kpiData, employeeData, graphData] = await Promise.all([
        fetchKPIData(),
        fetchTableData(),
        fetchGraphData(),
      ]);

      this.kpiData = [
        {
          icon: "fas fa-dollar-sign",
          title: "Total Payroll (Monthly)",
          color: "#4CAF50",
          stat: kpiData.totalPayrollMonthly || 0,
        },
        {
          icon: "fas fa-wallet",
          title: "Total Payroll (Yearly)",
          color: "#2196F3",
          stat: kpiData.totalPayrollYearly || 0,
        },
        {
          icon: "fas fa-money-bill-wave",
          title: "Average Salary (Monthly)",
          color: "#FF9800",
          stat: kpiData.averageSalaryMonthly || 0,
        },
        {
          icon: "fas fa-chart-line",
          title: "Average Salary (Yearly)",
          color: "#9C27B0",
          stat: kpiData.averageSalaryYearly || 0,
        },
        {
          icon: "fas fa-hourglass-half",
          title: "Pending Payments",
          color: "#E91E63",
          stat: kpiData.pendingPayments || 0,
        },
        {
          icon: "fas fa-exclamation-circle",
          title: "Pending Payment Value",
          color: "#F44336",
          stat: kpiData.pendingPaymentValue || 0,
        },
      ];
      this.employees = employeeData.employees;
      this.graphData = graphData;
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error("Error fetching data:", error);
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
.payroll-page {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
}

.graphs-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

/* Responsive Layout */
@media (max-width: 1400px) {
  .kpi-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 1200px) {
  .graphs-container {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 768px) {
  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 400px) {
  .kpi-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
