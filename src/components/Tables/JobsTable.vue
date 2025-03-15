<template>
  <div>
    <!-- Search and Department Filter -->
    <div class="table-controls">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search jobs..."
        class="search-input"
      />
      <select v-model="selectedDepartment" class="department-filter">
        <option value="">All Departments</option>
        <option
          v-for="department in departments"
          :key="department"
          :value="department"
        >
          {{ department }}
        </option>
      </select>
    </div>

    <!-- Job Listings Table (Hidden on Mobile) -->
    <div v-if="!isMobile" class="table-wrapper">
      <div v-if="searchQuery.length !== 0 && filteredJobs.length == 0">
        <p>No matching jobs found</p>
      </div>
      <table v-else class="jobs-table">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Department</th>
            <th>Location</th>
            <th>Employment Type</th>
            <th>Posted Date</th>
            <th>Application Deadline</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="job in paginatedJobs" :key="job.id">
            <td>{{ job.title }}</td>
            <td>{{ job.department }}</td>
            <td>{{ job.location }}</td>
            <td>{{ job.type }}</td>
            <td>{{ formatDate(job.postedDate) }}</td>
            <td>{{ formatDate(job.deadline) }}</td>
            <td>
              <span
                :class="{
                  'open-status': job.status === 'Open',
                  'closed-status': job.status === 'Closed',
                }"
              >
                {{ job.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Stacked Cards Layout (Visible on Mobile) -->
    <div v-if="isMobile" class="job-cards">
      <div v-for="job in paginatedJobs" :key="job.id" class="job-card">
        <div
          class="job-status-mobile"
          :class="{
            'open-status': job.status === 'Open',
            'closed-status': job.status === 'Closed',
          }"
        >
          {{ job.status }}
        </div>

        <h3 class="job-title">{{ job.title }}</h3>
        <p><span class="job-stat">Department:</span> {{ job.department }}</p>
        <p><span class="job-stat">Location:</span> {{ job.location }}</p>
        <p><span class="job-stat">Type:</span> {{ job.type }}</p>
        <p>
          <span class="job-stat">Posted:</span> {{ formatDate(job.postedDate) }}
        </p>
        <p>
          <span class="job-stat">Deadline:</span> {{ formatDate(job.deadline) }}
        </p>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="pagination-controls">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page)"
        :class="{ active: currentPage === page }"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    jobListings: Array,
  },
  data() {
    return {
      searchQuery: "",
      selectedDepartment: "",
      currentPage: 1,
      itemsPerPage: 10,
      isMobile: window.innerWidth < 768,
    };
  },
  computed: {
    departments() {
      return [...new Set(this.jobListings.map((job) => job.department))];
    },
    filteredJobs() {
      return this.jobListings.filter((job) => {
        const query = this.searchQuery.toLowerCase();
        const matchesSearch =
          job.title.toLowerCase().includes(query) ||
          job.department.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query);

        const matchesDepartment = this.selectedDepartment
          ? job.department === this.selectedDepartment
          : true;

        return matchesSearch && matchesDepartment;
      });
    },
    totalPages() {
      return Math.ceil(this.filteredJobs.length / this.itemsPerPage);
    },
    paginatedJobs() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredJobs.slice(start, start + this.itemsPerPage);
    },
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    changePage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
    },
    checkScreenSize() {
      this.isMobile = window.innerWidth < 900;
    },
  },
  mounted() {
    window.addEventListener("resize", this.checkScreenSize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
};
</script>

<style scoped>
.table-wrapper {
  overflow-x: auto;
  max-width: 100%;
}

.jobs-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
  font-size: 14px;
  font-family: "Assistant", sans-serif;
}

.jobs-table th,
.jobs-table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.jobs-table th {
  background-color: #1976d2;
  color: white;
  font-weight: 400;
}

.jobs-table tbody tr:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}

/* Card Styles */
.job-cards {
  display: grid;
  flex-direction: column;
  border-top: 1px solid #ddd;
  grid-template-columns: 1fr;
}

.job-title {
  font-weight: 400;
  color: #000;
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: "Inter", sans-serif;
}

.job-stat {
  color: #0a4d86;
  font-weight: 600;
}

.search-input {
  height: 25px;
  width: 100%;
  padding: 5px 10px;
  border: 1px solid #bbb;
  border-radius: 4px;
  font-size: 14px;
  background-color: #fefefe;
  font-family: "Assistant";
  outline: none;
}

.search-input:focus {
  outline: none;
  border-color: #01a9f2;
}

.department-filter {
  font-family: "Assistant" !important;
  border: 1px solid #bbb;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  background-color: #fff;
  cursor: pointer;
  outline: none;
}

.job-card {
  background: white;
  padding: 15px 10px;
  border-bottom: 1px solid #ddd;
  font-family: "Assistant", sans-serif;
  position: relative;
}

.job-status-mobile {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  font-weight: 600;
  font-size: 12px;
  border-radius: 5px;
  color: white;
}

.job-status-mobile.open-status {
  background-color: green;
  color: white;
}

.job-status-mobile.closed-status {
  background-color: orange;
  color: white;
}

.job-card:hover {
  cursor: pointer;
  background-color: #f5f5f5;
}

.job-status {
  color: #0a4d86;
}

.card-header {
  display: flex;
  align-items: center;
  font-size: 1.1rem;
}

.profile-photo {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 5px;
}

/* Utility Styles */
.open-status {
  color: green;
}

.closed-status {
  color: orange;
}

.table-controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  gap: 10px;
}

.jobs-name-container {
  display: flex;
  align-items: center;
}

/* Pagination */
.pagination-controls {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.pagination-controls .page-number {
  margin-left: 5px;
}

.pagination-controls button {
  padding: 5px 10px;
  background-color: #fff;
  color: #006ba6;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pagination-controls button.active {
  background-color: #006ba6;
  color: #fff;
}

.pagination-controls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

@media (max-width: 700px) {
  .table-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .search-input {
    width: auto;
  }
}
</style>
