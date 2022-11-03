import EmployeeList from "@/views/employees/EmployeeList.vue";
import CustomerList from "@/views/customers/CustomerList.vue";
import DashboardPage from "@/views/dashboard/DashboardPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { 
    path: "/",
    component: DashboardPage
  },
  {
    path: "/employees",
    component: EmployeeList
  },
  { 
    path: "/customers",
    component: CustomerList
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
