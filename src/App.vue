<template>
  <div class="m-container">
    <the-menu-vue />
    <div class="m-content">
      <the-navbar-vue />
      <the-content-vue />
    </div>
  </div>
  <!-- Loading -->
  <m-loading v-if="isLoading" />
</template>

<script>
import { mapState } from "vuex";
import TheContentVue from "./components/layouts/TheContent.vue";
import TheMenuVue from "./components/layouts/TheMenu.vue";
import TheNavbarVue from "./components/layouts/TheNavbar.vue";

export default {
  name: "App",
  components: {
    TheContentVue,
    TheMenuVue,
    TheNavbarVue,
  },
  computed: mapState({
    isLoading: (state) => state.app.isLoading,
  }),
};
</script>

<style>
@import url(@/css/main.css);
</style>
