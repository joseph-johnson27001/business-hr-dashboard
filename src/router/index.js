import { createRouter, createWebHashHistory } from "vue-router";

import Home from "@/views/HomePage.vue";
import Employees from "@/views/EmployeesPage.vue";
import Payroll from "@/views/PayrollPage.vue";
import Attendance from "@/views/AttendancePage.vue";
import Employee from "@/views/EmployeePage.vue";
import Jobs from "@/views/JobsPage.vue";

// Define the routes
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/employees",
    name: "Employees",
    component: Employees,
  },
  {
    path: "/payroll",
    name: "Payroll",
    component: Payroll,
  },
  {
    path: "/attendance",
    name: "Attendance",
    component: Attendance,
  },
  {
    path: "/employee",
    name: "Employee",
    component: Employee,
  },
  {
    path: "/jobs",
    name: "Jobs",
    component: Jobs,
  },
];
const router = createRouter({
  history: createWebHashHistory(), // This switches to hash mode
  routes,
});

export default router;
