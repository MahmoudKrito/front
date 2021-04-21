<template>
  <div>
    <div v-if="loading" class="loading-page">
      <div class="loading"></div>
    </div>
    <!-- Content-->
    <div class="login-wrapper">
      <div class="login-form">
        <div class="container-fluid">
          <div class="col-xs-12 col-sm-10 col-sm-push-1">
            <div class="login-logo">
              <img src="https://api.promental.net/images/website/students.svg" alt="" class="hidden-xs hidden-sm">
              <img src="https://api.promental.net/images/website/images/students-white.png" alt="" class="visible-xs visible-sm">
            </div>
            <div class="login-title">
              {{ $t('please_change_your_password_and_complete_your_data') }}
            </div>


            <div class="alert alert-danger" v-if="formErrors.length > 0">
              <p v-for="error in formErrors">{{ error }}</p>
            </div>

            <div class="alert alert-danger" v-if="message">
              <p>{{ message }}</p>
            </div>

            <form>
              <div class="form-group">
                <div class="input-group">

                  <span class="input-group-addon">
                                        <i class="fa fa-circle"></i>
                                        {{ $t('name') }}
                                    </span>
                  <input type="text" class="form-control" name="" placeholder="person" v-model="name">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                            <span class="input-group-addon">
                                <i class="fa fa-circle"></i>
                                {{ $t('password') }}    {{ $t('new') }}
                            </span>

                  <input type="password" class="form-control" name="" placeholder="123456"
                         v-model="password">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                            <span class="input-group-addon">
                                <i class="fa fa-circle"></i>
                               {{ $t('re_password') }}
                            </span>
                  <input type="password" class="form-control" name="" placeholder="123456"
                         v-model="re_password">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                            <span class="input-group-addon">
                                <i class="fa fa-circle"></i>
                                {{ $t('phone') }}
                            </span>
                  <input type="text" class="form-control" name="" placeholder="0192-1092-177"
                         v-model="phone">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                            <span class="input-group-addon">
                                <i class="fa fa-circle"></i>
                                {{ $t('age') }}
                            </span>

                  <input type="text" class="form-control" name="" placeholder="15" v-model="age">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                            <span class="input-group-addon">
                                <i class="fa fa-circle"></i>
                                {{ $t('classroom') }}
                            </span>
                  <input type="text" class="form-control" name="class_room" placeholder="2/3" v-model="class_room">
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12 col-lg-6">
                  <div class="form-group">
                    <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="fa fa-circle"></i>
                                               {{ $t('count') }}  {{ $t('siblings') }}
                                            </span>
                      <client-only>
                        <tags-input element-id="tags" v-model="siblings" :typeahead="true"
                                    placeholder="2 sisters,3brothers"
                                    style="border-radius:20px;"></tags-input>
                      </client-only>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-lg-6">
                  <div class="form-group">
                    <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="fa fa-circle"></i>
                                    {{ $t('age') }}  {{ $t('siblings') }}
                                    </span>
                      <client-only>
                        <tags-input element-id="tags" v-model="siblings_age" :typeahead="true"
                                    placeholder="20,17"
                                    style="border-radius:20px;"></tags-input>
                      </client-only>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="fa fa-circle"></i>
                                        {{ $t('area') }}
                                    </span>
                  <input type="text" class="form-control" name="" placeholder="cairo" v-model="area">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                            <span class="input-group-addon">
                                <i class="fa fa-circle"></i>
                                {{ $t('hobbies') }}
                            </span>
                  <client-only>
                    <tags-input element-id="tags" v-model="hobbies" :typeahead="true"
                                placeholder="drawing,swimming"
                                style="border-radius:20px;"></tags-input>
                  </client-only>
                </div>
              </div>
              <div class="form-group text-center margin-top-20">
                <button type="submit" class="btn btn-main btn-lg" @click.prevent="validateForm" :disabled="loading">{{ $t('save') }}
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
      title: 'registerComplete',
    };
  },
  data() {
    return {
      siblings_age: [],
      siblings: [],
      hobbies: [],
      password: '',
      re_password: '',
      name: '',
      class_room: '',
      age: '',
      area: '',
      student_id: '',
      formErrors: [],
      message: '',
      user: this.$auth.user.user,
      phone: '',
      logo:'',
      loading:false
    }
  },
  mounted() {
    this.storage();
    this.getGeneralSettings()
  },
  methods: {
    storage() {
      this.student_id = this.$auth?this.$auth.user.student.id:null;
    },
    validateForm(e) {
      this.formErrors = [];
      if (!this.name) {
        if (this.current_lang == 'en') {
          this.formErrors.push('name is required');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push(' الاسم مطلوب ');
        }

      }
      if (!this.age) {
        if (this.current_lang == 'en') {
          this.formErrors.push('age is required');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('السن مطلوب');
        }
      }
      if (!this.area) {
        if (this.current_lang == 'en') {
          this.formErrors.push('area is required');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('المدينه مطلوبه  ');
        }
      }
      if (!this.class_room) {
        if (this.current_lang == 'en') {
          this.formErrors.push('class room is required');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('الفصل مطلوب ');
        }
      }
      if (!this.password) {
        if (this.current_lang == 'en') {
          this.formErrors.push('password is required');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push(' كلمه السر مطلوبه');
        }

      }
      if (!this.re_password) {
        if (this.current_lang == 'en') {
          this.formErrors.push('re enter password');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push(' اعاده كلمه السر ');
        }

      }
      if (this.password != this.re_password) {
        if (this.current_lang == 'en') {
          this.formErrors.push('password is not matched');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push(' كلمه السر غير متطابقه  ');
        }
      }
      if (this.hobbies.length == 0) {
        if (this.current_lang == 'en') {
          this.formErrors.push('hobbies is required');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push(' الهوايات مطلوبه ');
        }
      }
      if (this.siblings.length == 0) {
        if (this.current_lang == 'en') {
          this.formErrors.push('siblings is required');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push(' الاخوات مطلوبه ');
        }

      }
      if (this.siblings_age.length == 0) {
        if (this.current_lang == 'en') {
          this.formErrors.push('siblings age is required');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('  ادخل سن الاخوات ');
        }

      }
      if (!this.phone) {
        if (this.current_lang == 'en') {
          this.formErrors.push('phone is required');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('  ادخل رقم التليفون ');
        }
      }
      if (this.phone && this.phone.length < 11) {
        if (this.current_lang == 'en') {
          this.formErrors.push('phone is less than 11 number');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('   رقم التليفون اقل من 11 رقم');
        }
      }
      if (this.formErrors.length == 0) {
        this.studentCompleteData()
      }
      e.preventDefault();
    },
    studentCompleteData() {
      this.loading=true
      this.$axios.$put('/website/' + this.student_id + '/studentCompleteData', {
        siblings_age: this.siblings_age,
        siblings: this.siblings,
        hobbies: this.hobbies,
        password: this.password,
        re_password: this.re_password,
        name: this.name,
        class_room: this.class_room,
        age: this.age,
        area: this.area,
        phone: this.phone
      })
        .then(response => {
          console.log(response)
          if (response.status == '200') {
            let student_school_payment_status = this.$auth.user.school.status;
            let student_school_suspended_status = this.$auth.user.school_user.is_suspended
            if (student_school_payment_status == 1 && student_school_suspended_status == 1 && this.user.is_suspended == 1) {
              // this.$swal('you complete your data successfully');
              this.$router.push(this.localePath('/students/dashboard'))
            } else if (student_school_payment_status == 0 || student_school_suspended_status == 0 || this.user.is_suspended == 0) {
              this.$router.push(this.localePath('/students/dashboard/account-suspended'))
            }
          } else if (response.status == '500') {
            this.loading=false
            if (this.current_lang == 'ar') {
              this.message = 'هناك شئ خاطئ'
            } else if (this.current_lang == 'en') {
              this.message = 'some thing wrong'
            }

          }

        })
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
