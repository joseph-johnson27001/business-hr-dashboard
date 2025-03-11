import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/HomePage.vue";
import Employees from "@/views/EmployeesPage.vue";
import Payroll from "@/views/PayrollPage.vue";
import Attendance from "@/views/AttendancePage.vue";
import Employee from "@/views/EmployeePage.vue";

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
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
