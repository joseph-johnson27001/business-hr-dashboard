<template>
  <div class="payroll-page">
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
</template>

<script>
import KpiCard from "@/components/UI/KPICard.vue";
import GraphContainerCard from "@/components/UI/GraphContainerCard.vue";
import EmployeePayrollTable from "@/components/Tables/EmployeePayrollTable.vue";
import InfoCard from "@/components/UI/InfoCard.vue";
import { fetchKPIData, fetchTableData } from "@/api/payrollPage";

export default {
  components: {
    KpiCard,
    GraphContainerCard,
    EmployeePayrollTable,
    InfoCard,
  },
  data() {
    return {
      kpiData: {},
      employees: [],
    };
  },
  async mounted() {
    this.kpiData = await fetchKPIData();
    this.employeeData = await fetchTableData();
    this.employees = this.employeeData.employees;
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
