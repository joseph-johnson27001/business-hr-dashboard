<template>
  <div class="chart-container">
    <canvas ref="salaryExpenditureChart"></canvas>
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
  name: "SalaryExpenditureGraph",
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
      this.chartInstance = new ChartJS(this.$refs.salaryExpenditureChart, {
        type: "line",
        data: {
          labels: this.labels,
          datasets: [
            {
              label: "Employee Net Promoter Score",
              data: newData || this.data,
              fill: false,
              borderColor: "#66bb6a",
              tension: 0.2,
              borderWidth: 2,
              pointBackgroundColor: "#66bb6a",
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
            },
          },
          plugins: {
            title: { display: false },
            legend: { display: false },
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
