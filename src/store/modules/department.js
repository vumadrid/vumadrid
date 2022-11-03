import { constants } from "@/config";
import axios from "axios";

const state = {
  departments: [],
};

const mutations = {
  getDepartments(state, payload) {
    state.departments = payload;
  },
};

const actions = {
  async getDepartments(context) {
    try {
      const res = await axios.get(`${constants.API_URL}/Departments`);
      context.commit("getDepartments", res.data);
    } catch (error) {
      console.log(error);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
