import { DialogAction } from "@/enums";

const state = {
  isShowPopup: false,
  isShowDialog: false,
  isLoading: false,
  contentHeaderTop: 0,
  dialog: {
    type: "success",
    message: "",
    action: DialogAction.DEFAULT,
  },
  isCollapseMenu: false,
};

const mutations = {
  togglePopup(state) {
    state.isShowPopup = !state.isShowPopup;
  },
  toggleDialog(state) {
    state.isShowDialog = !state.isShowDialog;
  },
  toggleLoading(state) {
    state.isLoading = !state.isLoading;
  },
  setDialog(state, payload) {
    state.dialog = payload;
  },
  setContentHeaderTop(state, payload) {
    state.contentHeaderTop = payload;
  },
  toggleCollapse(state) {
    state.isCollapseMenu = !state.isCollapseMenu;
  },
};

const actions = {
  togglePopup(context) {
    context.commit("togglePopup");
  },
  toggleDialog(context) {
    context.commit("toggleDialog");
  },
  setDialog(context, dialog) {
    context.commit("setDialog", dialog);
  },
  setContentHeaderTop(context, top) {
    context.commit("setContentHeaderTop", top);
  },
  toggleLoading(context) {
    context.commit("toggleLoading");
  },
  toggleCollapse(context) {
    context.commit("toggleCollapse");
  },
};

export default {
  state,
  mutations,
  actions,
};
