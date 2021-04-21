<template>
  <div :class="{rtl : current_lang === 'ar'}">
    <div v-if="loading" class="loading-page">
      <div class="loading"></div>
    </div>
    <!-- Content-->
    <div class="login-wrapper">
      <div class="login-form">
        <div class="container-fluid">
          <div class="col-xs-12 col-sm-10 col-sm-push-1">
            <br><br><br><br><br><br><br><br><br>
            <div class="alert alert-danger" role="alert" v-if="formErrors.length > 0">
              <ul v-for="error,index in formErrors" :key="error.index">
                <li>{{ error }}</li>
              </ul>
            </div>
            <div class="alert alert-danger" v-if="error_message">
              {{ error_message }}
            </div>
            <form>
              <div class="form-group">
                <div class="input-group">
                                    <span class="input-group-addon">
                                <i class="fa fa-circle"></i>
                                {{ $t('email') }}
                            </span>
                  <input type="text" class="form-control" v-model="email" placeholder="person@mail.com">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                                    <span class="input-group-addon">
                                <i class="fa fa-circle"></i>
                                 {{ $t('password') }}
                            </span>
                  <input type="password" class="form-control" v-model="password" placeholder="******">
                </div>
                <div class="text-right">
<!--                                    <span class="forget-password">-->
<!--                                <nuxt-link :to="localePath('/Forget-password')">  {{ $t('forget_password') }}</nuxt-link>-->
<!--                            </span>-->

                  <!--            doctors register      -->
                  <span class="new-register" v-if="query == 'doctors'">
                                        <nuxt-link :to="localePath('/doctors/Register-1')">
                        {{ $t('new_register') }}
                    </nuxt-link>

                  </span>

                  <!--    user register   -->
                  <span class="new-register" v-if="query == 'user'">
                                        <nuxt-link :to="localePath('/User/Register')">
                          {{ $t('new_register') }}
                    </nuxt-link>

                  </span>

                  <!--        school register          -->
                  <span class="new-register" v-if="query == 'schools'">
                                        <nuxt-link :to="localePath('/schools/Register-1')">
                          {{ $t('new_register') }}
                    </nuxt-link>

                  </span>

                </div>
              </div>
              <div class="form-group text-center margin-top-40">
                <button type="button" class="btn btn-main btn-lg"
                        @click.prevent="validateForm" :disabled="loading"> {{ $t('login') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="login-side">
        <div class="login-side-logo">
          <img :src="logo" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'RegisterLayout',
  head() {
    return {
      title: 'Login',
    };
  },
  data() {
    return {
      email: '',
      password: '',
      formErrors: [],
      user: {},
      error_message: '',
      logo:"",
      loading:false
    }
  },
  mounted() {
    this.getGeneralSettings()
  },
  methods: {
    async new_login() {
      const email = this.email;
      const password = this.password;
      try {
        let response;
        let vm = this
        response = await this.$auth.loginWith('user', {data: {email, password}})
          .then(() => {
            this.message = true;
            //this.error_type = 'success';
            // this.error_message = 'تم التسجيل بنجاح';
            //this.$router.push('/employer/dashboard');
            let vm = this;
            setInterval(function () {
              //vm.$router.go()
            }, 1000)
          }).catch(e => {
            this.loading=false
            this.message = true;
            console.log(this.message)
            //this.error_type = 'error';
            this.error_message = 'خطأ في البريد أو كلمة المرور او اكونت معلق';
          });
      } catch (err) {
        console.log(err)
      }
      await this.setUserType();
    },
    setUserType() {
      let user_type;
      // console.log(this.$auth.user)
      let user_status;
      user_type = this.$auth.user.user.user_type_id;
      user_status = this.$auth.user.user.is_suspended;
      this.user = this.$auth.user.user
      console.log(this.user);

      //console.log(user_type);
      if (user_type == 2) {
        if (user_status == 0) {
          this.$router.push(this.localePath('doctors/dashboard/account-suspended'))
        } else {
          this.$router.push('doctors/dashboard');
        }

      } else if (user_type == 3) {
        let student_complete_data = this.$auth.user.student.flag;
        let student_school_payment_status = this.$auth.user.school.status;
        let student_school_suspended_status = this.$auth.user.school_user.is_suspended
        console.log(this.user.is_suspended)
        if (student_complete_data == 0) {
          this.$router.push(this.localePath('/students/Login-2'))
        } else if (student_complete_data == 1) {
          if (student_school_payment_status == 1 && student_school_suspended_status == 1 && this.user.is_suspended == 1) {
            this.$router.push(this.localePath('/students/dashboard'))
          } else if (student_school_payment_status == 0 || student_school_suspended_status == 0 || this.user.is_suspended == 0) {
            this.$router.push(this.localePath('/students/dashboard/account-suspended'))
          }

        }
      } else if (user_type == 4) {
        let school_payment_suspend_status;
        school_payment_suspend_status = this.$auth.user.user.school.payment_suspend;
        console.log(this.school_payment_suspend_status)
        if (user_status == 0 || school_payment_suspend_status == 0) {
          this.$router.push(this.localePath('/schools/dashboard/account-suspended'))
        } else {
          this.$router.push(this.localePath('/schools/dashboard'))
        }

      } else if (user_type == 5) {
        this.$router.push(this.localePath('/User/Profile'))
      }
    },
    validateForm(e) {
      this.formErrors = [];
      if (!this.email) {
        if (this.current_lang == 'en') {
          this.formErrors.push('email can not be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('البريد الاليكتروني مطلوب');
        }
      }
      if (!this.password) {
        if (this.current_lang == 'en') {
          this.formErrors.push('password can not be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('الرقم السري مطلوب');
        }

      }
      if (this.formErrors.length == 0) {
        this.loading=true
        this.new_login();
      }
      e.preventDefault();
    },
    getGeneralSettings() {
      this.$axios.$get('/setting')
        .then(response => {
          this.logo = response.data.footer_logo;
        })
    }
  },
  computed: {
    current_lang() {
      return this.$i18n.locale
    },
    query() {
      let path = this.$route.fullPath;
      let m = path.includes("doctors")
      let s = path.includes("schools")
      if (m) {
        return 'doctors'
      } else if (s) {
        return 'schools'
      }else{
        return 'user'
      }
    }
  },
}
</script>


