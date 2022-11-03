import { createStore } from "vuex";
import app from "./modules/app";
import employee from "./modules/employee";
import department from "./modules/department";

const store = createStore({
  modules: {
    app,
    employee,
    department,
  },
});

export default store;
