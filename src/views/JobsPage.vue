<template>
  <div>
    <LoadingSpinner v-if="isLoading" />
    <div v-else class="jobs-page">
      <div class="table-container">
        <InfoCard title="Active Jobs">
          <JobsTable v-if="jobs.length" :jobListings="jobs" />
          <p v-else>No job listings available.</p>
        </InfoCard>
      </div>
    </div>
  </div>
</template>

<script>
import InfoCard from "@/components/UI/InfoCard.vue";
import JobsTable from "@/components/Tables/JobsTable.vue";
import { fetchTableData } from "@/api/jobsPage.js";
import LoadingSpinner from "@/components/UI/LoadingSpinner.vue";

export default {
  components: {
    InfoCard,
    JobsTable,
    LoadingSpinner,
  },
  data() {
    return {
      isLoading: true,
      jobs: [],
    };
  },
  async mounted() {
    this.isLoading = true;
    try {
      const jobsData = await fetchTableData();

      if (!jobsData || !Array.isArray(jobsData.jobListings)) {
        throw new Error("Invalid job data format received");
      }

      this.jobs = [...jobsData.jobListings];

      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error("Error fetching jobs data:", error);
    }
  },
};
</script>

<style scoped>
.jobs-page {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.table-container {
  margin-top: 20px;
}
</style>
