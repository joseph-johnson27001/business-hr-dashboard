<template>
  <div class="payroll-page">
    <!-- KPI Cards Grid -->
    <div class="kpi-grid">
      <KpiCard
        icon="fas fa-dollar-sign"
        stat="$250,000"
        title="Total Payroll (Monthly)"
        color="#4CAF50"
      />
      <KpiCard
        icon="fas fa-wallet"
        stat="$3,000,000"
        title="Total Payroll (Yearly)"
        color="#2196F3"
      />
      <KpiCard
        icon="fas fa-money-bill-wave"
        stat="$5,200"
        title="Average Salary (Monthly)"
        color="#FF9800"
      />
      <KpiCard
        icon="fas fa-chart-line"
        stat="$62,400"
        title="Average Salary (Yearly)"
        color="#9C27B0"
      />
      <KpiCard
        icon="fas fa-hourglass-half"
        stat="12"
        title="Pending Payments"
        color="#E91E63"
      />
      <KpiCard
        icon="fas fa-exclamation-circle"
        stat="$24,000"
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

export default {
  components: {
    KpiCard,
    GraphContainerCard,
    EmployeePayrollTable,
    InfoCard,
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
