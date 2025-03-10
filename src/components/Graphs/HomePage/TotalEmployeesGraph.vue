<template>
  <div class="chart-container">
    <canvas ref="totalEmployeesChart"></canvas>
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
  name: "TotalEmployeesGraph",
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
    data() {
      this.renderChart();
    },
  },
  methods: {
    renderChart() {
      if (this.chartInstance) {
        this.destroyChart();
      }
      if (!this.isMounted || !this.$refs.totalEmployeesChart) return;
      this.chartInstance = new ChartJS(this.$refs.totalEmployeesChart, {
        type: "bar",
        data: {
          labels: this.labels,
          datasets: [
            {
              label: "Number of Employees",
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
            y: { grid: { display: true } },
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
        this.chartInstance.destroy();
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
