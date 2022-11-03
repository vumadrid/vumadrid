<template>
  <div
    v-if="!isLoadData && totalEmployee != 0"
    class="m-pagination"
    style="display: flex"
    :style="{ width: `${widthTable}px` }"
  >
    <div class="m-pagination-bar">
      <div class="m-pagination-left">
        <div class="m-total-record">
          Tổng số: <b class="m-total">{{ totalEmployee }}</b> bản ghi
        </div>
      </div>
      <div class="m-pagination-right">
        <div class="m-record-in-page">
          <div class="m-combo-box">
            <div class="m-combo-main-content">
              <div class="m-selected-options">
                <input
                  type="text"
                  class="m-combo-input"
                  readonly="true"
                  autofocus1
                  value="10 bản ghi trên 1 trang"
                />
              </div>
              <div
                class="m-combo-action m-select-record"
                @click="openSelectTotalRecordPanel"
              >
                <div class="m-btn-dropdown">
                  <div
                    class="m-icon-16 m-icon-arrow-dropdown"
                    :class="{
                      'm-dropdown-close': !isShowRecordDropdown,
                      'm-dropdown-open': isShowRecordDropdown,
                    }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="m-page-number">
          <div class="m-page-number">
            <div
              class="m-prev-page"
              :class="{ 'm-disable': page === 1 }"
              @click="selectPrevPage"
            >
              Trước
            </div>
            <div class="m-page-index" >
              <div
                class="m-number"
              >
                {{ i }}
              </div>
            </div>
            <div class="m-page-index" >
              <div
                class="m-number"
              >
                {{ i }}
              </div>
            </div>
            <div class="m-page-index">
              <div  class="m-number" >
                {{ page - 1 }}
              </div>
              <div
                class="m-number"
              >
                {{ i }}
              </div>
              <div class="m-number">...</div>
              <div class="m-number" >
                {{ pages.length }}
              </div>
            </div>
            <div
              class="m-next-page"
              :class="{ 'm-disable': page == pages.length }"
              @click="selectNextPage"
            >
              Sau
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="m-out-right-white-30"></div>
    <div class="m-out-right-grey-30"></div>
  </div>
  <!-- Dropdown chọn số bản ghi -->
  <div
    v-if="isShowRecordDropdown"
    class="m-close-dropdown"
    @click="() => (this.isShowRecordDropdown = false)"
  ></div>
  <div
    v-if="isShowRecordDropdown"
    class="m-combo-dropdown-panel m-select-total-record"
    :style="{ top: `${dropdownTop}px`, left: `${dropdownLeft}px` }"
  >
    <div class="m-dropdown-body-container">
      <ul class="m-combo-dropdown-items">
        <li
          class="m-combo-box-item"
          :class="{ 'm-item-highlight': pageSize === 10 }"
          data-per="10"
          @click="selectTotalRecord"
        >
          10 bản ghi trên 1 trang
        </li>
        <li
          class="m-combo-box-item"
          :class="{ 'm-item-highlight': pageSize === 20 }"
          data-per="20"
          @click="selectTotalRecord"
        >
          20 bản ghi trên 1 trang
        </li>
        <li
          class="m-combo-box-item"
          :class="{ 'm-item-highlight': pageSize === 30 }"
          data-per="30"
          @click="selectTotalRecord"
        >
          30 bản ghi trên 1 trang
        </li>
        <li
          class="m-combo-box-item"
          :class="{ 'm-item-highlight': pageSize === 50 }"
          data-per="50"
          @click="selectTotalRecord"
        >
          50 bản ghi trên 1 trang
        </li>
        <li
          class="m-combo-box-item"
          :class="{ 'm-item-highlight': pageSize === 100 }"
          data-per="100"
          @click="selectTotalRecord"
        >
          100 bản ghi trên 1 trang
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "EmployeePagenation",
  computed: mapState({
    totalEmployee: (state) => state.employee.totalEmployee,
    totalPage: (state) => state.employee.totalPage,
    isLoadData: (state) => state.employee.isLoadData,
    widthTable: (state) => state.employee.widthTable,
    filter: (state) => state.employee.filter,
  }),
  data() {
    return {
      pages: [],
      isShowRecordDropdown: false,
    };
  },
  props: {
    page: Number,
    pageSize: Number,
  },
  methods: {
    /**
     * Map actions
     */
    ...mapActions(["setFilterInfo", "getEmployees"]),
    /**
     * Chọn trang trước
     * Author: LTVU()
     */
    selectPrevPage() {
      try {
        const currentPage = parseInt(this.filter.pageNumber);
        if (currentPage > 1) {
          this.changeData({
            pageSize: this.filter.pageSize,
            pageNumber: currentPage - 1,
            employeeFilter: this.filter.employeeFilter,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Chọn trang sau
     * Author: LTVU()
     */
    selectNextPage() {
      try {
        const currentPage = parseInt(this.filter.pageNumber);
        if (currentPage < this.totalPage) {
          this.changeData({
            pageSize: this.filter.pageSize,
            pageNumber: currentPage + 1,
            employeeFilter: this.filter.employeeFilter,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Chọn số bản ghi trên 1 trang
     * Author: LTVU()
     * @param {event} e
     */
    selectTotalRecord(e) {
      try {
        // Gán value cho input
        document.querySelector(".m-combo-input").value =
          e.currentTarget.textContent;
        const pageSize = parseInt(e.currentTarget.dataset.per);
        this.changeData({
          pageSize,
          pageNumber: 1,
          employeeFilter: this.filter.employeeFilter,
        });
        // Tắt dropdown chọn bản ghi
        this.isShowRecordDropdown = false;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Mở combobox chọn số bản ghi
     * Author: LTVU()
     * @param {event} e
     */
    openSelectTotalRecordPanel(e) {
      if (!this.isShowRecordDropdown) {
        let rect = e.currentTarget.getBoundingClientRect();
        this.dropdownTop = rect.top - 170;
        this.dropdownLeft = rect.left - 167;
      }
      this.isShowRecordDropdown = !this.isShowRecordDropdown;
    },
    /**
     * Thay đổi data trên bảng
     * Author: LTVU()
     * @param {object} filter
     */
    changeData(filter) {
      try {
        // Dispatch
        this.setFilterInfo(filter);
        this.getEmployees();
      } catch (error) {
        console.log(error);
      }
    },
  },
  beforeUpdate() {
    this.pages = [];
    for (let i = 1; i <= this.totalPage; i++) {
      this.pages.push(i);
    }
  },
};
</script>