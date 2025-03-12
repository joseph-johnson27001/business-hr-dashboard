<template>
  <div>
    <LoadingSpinner v-if="isLoading" />
    <div v-else class="payroll-page">
      <!-- KPI Cards Grid -->
      <div class="kpi-grid">
        <KpiCard
          icon="fas fa-dollar-sign"
          :stat="kpiData.totalPayrollMonthly"
          title="Total Payroll (Monthly)"
          color="#4CAF50"
        />
        <KpiCard
          icon="fas fa-wallet"
          :stat="kpiData.totalPayrollYearly"
          title="Total Payroll (Yearly)"
          color="#2196F3"
        />
        <KpiCard
          icon="fas fa-money-bill-wave"
          :stat="kpiData.averageSalaryMonthly"
          title="Average Salary (Monthly)"
          color="#FF9800"
        />
        <KpiCard
          icon="fas fa-chart-line"
          :stat="kpiData.averageSalaryYearly"
          title="Average Salary (Yearly)"
          color="#9C27B0"
        />
        <KpiCard
          icon="fas fa-hourglass-half"
          :stat="kpiData.pendingPayments"
          title="Pending Payments"
          color="#E91E63"
        />
        <KpiCard
          icon="fas fa-exclamation-circle"
          :stat="kpiData.pendingPaymentValue"
          title="Pending Payment Value"
          color="#F44336"
        />
      </div>

      <!-- Payroll Graph -->
      <div class="graphs-container">
        <GraphContainerCard
          title="Payroll"
          @timeframe-changed="onTimeframeChanged"
        >
        </GraphContainerCard>

        <!-- Average Salary Graph -->
        <GraphContainerCard
          title="Average Salary"
          @timeframe-changed="onTimeframeChanged"
        >
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
import { fetchKPIData, fetchTableData } from "@/api/payrollPage";
import LoadingSpinner from "@/components/UI/LoadingSpinner.vue";

export default {
  components: {
    KpiCard,
    GraphContainerCard,
    EmployeePayrollTable,
    InfoCard,
    LoadingSpinner,
  },
  data() {
    return {
      isLoading: true,
      kpiData: {},
      employees: [],
    };
  },
  async mounted() {
    this.isLoading = true;

    // Use Promise.all to fetch both sets of data concurrently
    Promise.all([fetchKPIData(), fetchTableData()])
      .then(([kpiData, employeeData]) => {
        // Set the KPI data
        this.kpiData = kpiData;

        // Set the employee data
        this.employees = employeeData.employees;

        // Set isLoading to false once both data are fetched
        this.isLoading = false;
      })
      .catch((error) => {
        // Handle any errors during the fetch
        console.error("Error fetching data:", error);
        this.isLoading = false;
      });
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

@media (max-width: 600px) {
  .kpi-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
