<template>
  <div>
    <!-- Content-->
    <div v-if="loading" class="loading-page">
      <div class="loading"></div>
    </div>
    <div class="login-wrapper">
      <div class="login-form">
        <div class="container-fluid">
          <div class="col-xs-12 col-sm-10 col-sm-push-1">
            <br><br><br><br><br><br><br><br><br>

            <div class="alert alert-danger" role="alert" v-if="formErrors.length > 0">
              <ul v-for="(error,index) in formErrors" :key="error.index">
                <li>{{ error }}</li>
              </ul>
            </div>

            <form @submit="validateForm">
              <div class="form-group">
                <div class="input-group">

                          <span class="input-group-addon">
                                <i class="fa fa-circle"></i>
                                 {{ $t('first_name') }}
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

                             <span class="input-group-addon">
                                <i class="fa fa-circle"></i>
                                {{ $t('email') }}
                            </span>
                  <input type="email" class="form-control" v-model="email" :placeholder="$t('email')">
                  <small class="text-danger" v-if="email_errors">{{ email_errors }}</small>
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                            <span class="input-group-addon">
                                <i class="fa fa-circle"></i>
                                {{ $t('phone_number') }}
                            </span>

                  <input type="text" class="form-control" v-model="phone" :placeholder="$t('phone_number')">
                  <small class="text-danger" v-if="phone_errors">{{ phone_errors }}</small>
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                                    <span class="input-group-addon">
                                <i class="fa fa-circle"></i>
                                {{ $t('password') }}
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
                         v-model="password_confirmation" placeholder="123456">
                </div>
              </div>
              <div class="form-group text-center margin-top-20">
                <div class="input-group">
                  <span class="input-group-addon"></span>
                  <div class="checkbox">
                    <label>
                      <input type="checkbox" required>
                      <span style="padding:0 15px" >
                              {{ $t('by_clicking_on_start_i_agree_to_the_terms_and_conditions') }}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="form-group text-center margin-top-40">
                <button type="submit" class="btn btn-main btn-lg" :disabled="loading">{{ $t('register') }}</button>
              </div>
            </form>
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
export default {
  layout: 'RegisterLayout',
  head() {
    return {
      title: 'Register',
    };
  },
  data() {
    return {
      user: {},
      first_name: '',
      last_name: '',
      password: '',
      password_confirmation: '',
      token: '',
      email: '',
      phone: '',
      formErrors: [],
      email_errors: '',
      phone_errors: '',
      logo: '',
      loading: false
    }
  },
  mounted() {
    this.getGeneralSettings()
  },
  methods: {
    registerUser(e) {
      this.loading = true
      this.$axios.$post('/user/register', {
        first_name: this.first_name,
        last_name: this.last_name,
        password: this.password,
        password_confirmation: this.password_confirmation,
        email: this.email,
        phone: this.phone
      })
        .then(response => {
          if (response.status == '500') {
            this.loading = false
            if (response.message['email']) {
              this.email_errors = response.message['email'][0];
            } else {
              this.email_errors = '';
            }
            if (response.message['phone']) {
              this.phone_errors = response.message['phone'][0]
            } else {
              this.phone_errors = '';
            }
          } else if (response.status == '200') {
            this.formErrors = [];
            this.phone_errors = '';
            this.email_errors = '';
            this.new_login();
          }
        })
    },

    validateForm(e) {
      this.formErrors = [];
      if (!this.first_name) {
        if (this.current_lang == 'en') {
          this.formErrors.push('first name cannot be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('الاسم الاول مطلوب');
        }

      }
      if (this.first_name && this.first_name.length < 3) {
        if (this.current_lang == 'en') {
          this.formErrors.push('first name is too short');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('الاسم قصير جدا');
        }
      }
      if (!this.last_name) {
        if (this.current_lang == 'en') {
          this.formErrors.push('last name cannot be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('الاسم الاخير مطلوب');
        }
      }
      if (this.last_name && this.last_name.length < 3) {
        if (this.current_lang == 'en') {
          this.formErrors.push('last name is too short');
        } else {
          this.formErrors.push('الاسم الخير قصير');
        }
      }
      if (!this.email) {
        if (this.current_lang == 'en') {
          this.formErrors.push('email is empty');
        } else {
          this.formErrors.push(' الايميل مطلوب ');
        }

      }
      if (!this.phone) {
        if (this.current_lang == 'en') {
          this.formErrors.push('phone cannot be empty');
        } else {
          this.formErrors.push(' رقم التليفون مطلوب');
        }
      }
      if (this.phone && this.phone.length < 11) {
        if (this.current_lang == 'en') {
          this.formErrors.push('phone is less than 11 ');
        } else {
          this.formErrors.push('رقم التليفون اقل من 11');
        }

      }
      if (!this.password) {
        if (this.current_lang == 'en') {
          this.formErrors.push('password cannot be empty');
        } else {
          this.formErrors.push('الرقم السري فارغ');
        }
      }
      if (!this.password_confirmation) {
        if (this.current_lang == 'en') {
          this.formErrors.push('password should be confirmed');
        } else {
          this.formErrors.push(' الرقم السري يجب تاكيده ');
        }

      }
      if (this.password && this.password.length < 6) {
        if (this.current_lang == 'en') {
          this.formErrors.push('password is less than 6');
        } else {
          this.formErrors.push('الرقم السري اقل من 6');
        }

      }
      if (this.password_confirmation && this.password_confirmation != this.password) {
        if (this.current_lang == 'en') {
          this.formErrors.push('password is not matched');
        } else {
          this.formErrors.push(' الرقم السري غير متطابق ');
        }

      }

      if (this.formErrors.length == 0) {
        this.registerUser();
      }
      e.preventDefault();
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
            this.$router.push(this.localePath('/User/Profile'))
          }).catch(e => {
            this.$router.push(this.localePath('/User/Profile'))
          });
      } catch (err) {
        this.loading = false
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
