<template>
  <div class="chart-container">
    <canvas ref="totalPayrollChart"></canvas>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarController,
} from "chart.js";
import { toRaw } from "vue";

ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "TotalPayrollGraph",
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
    renderChart() {
      if (this.chartInstance) {
        this.destroyChart();
      }
      if (!this.isMounted || !this.$refs.totalPayrollChart) return;
      this.chartInstance = new ChartJS(this.$refs.totalPayrollChart, {
        type: "bar",
        data: {
          labels: this.labels,
          datasets: [
            {
              label: "Total Payroll",
              data: this.data,
              backgroundColor: "rgb(204,231,246)",
              borderColor: "rgba(2, 136, 209)",
              borderWidth: 1,
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
                  return "£" + value.toLocaleString();
                },
              },
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
      if (this.chartInstance && this.isMounted) {
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
