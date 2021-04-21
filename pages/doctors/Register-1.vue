<template>
  <div>
    <!-- Content-->
    <div v-if="loading" class="loading-page">
      <div class="loading"></div>
    </div>
    <!-- Content-->
    <div class="login-wrapper" :class="{rtl:current_lang === 'ar'}">
      <div class="login-form" :class="{rtl:current_lang === 'ar'}">
        <div class="container-fluid">
          <div class="col-xs-12 col-sm-10 col-sm-push-1">
            <div class="login-logo">
              <img src="https://api.promental.net/images/website/doctors.svg" alt=""
                   class="hidden-xs hidden-sm">
              <img src="https://api.promental.net/images/website/doctors-white.png" alt=""
                   class="visible-xs visible-sm">
            </div>
            <div class="alert alert-danger" role="alert" v-if="formErrors.length > 0">
              <ul>
                <li v-for="(error,index) in formErrors" :key="error.index">{{ error }}</li>
              </ul>
            </div>
            <v-stepper v-model="e1">
              <v-stepper-items>
              <!--      form 1     -->
              <v-stepper-content step="1">

                <form>

                  <div class="form-group">
                    <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="fa fa-circle"></i>
                                       {{ $t('first_name_arabic') }}
                                    </span>
                      <input type="text" class="form-control" v-model="first_name"
                             :placeholder="$t('first_name_arabic')">
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="fa fa-circle"></i>
                                       {{ $t('first_name_english') }}
                                    </span>
                      <input type="text" class="form-control" v-model="first_name_en"
                             :placeholder="$t('first_name_english')">
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="input-group">
                                                <span class="input-group-addon">
                                        <i class="fa fa-circle"></i>
                                         {{ $t('last_name_arabic') }}
                                    </span>
                      <input type="text" class="form-control" v-model="last_name"
                             :placeholder="$t('last_name_arabic')">
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="input-group">
                                                <span class="input-group-addon">
                                        <i class="fa fa-circle"></i>
                                         {{ $t('last_name_english') }}
                                    </span>
                      <input type="text" class="form-control" v-model="last_name_en"
                             :placeholder="$t('last_name_english')">
                    </div>
                  </div>


                  <div class="form-group">
                    <div class="input-group">

                                    <span class="input-group-addon">
                                        <i class="fa fa-circle"></i>
                                       {{ $t('the_clinic_address_arabic') }}
                                    </span>
                      <input type="text" class="form-control" v-model="address"
                             :placeholder="$t('the_clinic_address_arabic')">
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="input-group">

                                    <span class="input-group-addon">
                                        <i class="fa fa-circle"></i>
                                       {{ $t('the_clinic_address_english') }}
                                    </span>
                      <input type="text" class="form-control" v-model="address_en"
                             :placeholder="$t('the_clinic_address_english')">
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="fa fa-circle"></i>
                                         {{ $t('speciality') }}
                                    </span>

                      <select class="form-control" multiple v-model="speciality">
                        <option value="0"> {{ $t('choose_speciality') }}</option>
                        <option :value="speciality.id"
                                v-for="(speciality,index) in specialities"
                                :key="speciality[index]">
                          {{ current_lang == 'en' ? speciality.name_en : speciality.name_ar }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="fa fa-circle"></i>
                                          {{ $t('certificates_arabic') }}
                                    </span>
                      <client-only>
                        <tags-input element-id="tags" v-model="certificates"
                                    :typeahead="true"
                                    :placeholder="current_lang == 'en' ? 'Enter to add another one' : 'اضغط انتر لاضافه شهاده اخرى'"
                                    style="border-radius:20px;"></tags-input>
                      </client-only>
                    </div>
                  </div>


                  <div class="form-group">
                    <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="fa fa-circle"></i>
                                          {{ $t('certificates_english') }}
                                    </span>
                      <client-only>
                        <tags-input element-id="tags" v-model="certificates_en"
                                    :typeahead="true"
                                    :placeholder="current_lang == 'en' ? 'Enter to add another one' : 'اضغط انتر لاضافه شهاده اخرى'"
                                    style="border-radius:20px;"></tags-input>
                      </client-only>
                    </div>
                  </div>


                  <div class="form-group">
                    <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="fa fa-circle"></i>
                                           {{ $t('phone_number') }}
                                    </span>
                      <input type="text" class="form-control" v-model="phone"
                             :placeholder="$t('phone_number')">
                      <small class="text-danger" v-if="phone_errors">{{ phone_errors }}
                      </small>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="fa fa-circle"></i>
                                         {{ $t('type') }}
                                    </span>
                      <select class="form-control" v-model="type">
                        <option value="0"> {{ $t('choose_type') }}</option>
                        <option :value="type.id" v-for="(type,index) in types"
                                :key="type[index]">{{
                            current_lang == 'ar' ? type.name_ar :
                              type.name_en
                          }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="fa fa-circle"></i>
                                          {{ $t('description_arabic') }}
                                    </span>
                      <textarea class="form-control" v-model="description"
                                :placeholder="$t('description_arabic')"></textarea>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="fa fa-circle"></i>
                                          {{ $t('description_english') }}
                                    </span>
                      <textarea class="form-control" v-model="description_en"
                                :placeholder="$t('description_english')"></textarea>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="input-group">
                                    <span class="input-group-addon">
                                <i class="fa fa-circle"></i>
                                cv
                            </span>
                      <div class="file-upload">
                        <input type="file" name="FileAttachment" id="FileAttachment"
                               class="upload"
                               @change="onFileChange"/>
                        <input type="text" class="form-control" id="fileuploadurl" readonly
                               placeholder="cv" accept="application/pdf">
                        <span><i class="fa fa-file-pdf-o" style="font-size: 24px;color: #2bb788;"></i></span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group text-center margin-top-20">
                    <button type="button" class="btn btn-main btn-lg" @click="e1 = 2">
                      {{ $t('next') }}
                    </button>
                    <span class="bullets">
                            <i class="fa fa-circle active"></i>
                            <i class="fa fa-circle"></i>
                            <i class="fa fa-circle"></i>
                        </span>
                  </div>
                </form>
              </v-stepper-content>
              <!--     end form 1           -->
              <!--      form 2     -->
              <v-stepper-content step="2">
                <div class="login-title">
                  {{ $t('account_data') }}
                </div>
                <form>
                  <div class="form-group">
                    <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="fa fa-circle"></i>
                                         {{ $t('email') }}
                                    </span>

                      <input type="email" class="form-control" v-model="email"
                             :placeholder="$t('email')">
                      <small class="text-danger" v-if="email_errors">{{ email_errors }}
                      </small>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="fa fa-circle"></i>
                                          {{ $t('password') }}
                                    </span>
                      <input type="password" class="form-control" v-model="password"
                             :placeholder="$t('password')">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="fa fa-circle"></i>
                                          {{ $t('password_confirmation') }}
                                    </span>
                      <input type="password" class="form-control"
                             v-model="password_confirmation"
                             :placeholder="$t('password_confirmation')">
                    </div>
                  </div>
                  <div class="form-group col-9">
                    <div class="input-group">
                        <span class="input-group-addon">
                          <i class="fa fa-circle"></i>
                          {{ $t('profile_picture') }}
                        </span>
                      <div class="file-upload">
                        <input type="file" name="FileAttachment2" id="FileAttachment2"
                               class="upload"
                               @change="onFileChange2"/>
                        <input type="text" class="form-control" id="fileuploadurl2" readonly
                               placeholder="">
                        <span><i class="fa fa-file-image-o" style="font-size: 24px;color: #2bb788;"></i></span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group text-center margin-top-20">
                    <button type="button" class="btn btn-main btn-lg" @click="e1 = 3">{{
                        $t('next')
                      }}
                    </button>
                    <span class="bullets">
                            <i class="fa fa-circle"></i>
                            <i class="fa fa-circle active"></i>
                            <i class="fa fa-circle"></i>
                        </span>
                  </div>
                </form>
              </v-stepper-content>
              <!--     end form 2           -->
              <!--      form 3     -->
              <v-stepper-content step="3">


                <div class="login-title">
                  {{ $t('subscription_data') }}
                </div>


                <form>
                  <div class="form-group">
                    <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="fa fa-circle"></i>
                                                  {{ $t('subscription_type') }}
                                            </span>

                      <input type="text" value="individual sessions" class="form-control"
                             readonly>
                      <!--                          <select class="form-control custom-input" v-model="package_id" multiple>-->
                      <!--                            <option value="0" selected disabled v-if="lang == 'en'"> choose subscription type-->
                      <!--                            </option>-->
                      <!--                            <option value="0" selected disabled v-if="lang == 'ar'"> اختار نوع الاشتراك</option>-->
                      <!--                            <option :value="doctorPackage.id" v-for="doctorPackage,index in packages"-->
                      <!--                                    :key="doctorPackage.id" v-if="lang == 'ar'">-->
                      <!--                              {{ doctorPackage.name_ar }}-->
                      <!--                            </option>-->
                      <!--                            <option :value="doctorPackage.id" v-for="(doctorPackage,index) in packages"-->
                      <!--                                    :key="doctorPackage.id" v-if="lang == 'en'">-->
                      <!--                              {{ doctorPackage.name_en }}-->
                      <!--                            </option>-->
                      <!--                          </select>-->
                    </div>
                  </div>
                  <input type="hidden" name="package_id[]" value="2">
                  <div id="addForm" v-for="(data,index) in appointment_data">
                    <div class="form-group">
                      <div class="input-group">
                            <span class="input-group-addon">
                                <i class="fa fa-circle"></i>
                                  {{ $t('available_time') }}
                            </span>
                        <div class="row">
                          <div class="col-xs-12 col-lg-5">
                            <!--                                <datetime v-model="appointment_data[index]['day']" type="date"-->
                            <!--                                          :format="{ year: 'numeric', month: 'long', day: 'numeric' }"-->
                            <!--                                          input-class="form-control custom-input"-->
                            <!--                                          :placeholder="lang == 'en' ? 'choose date' :  'اختار التاريخ'"-->
                            <!--                                          aria-required="true"></datetime>-->
                            <select v-model="appointment_data[index]['day']"
                                    class="form-control custom-input">
                              <option selected
                                      value="">{{ $t('choose_day') }}
                              </option>
                              <option value="Saturday">{{ $t('saturday') }}</option>
                              <option value="Sunday">{{ $t('sunday') }}</option>
                              <option value="Monday">{{ $t('monday') }}</option>
                              <option value="Tuesday">{{ $t('tuesday') }}</option>
                              <option value="Wednesday">{{ $t('wednesday') }}</option>
                              <option value="Thursday">{{ $t('thursday') }}</option>
                              <option value="Friday">{{ $t('friday') }}</option>
                            </select>
                          </div>

                          <div class="col-xs-12 col-lg-5">
                            <datetime type="time"
                                      input-class="form-control custom-input" zone="UTC"
                                      v-model="appointment_data[index]['time']"
                                      :placeholder="current_lang == 'en' ? 'choose time' : 'اختار الوقت'"
                                      aria-required="true"></datetime>
                          </div>
                          <div class="col-xs-12 col-lg-2 text-center">
                            <input type="button" id="addAppointment"
                                   class="form-control btn btn-add" value="add"
                                   @click.prevent="addForm()" v-if="index==0">
                          </div>
                        </div>

                      </div>
                    </div>
                    <div class="form-group">
                      <div class="input-group">
                            <span class="input-group-addon">
                                <i class="fa fa-circle"></i>
                                  {{ $t('session_price') }}
                            </span>

                        <div class="row">
                          <div class="col-xs-12 col-lg-5">
                            <select class="form-control custom-input"
                                    v-model="appointment_data[index]['session_time']"
                                    required>
                              <option value="0" selected disabled> {{
                                  $t('session_time')
                                }}
                              </option>
                              <option value="30">20 {{ $t('minute') }}</option>
                              <option value="60">30 {{ $t('minute') }}</option>
                              <option value="90">45 {{ $t('minute') }}</option>
                              <option value="120">60 {{ $t('minute') }}</option>
                              <option value="120">90 {{ $t('minute') }}</option>
                              <option value="120">120 {{ $t('minute') }}</option>
                            </select>
                          </div>
                          <div class="col-xs-12 col-lg-5">
                            <input type="number" class="form-control custom-input"
                                   :placeholder="$t('session_price')" required
                                   v-model="appointment_data[index]['price']">
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="fa fa-circle"></i>
                                                  {{ $t('subscription_type') }}
                                            </span>

                      <input type="text" value="limited hours" class="form-control" readonly>
                      <!--                          <select class="form-control custom-input" v-model="package_id" multiple>-->
                      <!--                            <option value="0" selected disabled v-if="lang == 'en'"> choose subscription type-->
                      <!--                            </option>-->
                      <!--                            <option value="0" selected disabled v-if="lang == 'ar'"> اختار نوع الاشتراك</option>-->
                      <!--                            <option :value="doctorPackage.id" v-for="doctorPackage,index in packages"-->
                      <!--                                    :key="doctorPackage.id" v-if="lang == 'ar'">-->
                      <!--                              {{ doctorPackage.name_ar }}-->
                      <!--                            </option>-->
                      <!--                            <option :value="doctorPackage.id" v-for="(doctorPackage,index) in packages"-->
                      <!--                                    :key="doctorPackage.id" v-if="lang == 'en'">-->
                      <!--                              {{ doctorPackage.name_en }}-->
                      <!--                            </option>-->
                      <!--                          </select>-->
                    </div>
                  </div>
                  <input type="hidden" name="package_id[]" value="1">
                  <div id="addForm2" v-for="(data,index) in appointment_data2">
                    <div class="form-group">
                      <div class="input-group">
                            <span class="input-group-addon">
                                <i class="fa fa-circle"></i>
                                  {{ $t('available_time') }}
                            </span>
                        <div class="row">
                          <div class="col-xs-12 col-lg-5">
                            <select v-model="appointment_data2[index]['day2']"
                                    class="form-control custom-input">
                              <option selected value="">{{ $t('choose_day') }}</option>
                              <option value="Saturday">{{ $t('saturday') }}</option>
                              <option value="Sunday">{{ $t('sunday') }}</option>
                              <option value="Monday">{{ $t('monday') }}</option>
                              <option value="Tuesday">{{ $t('tuesday') }}</option>
                              <option value="Wednesday">{{ $t('wednesday') }}</option>
                              <option value="Thursday">{{ $t('thursday') }}</option>
                              <option value="Friday">{{ $t('friday') }}</option>
                            </select>
                          </div>

                          <div class="col-xs-12 col-lg-5">
                            <datetime type="time"
                                      input-class="form-control custom-input" zone="UTC"
                                      v-model="appointment_data2[index]['time2']"
                                      :placeholder="$t('choose_time')"
                                      aria-required="true"></datetime>
                          </div>
                          <div class="col-xs-12 col-lg-2 text-center">
                            <input type="button" id="addAppointment2"
                                   class="form-control btn btn-add" value="add"
                                   @click.prevent="addForm2()" v-if="index==0">
                          </div>
                        </div>

                      </div>
                    </div>
                    <div class="form-group">
                      <div class="input-group">
                            <span class="input-group-addon">
                                <i class="fa fa-circle"></i>
                                  {{ $t('session_price') }}
                            </span>
                        <div class="row">
                          <div class="col-xs-12 col-lg-5">
                            <select class="form-control custom-input"
                                    v-model="appointment_data2[index]['session_time2']" required>
                              <option value="0" selected disabled>{{ $t('session_time') }}</option>
                              <option value="30">20 minute</option>
                              <option value="30">30 minute</option>
                              <option value="30">45 minute</option>
                              <option value="60">60 minute</option>
                              <option value="90">90 minute</option>
                              <option value="120">120 minuet</option>
                            </select>
                          </div>
                          <div class="col-xs-12 col-lg-5">
<!--                            <input type="number" class="form-control custom-input"-->
<!--                                   :placeholder="$t('session_price')" required-->
<!--                                   v-model="appointment_data2[index]['price2']">-->
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="input-group">
                            <span class="input-group-addon">

                            </span>
                      <div class="checkbox">
                        <label>
                          <input type="checkbox" required>
                          <span style="padding:0 15px">
                              {{ $t('by_clicking_on_start_i_agree_to_the_terms_and_conditions') }}
                            </span>
                        </label>

                      </div>
                    </div>
                  </div>
                  <div class="form-group text-center margin-top-20">
                    <button type="button" class="btn btn-main btn-lg"
                            style="background: #2bb788 !important;color: #FFFFFF !important;"
                            @click.prevent="formValidate" :disabled="loading">
                      {{ $t('submit') }}
                    </button>
                    <button type="button" class="btn btn-main btn-lg" @click="e1 = 1">
                      {{ $t('back') }}
                    </button>
                    <span class="bullets">
                            <i class="fa fa-circle"></i>
                            <i class="fa fa-circle"></i>
                            <i class="fa fa-circle active"></i>
                        </span>
                  </div>
                </form>
              </v-stepper-content>
              <!--     end form 3           -->
            </v-stepper-items>
            </v-stepper>
          </div>
        </div>
      </div>
      <div class="login-side">
        <div class="login-side-logo join-us">
          <img :src="logo" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//import VoerroTagsInput from '@voerro/vue-tagsinput';
import {Datetime} from 'vue-datetime';

export default {
  layout: 'RegisterLayout',
  head() {
    return {
      title: 'DoctorRegister',
    };
  },
  components: {Datetime},
  data() {
    return {
      e1: 1,
      first_name: '',
      first_name_en: '',
      last_name: '',
      last_name_en: '',
      address: '',
      address_en: '',
      certificates: [],
      certificates_en: [],
      phone: '',
      speciality: [],
      description: '',
      description_en: '',
      specialities: {},
      cv: '',
      photo: '',
      phone_errors: '',
      email: '',
      password: '',
      password_confirmation: '',
      formErrors: [],
      email_errors: '',
      appointment_data: [{'time': '', 'day': '', 'price': '', 'session_time': 0}],
      appointment_data2: [{'time2': '', 'day2': '', 'price2': '', 'session_time2': 0}],
      package_id: [],
      packages: {},
      logo: '',
      types: {},
      type: '',
      loading: false
    }
  },
  mounted() {
    this.getSpecialities();
    this.getPackages();
    this.getGeneralSettings()
    this.getTypes()
  },
  methods: {
    getTypes() {
      this.$axios.get('/website/doctors/types/get')
        .then(response => {
          this.types = response.data.data
        })
    },
    getSpecialities() {
      this.$axios.$get('/website/specialities')
        .then(response => {
          this.specialities = response.data;
        })
    },
    onFileChange(e) {
      console.log('file changes');
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return
      }
      this.createImage(files[0])
    },
    createImage(file) {
      var cv = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.cv = e.target.result
        console.log(vm.cv);
      };
      reader.readAsDataURL(file)
    },
    onFileChange2(e) {
      console.log('file changes');
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return
      }
      this.createImage2(files[0])
    },
    createImage2(file) {
      var photo = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.photo = e.target.result
        console.log(vm.photo);
      };
      reader.readAsDataURL(file)
    },
    getPackages() {
      this.$axios.$get('/website/getPackages')
        .then(response => {
          this.packages = response.data;
        })
    },
    addForm() {
      this.appointment_data.push({'time': '', 'day': '', 'price': '', 'session_time': 0});
    },
    addForm2() {
      this.appointment_data2.push({'time2': '', 'day2': '', 'price2': '', 'session_time2': 0});
    },
    formValidate(e) {
      this.formErrors = [];
      if (!this.first_name) {
        if (this.current_lang == 'en') {
          this.formErrors.push('first name can not be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('الاسم الاول مطلوب');
        }

      }
      if (this.first_name && this.first_name.length < 3) {
        if (this.current_lang == 'en') {
          this.formErrors.push('first name too short');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push(' اسم قصير جدا  ');
        }
      }
      if (!this.first_name_en) {
        if (this.current_lang == 'en') {
          this.formErrors.push('first name can not be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('الاسم الاول مطلوب');
        }

      }
      if (this.first_name_en && this.first_name_en.length < 3) {
        if (this.current_lang == 'en') {
          this.formErrors.push('first name too short');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push(' اسم قصير جدا  ');
        }
      }
      if (!this.last_name) {
        if (this.current_lang == 'en') {
          this.formErrors.push('last name can not be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('الاسم الاخير مطلوب');
        }
      }
      if (this.last_name && this.last_name.length < 3) {
        if (this.current_lang == 'en') {
          this.formErrors.push('last name too short');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('الاسم الاخير قصير جدا');
        }
      }
      if (!this.last_name_en) {
        if (this.current_lang == 'en') {
          this.formErrors.push('last name can not be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('الاسم الاخير مطلوب');
        }
      }
      if (this.last_name_en && this.last_name_en.length < 3) {
        if (this.current_lang == 'en') {
          this.formErrors.push('last name too short');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('الاسم الاخير قصير جدا');
        }
      }
      if (!this.address) {
        if (this.current_lang == 'en') {
          this.formErrors.push('address can not be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('العنوان مطلوب');
        }
      }
      if (this.address && this.address.length < 5) {
        if (this.current_lang == 'ar') {
          this.formErrors.push(' العنوان قصير جدا ');
        } else if (this.current_lang == 'en') {
          this.formErrors.push('address is too short');
        }

      }
      if (!this.address_en) {
        if (this.current_lang == 'en') {
          this.formErrors.push('address can not be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('العنوان مطلوب');
        }
      }
      if (this.address_en && this.address_en.length < 5) {
        if (this.current_lang == 'ar') {
          this.formErrors.push(' العنوان قصير جدا ');
        } else if (this.current_lang == 'en') {
          this.formErrors.push('address is too short');
        }

      }
      if (!this.certificates) {
        if (this.current_lang == 'en') {
          this.formErrors.push('certificates can not be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('الشهادات العلميه مطلوبه');
        }
      }
      if (!this.certificates_en) {
        if (this.current_lang == 'en') {
          this.formErrors.push('certificates can not be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('الشهادات العلميه مطلوبه');
        }
      }
      if (!this.phone) {
        if (this.current_lang == 'en') {
          this.formErrors.push('phone can not be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('التليفون مطلوب');
        }

      }
      if (this.phone && this.phone.length < 11) {
        if (this.current_lang == 'en') {
          this.formErrors.push('phone incorrect');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('رقم التليفون غير صحيح');
        }

      }
      if (!this.description) {
        if (this.current_lang == 'en') {
          this.formErrors.push('description can not be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('الوصف مطلوب');
        }

      }
      if (this.description && this.description.length < 11) {
        if (this.current_lang == 'en') {
          this.formErrors.push('description too short');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push(' الوصف قصير جدا ');
        }
      }
      if (!this.description_en) {
        if (this.current_lang == 'en') {
          this.formErrors.push('description can not be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('الوصف مطلوب');
        }

      }
      if (this.description_en && this.description_en.length < 11) {
        if (this.current_lang == 'en') {
          this.formErrors.push('description too short');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push(' الوصف قصير جدا ');
        }
      }
      if (!this.speciality) {
        if (this.current_lang == 'en') {
          this.formErrors.push('speciality required');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('التخصص مطلوب');
        }
      }
      if (!this.email) {
        if (this.current_lang == 'en') {
          this.formErrors.push('email can not be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('الايميل مطلوب ');
        }

      }
      if (!this.password) {
        if (this.current_lang == 'en') {
          this.formErrors.push('password can not be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('الرقم السري مطلوب');
        }
      }
      if (this.password && this.password.length < 6) {
        if (this.current_lang == 'en') {
          this.formErrors.push('password can not be less than 6');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('كلمه السر اقل من 6');
        }
      }
      if (!this.password_confirmation) {
        if (this.current_lang == 'en') {
          this.formErrors.push('password confirmation must be confirmed');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('يرجي تاكيد كلمه السر');
        }
      }
      if (this.password_confirmation && this.password != this.password_confirmation) {
        if (this.current_lang == 'en') {
          this.formErrors.push('passwords is not matched');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push(' كلمه السر غير متطابقه ');
        }

      }
      if (this.appointment_data.length == 0 && this.appointment_data2.length == 0) {
        if (this.current_lang == 'en') {
          this.formErrors.push('no appointments added');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push(' يجب ادخال مواعيد لاحدي الباكدجات ');
        }

      }
      if (!this.type) {
        if (this.current_lang == 'en') {
          this.formErrors.push('no type added');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('اضف اللقب ');
        }
      }

      if (this.formErrors.length == 0) {
        this.registerDoctor();
      }
      e.preventDefault();
    },
    registerDoctor() {
      this.loading = true
      this.$axios.$post('/doctors/register', {
        first_name: this.first_name,
        first_name_en: this.first_name_en,
        last_name: this.last_name,
        last_name_en: this.last_name_en,
        address: this.address,
        address_en: this.address_en,
        speciality: this.speciality,
        certificates: this.certificates,
        certificates_en: this.certificates_en,
        description: this.description,
        description_en: this.description_en,
        phone: this.phone,
        email: this.email,
        password: this.password,
        cv: this.cv,
        photo: this.photo,
        appointment_data: this.appointment_data ? this.appointment_data : '',
        appointment_data2: this.appointment_data2 ? this.appointment_data2 : '',
        doctor_id: this.doctor_id,
        type: this.type
      })
        .then(response => {
          console.log(response.message)
          if (response.status == '500') {
            this.loading = false
            this.formErrors = [];
            this.phone_errors = '';
            this.email_errors = '';
            // this.formErrors.push(response.message)
            if (response.message['phone']) {
              // this.formErrors.push(response.message['phone'][0])
              if (this.current_lang == 'en') {
                this.phone_errors = 'phone is already been taken';
                this.formErrors.push('phone is already been taken')
              } else if (this.current_lang == 'ar') {
                this.phone_errors == 'رقم التليفون موجود سابقا';
                this.formErrors.push('رقم التليفون التليفون موجود سابقا')
              }
            }
            if (response.message['email']) {
              this.formErrors.push(response.message['email'][0])
              if (this.current_lang == 'en') {
                this.email_errors = 'email is already been taken';
              } else if (this.current_lang == 'ar') {
                this.email_errors = 'الايميل موجود سابقا';
              }
            }
          } else if (response.status == '200') {
            this.formErrors = [];
            this.email_errors = '';
            this.phone_errors = '';
            this.new_login();

          }

        })

    },

    async new_login() {
      const email = this.email;
      const password = this.password;
      try {
        let response;
        let vm = this
        response = await this.$auth.loginWith('user', {data: {email, password}})
          .then(() => {
            this.message = true;
            this.$router.push(this.localePath('/doctors/dashboard/account-suspended'))

          }).catch(e => {
            this.message = true;
            this.$router.push(this.localePath('/doctors/dashboard/account-suspended'))
          });
      } catch (err) {
        console.log(err)
      }
    },
    getGeneralSettings() {
      this.$axios.$get('/setting')
        .then(response => {
          this.logo = response.data.footer_logo;
        })
    },

  },
  computed: {
    current_lang() {
      return this.$i18n.locale
    }
  },
}
</script>
<style scoped>
.login-wrapper {
  margin-top: 0 !important;
}

.v-stepper {
  box-shadow: none !important;
}

body {
  padding-top: 0px !important;
}

.register-page {
  padding-top: 0px !important;
}

</style>
