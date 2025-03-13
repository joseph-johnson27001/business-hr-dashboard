<template>
  <div class="attendance-page">
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

      <!-- Additional Attendance Data (e.g., graphs) can go here -->
    </div>
  </div>
</template>

<script>
import KPICard from "@/components/UI/KPICard.vue";
import LoadingSpinner from "@/components/UI/LoadingSpinner.vue";
import { fetchKPIData } from "@/api/attendancePage.js";

export default {
  name: "AttendancePage",
  components: {
    KPICard,
    LoadingSpinner,
  },
  data() {
    return {
      isLoading: true,
      kpis: [
        {
          icon: "fas fa-user-times",
          title: "Absenteeism Rate",
          color: "#f44336",
          key: "absenteeismRate",
        },
        {
          icon: "fas fa-calendar-day",
          title: "Absences Today",
          color: "#ff9800",
          key: "absencesToday",
        },
        {
          icon: "fas fa-calendar-week",
          title: "Absences This Month",
          color: "#ff9800",
          key: "absencesThisMonth",
        },
        {
          icon: "fas fa-clock",
          title: "Late Arrivals Today",
          color: "#03a9f4",
          key: "lateArrivalsToday",
        },
        {
          icon: "fas fa-history",
          title: "Late Arrivals This Month",
          color: "#03a9f4",
          key: "lateArrivalsThisMonth",
        },
        {
          icon: "fas fa-hourglass-half",
          title: "Avg Absence Duration",
          color: "#9c27b0",
          key: "averageAbsenceDuration",
        },
      ],
    };
  },

  created() {
    fetchKPIData().then((kpiData) => {
      this.kpis = this.kpis.map((kpi) => ({
        ...kpi,
        stat: kpiData[kpi.key],
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

@media (max-width: 1400px) {
  .kpi-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 800px) {
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
