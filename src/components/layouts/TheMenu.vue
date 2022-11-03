<template>
  <div class="m-menu" :class="{ collapse: isCollapseMenu }">
    <div class="m-logo-container">
      <div class="m-option-icon" v-if="!isCollapseMenu"></div>
      <div
        class="m-menu-icon m-icon-24 m-icon-sidebar-three-stripes"
        v-if="isCollapseMenu"
        @click="toggleCollapse"
      ></div>
      <router-link to="/" v-if="!isCollapseMenu">
        <img
          class="m-logo-icon"
          src="../../assets/img/Logo_Module_TiengViet_White.66947422.svg"
          alt="Logo_Module_TiengViet_White"
        />
      </router-link>
    </div>
    <div class="m-menu-item">
      <router-link  to="/employees" >
        <div class="m-tooltip-content">
          <div class="m-item-router">
            <div class="m-item-icon m-icon-24 m-icon-dashboard"></div>
            <div class="m-item-title">Tổng quan</div>
          </div>
        </div>
      </router-link>
      <router-link to="/customers">
        <div class="m-tooltip-content">
          <div class="m-item-router">
            <div class="m-item-icon m-icon-24 m-icon-cash"></div>
            <div class="m-item-title">Tiền mặt</div>
          </div>
        </div>
      </router-link>
      <div class="m-tooltip-content">
        <div class="m-item-router">
          <div class="m-item-icon m-icon-24 m-icon-bank"></div>
          <div class="m-item-title">Tiền gửi</div>
        </div>
      </div>
      <div class="m-tooltip-content">
        <div class="m-item-router">
          <div class="m-item-icon m-icon-24 m-icon-buy"></div>
          <div class="m-item-title">Mua hàng</div>
        </div>
      </div>
      <div class="m-tooltip-content">
        <div class="m-item-router">
          <div class="m-item-icon m-icon-24 m-icon-sale"></div>
          <div class="m-item-title">Bán hàng</div>
        </div>
      </div>
      <div class="m-tooltip-content">
        <div class="m-item-router">
          <div class="m-item-icon m-icon-24 m-icon-invoice"></div>
          <div class="m-item-title">Quản lý hóa đơn</div>
        </div>
      </div>
      <div class="m-tooltip-content">
        <div class="m-item-router">
          <div class="m-item-icon m-icon-24 m-icon-stock"></div>
          <div class="m-item-title">Kho</div>
        </div>
      </div>
      <div class="m-tooltip-content">
        <div class="m-item-router">
          <div class="m-item-icon m-icon-24 m-icon-tools"></div>
          <div class="m-item-title">Công cụ dụng cụ</div>
        </div>
      </div>
      <div class="m-tooltip-content">
        <div class="m-item-router">
          <div class="m-item-icon m-icon-24 m-icon-fixed-assets"></div>
          <div class="m-item-title">Tài sản cố định</div>
        </div>
      </div>
      <div class="m-tooltip-content">
        <div class="m-item-router">
          <div class="m-item-icon m-icon-24 m-icon-tax"></div>
          <div class="m-item-title">Thuế</div>
        </div>
      </div>
      <div class="m-tooltip-content">
        <div class="m-item-router">
          <div class="m-item-icon m-icon-24 m-icon-price"></div>
          <div class="m-item-title">Giá thành</div>
        </div>
      </div>
      <div class="m-tooltip-content">
        <div class="m-item-router">
          <div class="m-item-icon m-icon-24 m-icon-general"></div>
          <div class="m-item-title">Tổng hợp</div>
        </div>
      </div>
      <div class="m-tooltip-content">
        <div class="m-item-router">
          <div class="m-item-icon m-icon-24 m-icon-budget"></div>
          <div class="m-item-title">Ngân sách</div>
        </div>
      </div>
      <div class="m-tooltip-content">
        <div class="m-item-router">
          <div class="m-item-icon m-icon-24 m-icon-report"></div>
          <div class="m-item-title">Báo cáo</div>
        </div>
      </div>
      <div class="m-tooltip-content">
        <div class="m-item-router">
          <div class="m-item-icon m-icon-24 m-icon-finance"></div>
          <div class="m-item-title">Phân tích tài chính</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "TheMenu",
  computed: mapState({
    isCollapseMenu: (state) => state.app.isCollapseMenu,
  }),
  methods: {
    ...mapActions(["toggleCollapse"]),
  },
};
</script>