import { createRouter, createWebHistory } from "vue-router";

// Import your page components
import Home from "@/views/HomePage.vue";
import Employees from "@/views/EmployeesPage.vue";
import Payroll from "@/views/PayrollPage.vue";
import Attendance from "@/views/AttendancePage.vue";

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
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
