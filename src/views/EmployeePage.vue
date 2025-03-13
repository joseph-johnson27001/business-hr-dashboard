<template>
  <div>
    <LoadingSpinner v-if="isLoading" />

    <div v-else class="employee-page">
      <!-- Employee Overview -->
      <EmployeeOverviewCard :employee="employee" />

      <!-- Graph Section -->
      <div class="graphs-container">
        <!-- <GraphContainerCard title="Performance Over Time">
          <EmployeePerformanceGraph
            v-if="graphData.performance"
            :labels="graphData.performance.labels"
            :data="graphData.performance.data"
          />
        </GraphContainerCard>

        <GraphContainerCard title="Absenteeism Rate">
          <AbsenteeismGraph
            v-if="graphData.absenteeism"
            :labels="graphData.absenteeism.labels"
            :data="graphData.absenteeism.data"
          />
        </GraphContainerCard>

        <GraphContainerCard title="Satisfaction Over Time">
          <EmployeeSatisfactionGraph
            v-if="graphData.satisfaction"
            :labels="graphData.satisfaction.labels"
            :data="graphData.satisfaction.data"
          />
        </GraphContainerCard> -->
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeOverviewCard from "@/components/UI/EmployeeOverviewCard.vue";
// import GraphContainerCard from "@/components/UI/GraphContainerCard.vue";
// import EmployeePerformanceGraph from "@/components/Graphs/EmployeePage/EmployeePerformanceGraph.vue";
// import AbsenteeismGraph from "@/components/Graphs/EmployeePage/AbsenteeismGraph.vue";
// import EmployeeSatisfactionGraph from "@/components/Graphs/EmployeePage/EmployeeSatisfactionGraph.vue";
import LoadingSpinner from "@/components/UI/LoadingSpinner.vue";

export default {
  components: {
    EmployeeOverviewCard,
    // GraphContainerCard,
    // EmployeePerformanceGraph,
    // AbsenteeismGraph,
    // EmployeeSatisfactionGraph,
    LoadingSpinner,
  },

  data() {
    return {
      isLoading: true,
      employee: {
        name: "John Doe",
        position: "Software Engineer",
        status: "Active",
        location: "New York",
        birthday: "1992-07-15",
        photo: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      graphData: {
        performance: { labels: [], data: [] },
        absenteeism: { labels: [], data: [] },
        satisfaction: { labels: [], data: [] },
      },
    };
  },

  created() {
    setTimeout(() => {
      this.isLoading = false;
    }, 250);
  },
};
</script>

<style scoped>
.employee-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.graphs-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

@media (max-width: 800px) {
  .graphs-container {
    grid-template-columns: 1fr;
  }
}
</style>
