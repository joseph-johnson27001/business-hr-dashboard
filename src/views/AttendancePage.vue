<template>
  <div class="attendance-page">
    <LoadingSpinner v-if="isLoading" />

    <div v-else class="main-content">
      <!-- KPI Cards Section -->
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

      <!-- Attendance Table inside InfoCard -->
      <div class="table-container">
        <InfoCard title="Attendance Records">
          <AttendanceTable :attendanceRecords="attendanceRecords" />
        </InfoCard>
      </div>

      <div class="graphs-container">
        <!-- Total Absences Graph -->
        <GraphContainerCard
          title="Late Attendance"
          @timeframe-changed="onTimeframeChanged"
        >
          <TotalAbsencesGraph
            v-if="graphData.lateAttendance"
            :labels="
              graphData.lateAttendance[timeframes['Late Attendance']].labels
            "
            :data="graphData.lateAttendance[timeframes['Late Attendance']].data"
          />
        </GraphContainerCard>
      </div>
    </div>
  </div>
</template>

<script>
import KPICard from "@/components/UI/KPICard.vue";
import LoadingSpinner from "@/components/UI/LoadingSpinner.vue";
import AttendanceTable from "@/components/Tables/AttendanceTable.vue";
import InfoCard from "@/components/UI/InfoCard.vue";
import GraphContainerCard from "@/components/UI/GraphContainerCard.vue";
import TotalAbsencesGraph from "@/components/Graphs/AttendancePage/TotalAbsencesGraph.vue";

import {
  fetchKPIData,
  fetchTableData,
  fetchGraphData,
} from "@/api/attendancePage.js";

export default {
  name: "AttendancePage",
  components: {
    KPICard,
    LoadingSpinner,
    AttendanceTable,
    InfoCard,
    GraphContainerCard,
    TotalAbsencesGraph,
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
      attendanceRecords: [],
      timeframes: {
        "Late Attendance": "monthly",
      },
    };
  },
  methods: {
    onTimeframeChanged({ title, selectedOption }) {
      this.timeframes[title] = selectedOption.toLowerCase();
    },
  },

  created() {
    Promise.all([fetchKPIData(), fetchTableData(), fetchGraphData()])
      .then(([kpiData, tableData, graphData]) => {
        this.kpis = this.kpis.map((kpi) => ({
          ...kpi,
          stat: kpiData[kpi.key],
        }));
        this.attendanceRecords = tableData.attendanceRecords;
        this.graphData = graphData;
        console.log(this.graphData);
      })
      .finally(() => {
        this.isLoading = false;
      });
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
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
}

.table-container {
  margin-top: 10px;
}

.graphs-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 10px;
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
