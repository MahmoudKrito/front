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
            <div class="alert alert-danger" v-if="formErrors.length > 0">
              <ul>
                <li v-for="(error,index) in formErrors">{{ error }}</li>
              </ul>
            </div>
            <form>
              <div class="form-group">
                <div class="input-group">
                                    <span class="input-group-addon">
                                <i class="fa fa-circle"></i>
                                {{ $t('password') }}
                            </span>
                  <input type="text" class="form-control" v-model="password" :placeholder="$t('enter_password')">
                </div>
              </div>

              <div class="form-group">
                <div class="input-group">
                                    <span class="input-group-addon">
                                <i class="fa fa-circle"></i>
                                {{ $t('password_confirmation') }}
                            </span>
                  <input type="text" class="form-control" v-model="password_confirmation"
                         :placeholder="$t('password_confirmation')">
                </div>
                <div class="text-right">
                                    <span class="forget-password">
                                <nuxt-link :to="localePath('/Login')">  {{ $t('login') }}</nuxt-link>
                            </span>
                </div>

              </div>


              <div class="form-group text-center margin-top-40">
                <button type="button" class="btn btn-main btn-lg"
                        @click.prevent="validateForm" :disabled="loading"> {{ $t('submit') }}
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
      formErrors: [],
      logo: "",
      loading: false,
      message: '',
      password_confirmation: '',
      password: '',
      email: this.$store.state.forget_email,
      new_password:''
    }
  },
  mounted() {
    this.getGeneralSettings()
    console.log(this.$store.state.forget_email)
  },
  methods: {
    async changePassword() {
      // try{
      //   let response;
      //   response = await this.$axios.post('/website/update-password', {
      //     email: this.email
      //   }).then(response => {
      //     console.log(response.data.data)
      //     this.email = response.data.data.email
      //     this.password = response.data.data.password
      //     this.new_login(this.email,this.password)
      //     // this.$router.push(this.localePath('/Login'))
      //   })
      // }catch (err) {
      //   console.log(err)
      // }
      this.loading = true
      this.$axios.post('/website/update-password', {
        email: this.email
      }).then(response => {
        console.log(response.data.data)
        // this.new_password=response.data.data.password
        // this.$router.push(this.localePath('/Login'))
      })
      await this.new_login()
    },
    validateForm(e) {
      e.preventDefault()
      this.formErrors = []
      if (!this.password) {
        if (this.current_lang == 'en') {
          this.formErrors.push('enter new password')
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('ادخل كلمه السر الجديده')
        }
      }
      if (this.password && this.password.length < 6) {
        if (this.current_lang == 'en') {
          this.formErrors.push('your password is too short')
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('كلمه السر قصيره')
        }
      }
      if (!this.password_confirmation) {
        if (this.current_lang == 'en') {
          this.formErrors.push('please confirm your password')
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('برجاء تاكدي كلمه السر')
        }
      }
      if (this.password_confirmation && this.password_confirmation != this.password) {
        if (this.current_lang == 'en') {
          this.formErrors.push('password is not matched')
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('كلمه السر غير متطابقه')
        }
      }
      if (this.formErrors.length == 0) {
        this.changePassword()
      }

    },
    async new_login() {
      try {
        let response;
        let vm = this
        const email = this.email;
        const password = this.password;
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
            this.loading = false
            this.message = true;
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
        let student_school_payment_status = this.$auth.user.school.payment_suspend;
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
    }
  },
}
</script>


