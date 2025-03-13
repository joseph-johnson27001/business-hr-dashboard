<template>
  <div class="chart-container">
    <canvas ref="lateAttendanceChart"></canvas>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineController,
} from "chart.js";
import { toRaw } from "vue";

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "LateAttendanceGraph",
  props: {
    labels: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chartInstance: null,
      isMounted: false,
    };
  },
  mounted() {
    this.isMounted = true;
    this.$nextTick(() => {
      this.renderChart();
    });
  },
  beforeUnmount() {
    this.isMounted = false;
    this.destroyChart();
  },
  watch: {
    data: {
      handler() {
        toRaw(this.chartInstance).destroy();
        this.renderChart();
      },
    },
  },
  methods: {
    renderChart(newData) {
      this.destroyChart();
      this.chartInstance = new ChartJS(this.$refs.lateAttendanceChart, {
        type: "line",
        data: {
          labels: this.labels,
          datasets: [
            {
              label: "Late Attendance",
              data: newData || this.data,
              fill: false,
              borderColor: "#ff7043",
              tension: 0.3,
              borderWidth: 2,
              pointBackgroundColor: "#ff7043",
              pointBorderColor: "#fff",
              pointBorderWidth: 2,
              pointRadius: 5,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { grid: { display: false } },
            y: {
              grid: { display: true },
              ticks: {
                callback: function (value) {
                  return value;
                },
              },
            },
          },
          plugins: {
            title: { display: false },
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => `${tooltipItem.raw} Late`,
              },
            },
          },
        },
      });
    },
    destroyChart() {
      if (this.chartInstance) {
        toRaw(this.chartInstance).destroy();
      }
    },
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  min-height: 250px;
  max-height: 300px;
}
canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>
