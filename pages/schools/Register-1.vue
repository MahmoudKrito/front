<template>
  <div>
    <div v-if="loading" class="loading-page">
      <div class="loading"></div>
    </div>
    <!-- Content-->
    <div class="login-wrapper" :class="{rtl:current_lang === 'ar'}">
      <div class="login-form" :class="{rtl:current_lang === 'ar'}">
        <div class="container-fluid">
          <div class="col-xs-12 col-sm-10 col-sm-push-1" :class="{rtl:current_lang === 'ar'}">
            <div class="login-logo">
              <img src="https://api.promental.net/images/website/schools.svg" alt="" class="hidden-xs hidden-sm"
                   v-if="current_lang == 'ar'">
              <img src="https://api.promental.net/images/website/schools_en.png" alt="" class="hidden-xs hidden-sm"
                   v-if="current_lang == 'en'">
              <img src="https://api.promental.net/images/website/schools-white.svg" alt=""
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
                  <v-card
                    class="mb-12"
                    color="grey lighten-1"
                    height="450px">

                    <div class="login-title">
                      {{ $t('school_info') }}
                    </div>

                    <form>
                      <div class="form-group">
                        <div class="input-group">
                           <span class="input-group-addon"><i class="fa fa-circle"></i>
                                           {{ $t('school_name_ar') }}
                           </span>
                          <input type="text" class="form-control" v-model="school_name"
                                 :placeholder="$t('school_name_ar')">
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="input-group">
                           <span class="input-group-addon"><i class="fa fa-circle"></i>
                                           {{ $t('school_name_en') }}
                           </span>
                          <input type="text" class="form-control" v-model="school_name_en"
                                 :placeholder="$t('school_name_en')">
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="input-group">
                          <span class="input-group-addon"><i class="fa fa-circle"></i>{{
                              $t('school_address_ar')
                            }}</span>

                          <input type="text" class="form-control" v-model="school_address"
                                 :placeholder="$t('school_address_ar')">
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="input-group">
                          <span class="input-group-addon"><i class="fa fa-circle"></i>{{
                              $t('school_address_en')
                            }}</span>

                          <input type="text" class="form-control" v-model="school_address_en"
                                 :placeholder="$t('school_address_en')">
                        </div>
                      </div>

                      <div class="form-group">
                        <div class="input-group">
                               <span class="input-group-addon"><i class="fa fa-circle"></i>{{ $t('school_number') }}
                                </span>
                          <input type="text" class="form-control" v-model="school_number"
                                 :placeholder="$t('school_number')">
                        </div>
                      </div>


                      <div class="form-group">
                        <div class="input-group">
                             <span class="input-group-addon">
                                    <i class="fa fa-circle"></i>  {{ $t('students_number') }} </span>
                          <input type="text" class="form-control" v-model="students_number"
                                 :placeholder="$t('students_number')">
                        </div>
                      </div>

                      <div class="form-group">
                        <div class="input-group">
                                    <span class="input-group-addon">
                                <i class="fa fa-circle"></i>
                                {{ $t('avatar') }}
                            </span>
                          <div class="file-upload">
                            <input type="file" name="FileAttachment" id="FileAttachment" class="upload"
                                   @change="onFileChange" :placeholder="$t('avatar')"/>
                            <input type="text" class="form-control" id="fileuploadurl" readonly
                                   placeholder="">
                            <span><i class="fa fa-file-image-o" style="font-size: 24px;color: #2bb788;"></i></span>
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
                  </v-card>
                </v-stepper-content>
                <!--    end form 1   -->
                <!--     form 2           -->
                <v-stepper-content step="2">
                  <v-card
                    class="mb-12"
                    color="grey lighten-1"
                    height="500px">

                    <div class="login-title">
                      {{ $t('account_info') }}
                    </div>

                    <form>
                      <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-circle"></i>{{ $t('first_name') }}
                            </span>
                          <input type="text" class="form-control" v-model="first_name" :placeholder="$t('first_name')">
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="input-group">
                               <span class="input-group-addon">
                                <i class="fa fa-circle"></i>
                                 {{ $t('last_name') }}
                            </span>
                          <input type="text" class="form-control" v-model="last_name" :placeholder="$t('last_name')">
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="input-group">
                             <span class="input-group-addon"><i class="fa fa-circle"></i>{{ $t('phone_number') }}
                            </span>
                          <input type="text" class="form-control" v-model="phone" :placeholder="$t('phone_number')">
                          <small class="text-danger" v-if="phone_error">{{ phone_error }}</small>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="input-group">
                             <span class="input-group-addon"><i class="fa fa-circle"></i>
                                {{ $t('email') }}
                            </span>
                          <input type="email" class="form-control" v-model="email" :placeholder="$t('email')">
                          <small class="text-danger" v-if="email_error">{{ email_error }}</small>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="input-group">
                          <span class="input-group-addon"><i class="fa fa-circle"></i>{{ $t('password') }}
                            </span>
                          <input type="password" class="form-control" v-model="password" :placeholder="$t('password')">
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="input-group">
                                 <span class="input-group-addon">
                                <i class="fa fa-circle"></i>
                                  {{ $t('password_confirmation') }}
                            </span>
                          <input type="password" class="form-control"
                                 v-model="password_confirmation" :placeholder="$t('password_confirmation')">
                        </div>
                      </div>
                      <div class="form-group text-center margin-top-20">
                        <button type="button" class="btn btn-main btn-lg" @click="e1 = 3">
                          {{ $t('next') }}
                        </button>
                        <span class="bullets">
                            <i class="fa fa-circle"></i>
                            <i class="fa fa-circle active"></i>
                            <i class="fa fa-circle"></i>
                        </span>
                      </div>
                    </form>
                  </v-card>
                </v-stepper-content>
                <!--       end form 2  -->
                <!--      form 3          -->
                <v-stepper-content step="3">

                  <div class="login-title">
                    {{ $t('subscription_information') }}
                  </div>
                  <form>
                    <div class="form-group text-center margin-bottom-40">
                      <div class="row">
                        <div class="col-xs-3">
                            <span class="input-group-addon">
                              {{ $t('name') }}
                            </span>
                        </div>
                        <div class="col-xs-3">
                            <span class="input-group-addon">
                              {{ $t('sessions_number') }}
                            </span>
                        </div>
                        <div class="col-xs-3">
                            <span class="input-group-addon">
                              {{ $t('price') }}
                            </span>
                        </div>
                        <div class="col-xs-3">
                            <span class="input-group-addon">
                              {{ $t('students_number') }}
                            </span>
                        </div>
                      </div>
                    </div>
                    <div class="form-group text-center margin-top-20"
                         v-for="(schoolPackage,index) in packages" :key="schoolPackage.id">
                      <div class="input-group">
                            <span class="input-group-addon" v-if="current_lang=='ar'">
                              <input type="checkbox" :value="schoolPackage.id" :placeholder="$t('name')">
                              {{ schoolPackage.name_ar }}
                            </span>
                        <span class="input-group-addon" v-if="current_lang=='en'">
                            <input type="checkbox" :value="schoolPackage.id" :placeholder="$t('name')">
                          {{ schoolPackage.name_en }}
                        </span>
                        <div class="row">
                          <div class="col-xs-4">
                            <input type="number" :value="schoolPackage.sessions_number"
                                   :placeholder="$t('sessions_number')" class="form-control" readonly>
                          </div>
                          <div class="col-xs-4">
                            <input type="number" class="form-control" name=""
                                   :placeholder="schoolPackage.price" readonly>
                          </div>
                          <div class="col-xs-4">
                            <input type="number" class="form-control"
                                   :max="students_number" :min="1" value="1"
                                   @change="addPackage($event.target,schoolPackage.price,schoolPackage.sessions_number,index,schoolPackage.id)"
                                   name="students_number2" :placeholder="$t('students_number')">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group text-center margin-top-20">
                      <div class="input-group">
                         <span class="input-group-addon">
                              <i class="fa fa-circle"></i> {{ $t('total') }}
                         </span>
                        <input type="text" class="form-control" name="" :value="total_price" readonly>
                      </div>
                    </div>
                    <div class="form-group text-center margin-top-20">
                      <div class="input-group">
                         <span class="input-group-addon">
                              <i class="fa fa-circle"></i> {{ $t('subscription') }}
                         </span>
                        <select class="form-control" v-model="subscription_id" :placeholder="$t('subscription')" required>
                          <option value="" selected> {{ $t('choose_subscription') }}</option>
                          <option :value="subscription.id" :key="subscription[value]" v-for="(subscription,value) in subscriptions">
                            {{current_lang=='ar'? subscription.name_ar:subscription.name_en }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group text-center margin-top-20">
                      <div class="input-group">
                         <span class="input-group-addon">
                              <i class="fa fa-circle"></i> {{ $t('payment_methods') }}
                         </span>
                        <select class="form-control" v-model="payment_method" :placeholder="$t('payment_methods')" required>
                          <option value="" selected> {{ $t('choose_payment_method') }}</option>
                          <option :value="payment.type" :key="payment[value]" v-for="(payment,value) in payments">
                            {{ current_lang=='ar'? payment.name_ar:payment.name_en }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group text-center margin-top-20">
                      <div class="input-group">
                        <span class="input-group-addon"></span>
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

                      <button type="button" class="btn btn-main btn-lg" @click.prevent="formValidate"
                              :disabled="loading" style="background: #2bb788 !important;color: #FFFFFF !important;">
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
                <!--       end form 3         -->
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
import $ from 'jquery'

export default {
  layout: 'RegisterLayout',
  head() {
    return {
      title: 'SchoolRegister',
      bodyAttrs: {
        class: 'register-page'
      }
    }
  },
  data() {
    return {
      e1: 1,
      school_name: '',
      school_name_en: '',
      school_number: '',
      school_address: '',
      school_address_en: '',
      students_number: '',
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      phone_error: '',
      email_error: '',
      formErrors: [],
      password: '',
      password_confirmation: '',
      school_package: [],
      sessions_number: [],
      packages: {},
      subscriptions: {},
      subscription_id: '',
      payment_method: '',
      payments: '',
      price: [],
      packages_categories_id: [],
      students_number2: [],
      message: false,
      total: [],
      logo: '',
      avatar: '',
      loading: false
    }
  },
  mounted() {
    this.getSchoolPackageCategories();
    this.getallsubscriptions();
    this.gelallpaymentmethods();
    this.getGeneralSettings();

  },
  methods: {
    onFileChange(e) {
      console.log('file changes');
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return
      }
      this.createImage(files[0])
    },
    createImage(file) {
      var avatar = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.avatar = e.target.result
        console.log(vm.avatar);
      };
      reader.readAsDataURL(file)
    },
    getSchoolPackageCategories() {
      this.$axios.$get('/website/schools/getPackageCategories')
        .then(response => {
          this.packages = response.data;
          console.log(this.packages);
        })
    },
    getallsubscriptions() {
      this.$axios.$get('/website/schools/gelallsubscriptions')
        .then(response => {
          this.subscriptions = response.data;
          console.log(this.subscriptions);
        })
    },
    gelallpaymentmethods() {
      this.$axios.$get('/website/schools/gelallpaymentmethods')
        .then(response => {
          this.payments = response.data;
          console.log(this.payments);
        })
    },
    addPackage(el, price, number, index, id) {
      console.log(id,this.students_number,el.value);
      if(parseInt(el.value) > parseInt(this.students_number) || parseInt(el.value) <= 0){
        el.value = this.students_number;
      }
      if(parseInt(el.value) > 0) {
        if (this.total.length > 0 && this.packages_categories_id.indexOf(id) >= 0) {
          var ind = this.packages_categories_id.indexOf(id);
          console.log(ind);
          if (ind >= 0) {
            this.total[ind] = price * number * parseInt(el.value);
            this.students_number2[ind] = parseInt(el.value);
          } else {
            this.total.push(price * number * parseInt(el.value));
            this.packages_categories_id.push(id)
            this.students_number2.push(parseInt(el.value))
          }
        } else {
          this.total.push(price * number * parseInt(el.value));
          this.packages_categories_id.push(id)
          this.students_number2.push(parseInt(el.value))
        }
        console.log(this.total, price, number, parseInt(el.value), id, this.packages_categories_id.indexOf(id))
      }
    },
    formValidate(e) {
      this.formErrors = [];
      if (!this.subscription_id) {
        if (this.current_lang == 'en') {
          this.formErrors.push('Subscription is required');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('الاشتراك مطلوب');
        }
      }
      if (!this.payment_method) {
        if (this.current_lang == 'en') {
          this.formErrors.push('payment_method is required');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('اختر طريقه دفع ');
        }
      }
      if (!this.school_name) {
        if (this.current_lang == 'en') {
          this.formErrors.push('school name can not be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('اسم المدرسه مطلوب ');
        }
      }
      if (!this.school_name_en) {
        if (this.current_lang == 'en') {
          this.formErrors.push('school name en can not be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('اسم المدرسه باالانجليزيه مطلوب ');
        }
      }
      if (this.school_name && this.school_name.length < 3) {
        if (this.current_lang == 'en') {
          this.formErrors.push('too short school name');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('اسم المدرسه قصير جدا');
        }
      }
      if (this.school_name_en && this.school_name_en.length < 3) {
        if (this.current_lang == 'en') {
          this.formErrors.push('too short school name en');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('اسم المدرسه بالانجليزيه قصير جدا');
        }
      }
      if (!this.school_number) {
        if (this.current_lang == 'en') {
          this.formErrors.push('school number can not be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('رقم المدرسه مطلوب');
        }
      }
      if (this.school_number && this.school_number < 0) {
        if (this.current_lang == 'en') {
          this.formErrors.push('wrong school number');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('رقم المدرسه غير صحيح ');
        }
      }
      if (!this.school_address) {
        if (this.current_lang == 'en') {
          this.formErrors.push('school address can not be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('عنوان المدرسه غير صحيح');
        }
      }
      if (!this.school_address_en) {
        if (this.current_lang == 'en') {
          this.formErrors.push('school address en can not be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('عنوان المدرسه بالانجليزيه غير صحيح');
        }
      }
      if (this.school_address && this.school_address.length < 3) {
        if (this.current_lang == 'en') {
          this.formErrors.push('school address too short');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('عنوان المدرسه خاطئ');
        }
      }
      if (this.school_address_en && this.school_address_en.length < 3) {
        if (this.current_lang == 'en') {
          this.formErrors.push('school address En too short');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('عنوان المدرسه بالنجليزيه خاطئ');
        }
      }
      if (!this.students_number) {
        if (this.current_lang == 'en') {
          this.formErrors.push('students number can not be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('عدد الطلاب مطلوب');
        }

      }
      if (this.students_number && this.students_number < 0) {
        if (this.current_lang == 'en') {
          this.formErrors.push('wrong students number');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('  عدد الطلاب خطا');
        }

      }
      if (!this.first_name) {
        if (this.lang == 'en') {
          this.formErrors.push('name can not be empty');
        } else if (this.lang == 'ar') {
          this.formErrors.push('الاسم مطلوب');
        }
      }
      if (this.first_name && this.first_name.length < 3) {
        if (this.current_lang == 'en') {
          this.formErrors.push('name is too short');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('الاسم قصير جدا');
        }
      }
      if (!this.last_name) {
        if (this.current_lang == 'ar') {
          this.formErrors.push('الاسم مطلوب');
        } else if (this.current_lang == 'en') {
          this.formErrors.push('last name can not be empty');
        }
      }
      if (this.last_name && this.last_name.length < 3) {
        if (this.current_lang == 'ar') {
          this.formErrors.push('الاسم قصير جدا ');
        } else if (this.current_lang == 'en') {
          this.formErrors.push('last name is too short');
        }
      }
      if (!this.password) {
        if (this.current_lang == 'en') {
          this.formErrors.push('password can not be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('الرقم السري مطلوب ');
        }

      }
      if (this.password && this.password.length < 6) {
        if (this.current_lang == 'en') {
          this.formErrors.push('password less than 6');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('كلمه السراقل من 6');
        }
      }
      if (!this.email) {
        if (this.current_lang == 'en') {
          this.formErrors.push('email can not be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('الايميل مطلوب');
        }
      }
      if (!this.phone) {
        if (this.current_lang == 'en') {
          this.formErrors.push('phone can not be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('رقم التليفون مطلوب ');
        }
      }
      if (this.packages_categories_id.length == 0) {
        if (this.current_lang == 'en') {
          this.formErrors.push('select at least one package');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('اختار باكدج واحده علي الاقل ');
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

      if (this.formErrors.length == 0) {
        this.schoolRegister();
      }
      e.preventDefault();
    },
    schoolRegister() {
      this.loading = true
      this.$axios.$post('/school/register', {
        first_name: this.first_name,
        last_name: this.last_name,
        phone: this.phone,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
        school_name: this.school_name,
        school_name_en: this.school_name_en,
        students_number: this.students_number,
        school_number: this.school_number,
        school_address: this.school_address,
        school_address_en: this.school_address_en,
        packages_categories_id: this.packages_categories_id,
        sessions_number: this.sessions_number,
        total_price: this.total_price,
        students_number2: this.students_number2,
        avatar: this.avatar,
        subscription_id: this.subscription_id,
        payment_method: this.payment_method,

      })
        .then(response => {
          if (response.status == '500') {
            this.loading = false
            if (response.message['email']) {
              this.formErrors.push(response.message['email'][0])
            } else if (response.message['phone']) {
              this.formErrors.push(response.message['phone'][0])
            }
            if (response.message.subscription_id) {
              if (this.current_lang == 'en') {
                this.formErrors.push('Subscription is required');
              } else if (this.current_lang == 'ar') {
                this.formErrors.push('الاشتراك مطلوب');
              }
            }
            if (response.message.phone) {
              if (this.current_lang == 'en') {
                this.phone_error = 'phone is already taken'
              } else if (this.current_lang == 'ar') {
                this.phone_error = 'رقم التليفون موجود بالفعل'
              }
            }
            if (response.message.email) {
              if (this.current_lang == 'en') {
                this.email_error = 'email is already taken'
              } else if (this.current_lang == 'ar') {
                this.email_error = 'الايميل موجود بالفعل'
              }
            }
          } else if (response.status == '200') {
            console.log(response)
            this.formErrors = [];
            this.email_error = '';
            this.phone_error = ''
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
            // if (this.current_lang == 'en') {
            //   this.$swal('register completed');
            // } else if (this.current_lang == 'ar') {
            //   this.$swal('تم التسجيل بنجاح ');
            // }
            this.$router.push(this.localePath('/schools/dashboard/account-suspended'))


            return true;
          }).catch(e => {
            this.loading = false
            this.message = true;
            // if (this.current_lang == 'en') {
            //   this.$swal('register completed');
            // } else if (this.current_lang == 'ar') {
            //   this.$swal('تم التسجيل بنجاح ');
            // }
            this.$router.push(this.localePath('/schools/dashboard/account-suspended'))
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
    }
  },
  computed: {
    total_price() {
      return this.total.reduce((a, b) => a + b, 0);
    },
    current_lang() {
      return this.$i18n.locale
    },
  }
}
</script>

<style scoped>
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
