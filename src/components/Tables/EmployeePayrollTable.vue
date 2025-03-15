<template>
  <div>
    <!-- Search Bar and Department Filter -->
    <div class="table-controls">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search"
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

    <!-- Payroll Table (Hidden on Mobile) -->
    <div v-if="!isMobile" class="table-wrapper">
      <div v-if="searchQuery.length !== 0 && filteredEmployees.length == 0">
        <p>No matches available</p>
      </div>
      <table class="payroll-table" v-else>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Bonus</th>
            <th>Deductions</th>
            <th>Net Pay</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="employee in paginatedEmployees"
            :key="employee.id"
            @click="navigateToUser"
          >
            <td>
              <div class="employee-name-container">
                <img
                  :src="employee.photoUrl"
                  alt="Profile Photo"
                  class="profile-photo"
                />
                {{ employee.name }}
              </div>
            </td>
            <td>{{ employee.department }}</td>
            <td>${{ formatNumber(employee.salary) }}</td>
            <td>${{ formatNumber(employee.bonus) }}</td>
            <td>${{ formatNumber(employee.deductions) }}</td>
            <td class="net-pay">${{ formatNumber(employee.netPay) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Stacked Cards Layout (Visible on Mobile) -->
    <div v-if="isMobile" class="employee-cards">
      <div
        v-for="employee in paginatedEmployees"
        :key="employee.id"
        class="employee-card"
        @click="navigateToUser"
      >
        <div class="card-header">
          <img
            :src="employee.photoUrl"
            alt="Profile Photo"
            class="profile-photo"
          />
          <span class="employee-name">{{ employee.name }}</span>
        </div>
        <p>
          <span class="employee-stat">Department:</span>
          {{ employee.department }}
        </p>
        <p>
          <span class="employee-stat">Salary:</span> ${{
            formatNumber(employee.salary)
          }}
        </p>
        <p>
          <span class="employee-stat">Bonus:</span> ${{
            formatNumber(employee.bonus)
          }}
        </p>
        <p>
          <span class="employee-stat">Deductions:</span> ${{
            formatNumber(employee.deductions)
          }}
        </p>
        <p class="net-pay">
          <span class="employee-stat">Net Pay:</span> ${{
            formatNumber(employee.netPay)
          }}
        </p>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="pagination-controls">
      <span v-for="page in totalPages" :key="page" class="page-number">
        <button
          :class="{ active: currentPage === page }"
          @click="changePage(page)"
        >
          {{ page }}
        </button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    employees: Array,
  },
  data() {
    return {
      searchQuery: "",
      selectedDepartment: "",
      currentPage: 1,
      itemsPerPage: 5,
      isMobile: window.innerWidth < 768,
    };
  },
  computed: {
    departments() {
      const departmentSet = new Set(
        this.employees.map((employee) => employee.department)
      );
      return Array.from(departmentSet);
    },
    filteredEmployees() {
      return this.employees.filter((employee) => {
        const matchesSearch =
          employee.name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          employee.department
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase());

        const matchesDepartment = this.selectedDepartment
          ? employee.department === this.selectedDepartment
          : true;

        return matchesSearch && matchesDepartment;
      });
    },
    totalPages() {
      return Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
    },
    paginatedEmployees() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredEmployees.slice(start, end);
    },
  },
  methods: {
    navigateToUser() {
      this.$router.push(`/employee`);
    },
    formatNumber(value) {
      return value.toLocaleString();
    },
    changePage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
    },
    checkScreenSize() {
      this.isMobile = window.innerWidth < 768;
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
/* Table Styles */
.table-wrapper {
  overflow-x: auto;
  max-width: 100%;
}

.payroll-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
  font-size: 14px;
  font-family: "Assistant", sans-serif;
}

.payroll-table th,
.payroll-table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.payroll-table th {
  background-color: #1976d2;
  color: white;
  font-weight: 400;
}

.payroll-table tbody tr:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}

/* Card Styles */
.employee-cards {
  display: grid;
  flex-direction: column;
  border-top: 1px solid #ddd;
  grid-template-columns: 1fr;
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

.employee-card {
  background: white;
  padding: 20px 10px;
  border-bottom: 1px solid #ddd;
  font-family: "Assistant", sans-serif;
}

.employee-card:hover {
  cursor: pointer;
  background-color: #f5f5f5;
}

.employee-stat {
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
.status-active {
  color: green;
}

.status-on-leave {
  color: orange;
}

.table-controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  gap: 10px;
}

.employee-name-container {
  display: flex;
  align-items: center;
}

.employee-name {
  font-weight: 400;
  color: #000;
  font-family: "Inter", sans-serif;
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
