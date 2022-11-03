<template>
  <div class="m-navbar">
    <div class="m-navbar-left">
      <div
        class="m-navbar-icon m-icon-24 m-icon-three-stripes"
        v-if="!isCollapseMenu"
        @click="toggleCollapse"
      ></div>
      <div class="m-navbar-branch">
        <div class="m-branch-name">
          CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUI PHÚC
        </div>
        <div class="m-navbar-icon m-icon-14 m-icon-chevron-down-bold"></div>
      </div>
    </div>
    <div class="m-navbar-right">
      <div class="m-navbar-icon m-icon-24 m-icon-bell"></div>
      <div class="m-navbar-user">
        <div class="m-user-image">
          <img src="../../assets/img/default-avatar.jpg" alt="User image" />
        </div>
        <div class="m-user-name">Lê Tuấn Vũ</div>
        <div class="m-navbar-icon m-icon-14 m-icon-chevron-down"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "TheNavbar",
  computed: mapState({
    isCollapseMenu: (state) => state.app.isCollapseMenu,
  }),
  methods: {
    ...mapActions(["toggleCollapse"]),
    
  },
   
};
</script>