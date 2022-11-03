<template>
  <div class="m-popup m-add-popup m-dialog" @keydown="keyPress">
    <div class="m-popup-con">
      <div class="m-popup-background"></div>
      <div class="m-popup-drag" ref="dragElm" @mousedown="dragMouseDown">
        <div class="m-popup m-popup-content">
          <!-- Popup header -->
          <div class="m-popup--header">
            <div class="m-popup--title">
              <div class="m-title">Thông tin nhân viên</div>
              <label class="m-popup-checkbox">
                <input type="checkbox" class="m-input-checkbox-popup" />
                <span class="m-checkbox">
                  <span class="m-checkbox-inner">
                    <div class="m-icon-16 m-icon-checkbox-active"></div>
                  </span>
                </span>
                <span class="m-input-checkbox-label">Là khách hàng</span>
              </label>
              <label class="m-popup-checkbox">
                <input type="checkbox" class="m-input-checkbox-popup" />
                <span class="m-checkbox">
                  <span class="m-checkbox-inner">
                    <div class="m-icon-16 m-icon-checkbox-active"></div>
                  </span>
                </span>
                <span class="m-input-checkbox-label">Là nhà cung cấp</span>
              </label>
            </div>
            <div class="m-popup--close">
              <div
                class="m-icon-24 m-icon-help"
                style="margin-right: 6px"
              ></div>
              <el-tooltip>
                <div
                  class="m-icon-24 m-icon-close m-close-add-popup"
                  @click="closePopup"
                ></div>
              </el-tooltip>
            </div>
          </div>
          <!-- Popup content -->
          <div class="m-popup--content">
            <div class="m-popup--content-scroll">
              <form id="employeeForm">
                <div class="m-content-2-col">
                  <div class="m-col-1 m-flex-wrap">
                    <div class="m-input-40 m-pr-6 m-pb-12">
                      <div class="m-flex">
                        <div class="m-input-title">Mã</div>
                        <div class="m-input-title-require">&nbsp;*</div>
                      </div>
                      <el-tooltip
                        content="Mã không được bỏ trống."
                        :disabled="validError.txtEmployeeCode ? false : true"
                        effect="danger"
                      >
                        <input
                          type="text"
                          class="m-input m-input-require"
                          maxlength="25"
                          v-model="employee.EmployeeCode"
                          ref="txtEmployeeCode"
                          @input="checkInputRequire('txtEmployeeCode', $event)"
                        />
                      </el-tooltip>
                    </div>
                    <div class="m-input-60 m-pb-12">
                      <div class="m-flex">
                        <div class="m-input-title">Tên</div>
                        <div class="m-input-title-require">&nbsp;*</div>
                      </div>
                      <el-tooltip
                        content="Tên không được bỏ trống."
                        :disabled="validError.txtEmployeeName ? false : true"
                        effect="danger"
                      >
                        <input
                          type="text"
                          class="m-input m-input-require"
                          maxlength="128"
                          placeholder="Le Tuan Vu"
                          v-model="employee.EmployeeName"
                          ref="txtEmployeeName"
                          @input="checkInputRequire('txtEmployeeName', $event)"
                        />
                      </el-tooltip>
                    </div>
                    <div class="m-input-100 m-pb-12">
                      <div class="m-flex">
                        <div class="m-input-title">Đơn vị</div>
                        <div class="m-input-title-require">&nbsp;*</div>
                      </div>
                      <div class="m-combo-box m-combo-department">
                        <div class="m-combo-main-content" ref="comboDepartment">
                          <div class="m-selected-options">
                            <input
                              type="hidden"
                              ref="txtDepartmentId"
                              
                              v-model="employee.DepartmentId"
                            />
                            <el-tooltip
                              content="Đơn vị không có trong hệ thống."
                              :disabled="
                                validError.txtDepartmentName ? false : true
                              "
                              effect="danger"
                            >
                              <input
                                type="text"
                                class="m-combo-input"
                                ref="txtDepartmentName"
                                placeholder="chọn đơn vị"
                                v-model="employee.DepartmentName"
                                @focus="addGreenBorder"
                                @blur="removeGreenBorder"
                                @input="
                                  checkDepName('txtDepartmentName', $event)
                                "
                                @keydown="
                                  handleDepartmentKey(
                                    $event,
                                    'txtDepartmentName'
                                  )
                                "
                              />
                            </el-tooltip>
                          </div>
                          <div class="m-combo-action m-select-department">
                            <div
                              class="m-btn-dropdown"
                              @click="
                                addGreenBorder();
                                toggleDropdown();
                              "
                              ref="buttonDropdown"
                            >
                              <div
                                class="m-icon-16 m-icon-arrow-dropdown"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="m-input-100 m-pb-12">
                      <div class="m-flex-wrap">
                        <div class="m-input-title">Chức danh</div>
                      </div>
                      <input
                        type="text"
                        class="m-input"
                        placeholder="Khoi san xuat"
                        maxlength="128"
                        ref="txtEmployeePosition"
                        v-model="employee.EmployeePosition"
                      />
                    </div>
                  </div>
                  <div class="m-col-2 m-flex-wrap">
                    <div class="m-input-40 m-pr-6 m-pb-12">
                      <div class="m-flex-wrap">
                        <div class="m-input-title">Ngày sinh</div>
                      </div>
                      <el-tooltip
                        content="Ngày sinh không hợp lệ"
                        :disabled="validError.DateOfBirth ? false : true"
                        effect="danger"
                      >
                        <date-picker
                          format="DD/MM/YYYY"
                          placeholder="DD/MM/YYYY"
                          ref="dateDateOfBirth"
                          :value="
                            employee.DateOfBirth
                              ? new Date(employee.DateOfBirth)
                              : null
                          "
                          :clearable="false"
                          :lang="langObject"
                          @change="selectDate('DateOfBirth', $event)"
                        >
                          <template #footer="{ emit }">
                            <button
                              class="mx-btn mx-btn-text"
                              @click="emit(new Date())"
                            >
                              Hôm nay
                            </button>
                          </template>
                        </date-picker>
                      </el-tooltip>
                    </div>
                    <div class="m-input-60 m-pb-12">
                      <div class="m-flex-wrap">
                        <div class="m-input-title">Giới tính</div>
                      </div>
                      <div class="m-radio-group">
                        <label class="m-con-radio">
                          <input
                            type="radio"
                            class="m-input-radio"
                            value="1"
                            name="Gender"
                            :checked="employee.Gender === 1"
                          />
                          <span class="m-radio">
                            <span class="m-radio-border"></span>
                            <span class="m-radio-circle"></span>
                          </span>
                          <span class="m-radio-label">Nam</span>
                        </label>
                        <label class="m-con-radio">
                          <input
                            type="radio"
                            class="m-input-radio"
                            value="0"
                            name="Gender"
                            :checked="employee.Gender === 0"
                          />
                          <span class="m-radio">
                            <span class="m-radio-border"></span>
                            <span class="m-radio-circle"></span>
                          </span>
                          <span class="m-radio-label">Nữ</span>
                        </label>
                        <label class="m-con-radio">
                          <input
                            type="radio"
                            class="m-input-radio"
                            value="2"
                            name="Gender"
                            :checked="employee.Gender === 2"
                          />
                          <span class="m-radio">
                            <span class="m-radio-border"></span>
                            <span class="m-radio-circle"></span>
                          </span>
                          <span class="m-radio-label">Khác</span>
                        </label>
                      </div>
                    </div>
                    <div class="m-input-60 m-pr-6 m-pb-12">
                      <div class="m-flex-wrap">
                        <el-tooltip
                          content="Số chứng minh nhân dân"
                          placement="bottom"
                        >
                          <div class="m-input-title">Số CMND</div>
                        </el-tooltip>
                      </div>
                      <el-tooltip
                        content="Giá trị số CMND không đúng."
                        :disabled="validError.txtIdentityNumber ? false : true"
                        effect="danger"
                      >
                        <input
                          type="text"
                          class="m-input"
                          placeholder="04221144"
                          ref="txtIdentityNumber"
                          maxlength="20"
                          v-model="employee.IdentityNumber"
                          @input="checkInputNumber('txtIdentityNumber', $event)"
                        />
                      </el-tooltip>
                    </div>
                    <div class="m-input-40 m-pb-12">
                      <div class="m-flex-wrap">
                        <div class="m-input-title">Ngày cấp</div>
                      </div>
                      <el-tooltip
                        content="Ngày cấp không hợp lệ."
                        :disabled="validError.IdentityDate ? false : true"
                        effect="danger"
                      >
                        <date-picker
                          format="DD/MM/YYYY"
                          placeholder="DD/MM/YYYY"
                          ref="dateIdentityDate"
                          :value="
                            employee.IdentityDate
                              ? new Date(employee.IdentityDate)
                              : null
                          "
                          :clearable="false"
                          :lang="langObject"
                          @change="selectDate('IdentityDate', $event)"
                        >
                          <template #footer="{ emit }">
                            <button
                              class="mx-btn mx-btn-text"
                              @click="emit(new Date())"
                            >
                              Hôm nay
                            </button>
                          </template>
                        </date-picker>
                      </el-tooltip>
                    </div>
                    <div class="m-input-100 m-pb-12">
                      <div class="m-flex-wrap">
                        <div class="m-input-title">Nơi cấp</div>
                      </div>
                      <input
                        type="text"
                        class="m-input"
                        placeholder="Công an thành phố Hà Nội"
                        ref="txtIdentityPlace"
                        v-model="employee.IdentityPlace"
                      />
                    </div>
                  </div>
                </div>
                <div class="m-content-1-col m-pb-12">
                  <div class="m-input-100">
                    <div class="m-flex-wrap">
                      <div class="m-input-title">Địa chỉ</div>
                    </div>
                    <input
                      type="text"
                      class="m-input"
                      placeholder="Cầu Giấy, Hà Nội"
                      ref="txtAddress"
                      v-model="employee.Address"
                    />
                  </div>
                </div>
                <div class="m-content-4-col">
                  <div class="m-col-1 m-pr-6">
                    <div class="m-input-100 m-pb-12">
                      <div class="m-flex-wrap">
                        <div class="m-input-title">ĐT di động</div>
                      </div>
                      <el-tooltip
                        content="Giá trị ĐT di động không đúng."
                        :disabled="validError.txtTelephoneNumber ? false : true"
                        effect="danger"
                      >
                        <input
                          type="text"
                          class="m-input"
                          ref="txtTelephoneNumber"
                          placeholder="085691211"
                          v-model="employee.TelephoneNumber"
                          @input="
                            checkInputNumber('txtTelephoneNumber', $event)
                          "
                        />
                      </el-tooltip>
                    </div>
                    <div class="m-input-100 m-pb-12">
                      <div class="m-flex-wrap">
                        <div class="m-input-title">Tài khoản ngân hàng</div>
                      </div>
                      <el-tooltip
                        content="Giá trị tài khoản ngân hàng không đúng."
                        :disabled="
                          validError.txtBankAccountNumber ? false : true
                        "
                        effect="danger"
                      >
                        <input
                          type="text"
                          class="m-input"
                          placeholder="22114444"
                          ref="txtBankAccountNumber"
                          v-model="employee.BankAccountNumber"
                          @input="
                            checkInputNumber('txtBankAccountNumber', $event)
                          "
                        />
                      </el-tooltip>
                    </div>
                  </div>
                  <div class="m-col-2 m-pr-6">
                    <div class="m-input-100 m-pb-12">
                      <div class="m-flex-wrap">
                        <div class="m-input-title">ĐT cố định</div>
                      </div>
                      <el-tooltip
                        content="Giá trị ĐT cố định không đúng."
                        :disabled="validError.txtPhoneNumber ? false : true"
                        effect="danger"
                      >
                        <input
                          type="text"
                          class="m-input"
                          placeholder="105333211"
                          ref="txtPhoneNumber"
                          v-model="employee.PhoneNumber"
                          @input="checkInputNumber('txtPhoneNumber', $event)"
                        />
                      </el-tooltip>
                    </div>
                    <div class="m-input-100 m-pb-12">
                      <div class="m-flex-wrap">
                        <div class="m-input-title">Tên ngân hàng</div>
                      </div>
                      <input
                        type="text"
                        class="m-input"
                        placeholder="Vietcombank"
                        ref="txtBankName"
                        v-model="employee.BankName"
                      />
                    </div>
                  </div>
                  <div class="m-col-3 m-pr-6">
                    <div class="m-input-100 m-pb-12">
                      <div class="m-flex-wrap">
                        <div class="m-input-title">Email</div>
                      </div>
                      <el-tooltip
                        content="Giá trị email không đúng."
                        :disabled="validError.txtEmail ? false : true"
                        effect="danger"
                      >
                        <input
                          type="text"
                          class="m-input"
                          ref="txtEmail"
                          placeholder="vumadridistazz@gmail.com"
                          v-model="employee.Email"
                          @input="checkEmail"
                        />
                      </el-tooltip>
                    </div>
                    <div class="m-input-100 m-pb-12">
                      <div class="m-flex-wrap">
                        <div class="m-input-title">Chi nhánh</div>
                      </div>
                      <input
                        type="text"
                        class="m-input"
                        placeholder="Nam Thăng Long"
                        ref="txtBankBranchName"
                        v-model="employee.BankBranchName"
                      />
                    </div>
                  </div>
                  <div class="m-col-4"></div>
                </div>
              </form>
            </div>
            <div class="m-popup--footer">
              <div class="m-divine"></div>
              <div class="m-popup-btn">
                <div class="m-popup-btn-left">
                  <button
                    class="
                      m-button
                      m-button-secondary
                      m-button-size-default
                      m-button-border-false
                    "
                    @click="closePopup"
                  >
                    <div class="m-button-text">Hủy</div>
                  </button>
                </div>
                <div class="m-popup-btn-right">
                  <el-tooltip >
                    <button
                      class="
                        m-button
                        m-button-secondary
                        m-button-size-default
                        m-button-border-false
                        m-popup-store-btn
                      "
                      @click="handleStoreEmployee"
                      ref="btnStore"
                    >
                      <div class="m-button-text">Cất</div>
                    </button>
                  </el-tooltip>
                  <el-tooltip>
                    <button
                      class="
                        m-button
                        m-button-size-default
                        m-button-border-false
                        m-popup-store-and-add-btn
                      "
                      @click="handleStoreAndAdd"
                      ref="btnStoreAndAdd"
                    >
                      <div class="m-button-text">Cất và thêm</div>
                    </button>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Combo dropdown chọn phòng ban -->
  <div
    v-if="isShowDropdown"
    class="m-close-dropdown"
    @click="handleClose"
  ></div>
  <div
    v-if="isShowDropdown"
    class="m-combo-menu m-open"
    style="min-width: 392px"
    :style="{ top: `${dropdownTop}px`, left: `${dropdownLeft}px` }"
  >
    <div class="m-combo-menu-header">
      <table class="m-menu-table">
        <thead class="m-menu-header">
          <tr>
            <th class="m-menu-header-th" style="width: 100px; text-align: left">
              <span>Mã đơn vị</span>
            </th>
            <th class="m-menu-header-th" style="width: 250px; text-align: left">
              <span>Tên đơn vị</span>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="m-combo-menu-content">
      <table class="m-menu-table">
        <tbody class="m-menu-items m-departments-list">
          <tr
            class="m-menu-items-tr"
            v-for="dep in departments"
            :key="dep.DepartmentId"
            :class="{
              'm-items-highlight': dep.DepartmentId == employee.DepartmentId,
            }"
            @click="selectDepartment(dep)"
          >
            <td class="m-menu-items-td" style="width: 100px; text-align: left">
              <span>{{ dep.DepartmentCode }}</span>
            </td>
            <td class="m-menu-items-td" style="width: 250px; text-align: left">
              <span>{{ dep.DepartmentName }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";
import { DialogMsg, EmployeeMsg } from "@/resources";
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
import { DialogAction, FormMode } from "@/enums";
// import { ElTooltip } from "element-plus";

export default {
  name: "EmployeeDetail",
  components: { DatePicker,  },
  data() {
    return {
      dropdownTop: 0,
      dropdownLeft: 0,
      isShowDropdown: false,
      validError: {},
      focus: null,
      departmentIndex: 0,
      langObject: {
        formatLocale: {
          months: [
            "Tháng Một",
            "Tháng Hai",
            "Tháng Ba",
            "Tháng Tư",
            "Tháng Năm",
            "Tháng Sáu",
            "Tháng Bảy",
            "Tháng Tám",
            "Tháng Chín",
            "Tháng Mười",
            "Tháng Mười Một",
            "Tháng Mười Hai",
          ],
          monthsShort: [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
          ],
          weekdays: [
            "Chủ Nhật",
            "Thứ Hai",
            "Thứ Ba",
            "Thứ Tư",
            "Thứ Năm",
            "Thứ Sáu",
            "Thứ Bảy",
          ],
          weekdaysMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
        },
      },
    };
  },
  props: ["isStore"],
  emits: ["isStoreDone"],
  computed: mapState({
    singleEmployee: (state) => state.employee.singleEmployee,
    editMode: (state) => state.employee.editMode,
    employee: (state) => state.employee.employee,
    departments: (state) => state.department.departments,
    isShowDialog: (state) => state.app.isShowDialog,
  }),
  methods: {
    /**
     * Map Actions
     * Author: LTVU
     */
    ...mapActions([
      "togglePopup",
      "setNewEmployeeCode",
      "getDepartments",
      "setDialog",
      "toggleDialog",
      "addEmployee",
      "editEmployee",
      "changeEditMode",
    ]),


    /**
     * Xử lý cất và thêm
     * Author: LTVU
     */
    handleStoreAndAdd() {
      debugger; // eslint-disable-line no-debugger
      try {
        var mode =
          this.editMode === FormMode.STORE || this.editMode === FormMode.STORE_AND_ADD
            ? FormMode.STORE_AND_ADD
            : this.editMode === FormMode.EDIT || this.editMode === FormMode.EDIt_AND_ADD
            ? FormMode.EDIt_AND_ADD
            : null;
         this.changeEditMode(mode);
        this.handleStoreEmployee();
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Xử lý đóng dropdown chọn phòng ban
     * Author: LTVU
     */
    handleClose() {
      let comboElm = this.$refs.comboDepartment;
      comboElm.classList.remove("m-input-focus");
      this.isShowDropdown = false;
    },
    /**
     * Xử lý thêm nhân viên
     */
    handleStoreEmployee() {
      debugger; // eslint-disable-line no-debugger
      console.log(this.editMode)
      try {
        const isValid = this.validationData();
        this.employee.Gender = parseInt(
          document.querySelector('input[name="Gender"]:checked').value
        );
        if (isValid) {
          // Nếu editMode = 1, 3 => Thêm
          if (
            this.editMode === FormMode.STORE ||
            this.editMode === FormMode.STORE_AND_ADD
          ) {
            this.addEmployee();
            // Nếu editMode = 2, 4 => Sửa
          } else if (
            this.editMode === FormMode.EDIT ||
            this.editMode === FormMode.EDIt_AND_ADD
          ) {
            this.editEmployee();
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Validate dữ liệu người dùng
     * Author: LTVU
     */
    validationData() {
      try {
        let dataEmployee = this.employee;
        let dialog;
        // 1. Kiểm tra các input bắt buộc
        if (!dataEmployee.EmployeeCode) {
          if (!dialog) {
            dialog = {
              type: "danger",
              message: EmployeeMsg.emptyEmployeeCode,
            };
             this.focus = this.$refs.txtEmployeeCode;
          }
          this.$refs.txtEmployeeCode.classList.add("m-input-error");
        }
        if (!dataEmployee.EmployeeName) {
          if (!dialog) {
            dialog = {
              type: "danger",
              message: EmployeeMsg.emptyEmployeeName,
            };
            this.focus = this.$refs.txtEmployeeName;
          }
          this.$refs.txtEmployeeName.classList.add("m-input-error");
        }
        if (!dataEmployee.DepartmentName) {
          if (!dialog) {
            dialog = {
              type: "danger",
              message: EmployeeMsg.emptyDepartmentName,
            };
            this.focus = this.$refs.txtDepartmentName;
          }
          this.$refs.comboDepartment.classList.add("m-input-error");
        }
        // 2. Kiểm tra định dạng ngày tháng
        let dob = this.$refs.dateDateOfBirth.value;
        if (dob && (!moment(dob).isValid() || new Date(dob) - new Date() > 0)) {
          if (!dialog) {
            dialog = {
              type: "danger",
              message: EmployeeMsg.dobNotValid,
            };
            this.focus = this.$refs.dateDateOfBirth;
          }
        }
        let idDate = this.$refs.dateIdentityDate.value;
        if (
          idDate &&
          (!moment(idDate).isValid() || new Date(idDate) - new Date() > 0)
        ) {
          if (!dialog) {
            dialog = {
              type: "danger",
              message: EmployeeMsg.idDateNotValid,
            };
            this.focus = this.$refs.dateIdentityDate;
          }
        }
        // 3. Kiểm tra định dạng email
        let empEmail = this.employee.Email;
        var regex =
          /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9-]+)((\.[a-zA-Z0-9-]{2,3})+)$/;
        if (empEmail && !empEmail.match(regex)) {
          if (!dialog) {
            dialog = {
              type: "danger",
              message: EmployeeMsg.emailNotvalid,
            };
            this.focus = this.$refs.txtEmail;
          }
          this.$refs.txtEmail.classList.add("m-input-error");
        }
        // 4. Kiểm tra định dạng các input dạng số
        let idNumber = this.employee.IdentityNumber;
        if (idNumber && isNaN(idNumber)) {
          if (!dialog) {
            dialog = {
              type: "danger",
              message: EmployeeMsg.idNumberNotValid,
            };
            this.focus = this.$refs.txtIdentityNumber;
          }
          this.$refs.txtIdentityNumber.classList.add("m-input-error");
        }
        let tlphoneNumber = this.employee.TelephoneNumber;
        if (tlphoneNumber && isNaN(tlphoneNumber)) {
          if (!dialog) {
            dialog = {
              type: "danger",
              message: EmployeeMsg.tlphoneNotValid,
            };
            this.focus = this.$refs.txtTelephoneNumber;
          }
          this.$refs.txtTelephoneNumber.classList.add("m-input-error");
        }
        let phoneNumber = this.employee.PhoneNumber;
        if (phoneNumber && isNaN(phoneNumber)) {
          if (!dialog) {
            dialog = {
              type: "danger",
              message: EmployeeMsg.phoneNotValid,
            };
            this.focus = this.$refs.txtPhoneNumber;
          }
          this.$refs.txtPhoneNumber.classList.add("m-input-error");
        }
        let bankNumber = this.employee.BankAccountNumber;
        if (bankNumber && isNaN(bankNumber)) {
          if (!dialog) {
            dialog = {
              type: "danger",
              message: EmployeeMsg.bankNumberNotValid,
            };
            this.focus = this.$refs.txtBankAccountNumber;
          }
          this.$refs.txtBankAccountNumber.classList.add("m-input-error");
        }
        // Return
        if (dialog) {
          this.setDialog(dialog);
          this.toggleDialog();
          return false;
        }
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Check các input dạng số
     * Author: LTVU
     */
    checkInputNumber(ref, e) {
      if (!e.currentTarget.value || !isNaN(e.currentTarget.value)) {
        e.currentTarget.classList.remove("m-input-error");
        this.validError[ref] = false;
      } else {
        e.currentTarget.classList.add("m-input-error");
        this.validError[ref] = true;
      }
    },
    /**
     * Check email người dùng nhập vào
     * Author: LTVU()
     */
    checkEmail(e) {
      var regex =
        /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9-]+)((\.[a-zA-Z0-9-]{2,3})+)$/;
      if (!e.currentTarget.value || e.currentTarget.value.match(regex)) {
        e.currentTarget.classList.remove("m-input-error");
        this.validError.txtEmail = false;
      } else {
        e.currentTarget.classList.add("m-input-error");
        this.validError.txtEmail = true;
      }
    },
    /**
     * Người dùng nhập các input dạng ngày tháng
     * Author: LTVU()
     * @param {string} ref
     * @param {date} val
     */
    selectDate(ref, val) {
      var inputElm = this.$refs[`date${ref}`].querySelector("input");
      if (moment(val).isValid() && new Date(val) - new Date() < 0) {
        inputElm.classList.remove("m-input-error");
        this.validError[ref] = false;
        this.employee[ref] = moment(val).format("YYYY-MM-DDThh:mm:ss");
      } else if (!val) {
        inputElm.classList.remove("m-input-error");
        this.validError[ref] = false;
        this.employee[ref] = null;
      } else {
        inputElm.classList.add("m-input-error");
        this.validError[ref] = true;
        this.employee[ref] = null;
        this.employee[ref] = moment(val).format("YYYY-MM-DDThh:mm:ss");
      }
    },
    /**
     * Check các input bắt buộc khi nhập vào
     * Author: LTVU()
     */
    checkInputRequire(ref, e) {
      if (e.currentTarget.value == "") {
        e.currentTarget.classList.add("m-input-error");
        this.validError[ref] = true;
      } else {
        e.currentTarget.classList.remove("m-input-error");
        this.validError[ref] = false;
      }
    },
    /**
     * Hàm xử lý lên xuống chọn department
     * @param {string} key
     * @param {string} ref
     */
    handleDepartmentKey(e, ref) {
      console.log("arrow");
      let rect = this.$refs.buttonDropdown.getBoundingClientRect();
      this.dropdownTop = rect.top + 33;
      this.dropdownLeft = rect.left - 359;
      this.isShowDropdown = true;
      if (e.key === "ArrowUp" && this.departmentIndex !== 0) {
        --this.departmentIndex;
      } else if (
        e.key === "ArrowDown" &&
        this.departmentIndex !== this.departments.length - 1
      ) {
        ++this.departmentIndex;
      } else if (e.key === "Enter") {
        this.isShowDropdown = false;
      } else if (e.key === "Tab") {
        this.isShowDropdown = false;
        return;
      } else {
        return;
      }
      this.employee.DepartmentId =
        this.departments[this.departmentIndex].DepartmentId;
      this.employee.DepartmentName =
        this.departments[this.departmentIndex].DepartmentName;
      let comboElm = this.$refs.comboDepartment;
      comboElm.classList.remove("m-input-error");
      this.validError[ref] = false;
    },
    /**
     * Tìm department theo tên
     * Author: LTVU()
     * @param {string} ref
     * @param {event} e
     */
    handleFindDep(ref, e) {
      let comboElm = this.$refs.comboDepartment;
      // Lọc đơn vị
      let depName = e.currentTarget.value;
      let findDep = this.departments.find((dep) => {
        return dep.DepartmentName === depName;
      });
      if (!findDep) {
        // Không có đơn vị thỏa mãn
        comboElm.classList.add("m-input-error");
        this.validError[ref] = true;
      } else {
        // Gán đơn vị hợp lệ
        this.employee.DepartmentName = findDep.DepartmentName;
        this.employee.DepartmentId = findDep.DepartmentId;
        comboElm.classList.remove("m-input-error");
        this.validError[ref] = false;
      }
    },
    /**
     * Check department name khi người dùng nhập vào
     * Author: LTVU()
     */
    checkDepName(ref, e) {
      try {
        // Gán vị trí dropdown chọn đơn vị
        let rect = this.$refs.buttonDropdown.getBoundingClientRect();
        this.dropdownTop = rect.top + 33;
        this.dropdownLeft = rect.left - 359;
        this.isShowDropdown = true;
        this.handleFindDep(ref, e);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Bỏ border xanh khi người dùng blur khỏi input
     * Author: LTVU()
     */
    removeGreenBorder() {
      let comboElm = this.$refs.comboDepartment;
      comboElm.classList.remove("m-input-focus");
    },
    /**
     * Người dùng chọn đơn vị
     * Author: LTVU()
     * @param {object} dep
     */
    selectDepartment(dep) {
      this.employee.DepartmentName = dep.DepartmentName;
      this.employee.DepartmentId = dep.DepartmentId;
      this.isShowDropdown = false;
      let comboElm = this.$refs.comboDepartment;
      comboElm.classList.remove("m-input-error");
      this.validError["txtDepartmentName"] = false;
      this.$refs.txtDepartmentName.focus();
    },
    /**
     * Hiển thị border xanh khi người dùng chọn đơn vị
     * Author: LTVU()
     */
    addGreenBorder() {
      let comboElm = this.$refs.comboDepartment;
      comboElm.classList.add("m-input-focus");
    },
    /**
     * Người dùng mở dropdown chọn đơn vị
     * Author: LTVU()
     */
    toggleDropdown() {
      if (!this.isShowDropdown) {
        // Gán vị trí dropdown chọn đơn vị
        let rect = this.$refs.buttonDropdown.getBoundingClientRect();
        this.dropdownTop = rect.top + 33;
        this.dropdownLeft = rect.left - 359;
      }
      this.isShowDropdown = !this.isShowDropdown;
    },
    /**
     * So sánh 2 object
     * Author: LTVU()
     */
    objectEqual(object1, object2) {
      try {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);

        // Check số lượng key của 2 object
        if (keys1.length !== keys2.length) {
          return false;
        }

        // Check lần lượt các value
        for (const key of keys1) {
          const val1 = object1[key];
          const val2 = object2[key];
          const areObjects = this.isObject(val1) && this.isObject(val2);

          if (
            (areObjects && !this.objectEqual(val1, val2)) ||
            (!areObjects && val1 !== val2)
          ) {
            return false;
          }
        }

        return true;
      } catch (error) {
        console.log(error);
      }
    },
    isObject(object) {
      return object != null && typeof object === "object";
    },
    /**
     * Check thông tin thay đổi và đóng popup
     * Author: LTVU()
     */
    closePopup() {
      try {
        // Check dữ liệu trên popup đã thay đổi
        if (!this.objectEqual(this.employee, this.singleEmployee)) {
          this.setDialog({
            type: "question",
            message: DialogMsg.dataChange,
            action: DialogAction.CONFIRM_STORE,
          });
          this.toggleDialog();
        } else {
          this.togglePopup();
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Format date value cho input
     * Author: LTVU()
     * @param {string} date
     */
    formatDateValue(date) {
      return date ? moment(date).format("YYYY-MM-DD") : null;
    },
  },
  watch: {
    isShowDialog(newState) {
      if (newState == false && this.focus) {
        this.focus.focus();
      }
    },
    isStore(newState) {
      if (newState == true) {
        this.$refs.btnStore.click();
        this.$emit("isStoreDone");
      }
    },
  },
  created() {
    try {
      // Check mode
      if (this.editMode === FormMode.STORE) {
        // Gọi API lấy mã mới
        this.setNewEmployeeCode();
      }
      // Gọi API lấy department
      this.getDepartments();
    } catch (error) {
      console.log(error);
    }
  },
  mounted() {
    // Focus mã nhân viên
    this.$refs.txtEmployeeCode.focus();
  },
};
</script>

<style>
.el-popper.is-danger {
  /* Set padding to ensure the height is 32px */
  background: #f47575;
  color: #fff;
}

.el-popper.is-danger .el-popper__arrow::before {
  background: #f47575;
  right: 0;
}
</style>