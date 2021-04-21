<template>

  <div v-if="isDoctorLoaded" :class="{rtl : current_lang === 'ar' }">
    <!-- Page Banner -->
    <section class="page-banner doctors-banner">
      <div class="container">
        <div class="page-banner-title">
          <img src="https://api.promental.net/images/website/doctors-white.png" alt="">
        </div>
      </div>
    </section>
    <!-- Content -->
    <div class="container">
      <!--  Search  -->
      <!--      <div class="search-group">-->
      <!--        <div class="input-group">-->
      <!--            <span class="input-group-btn">-->
      <!--                <button type="button" class="btn">-->
      <!--                    <i class="fa fa-search"></i>-->
      <!--                </button>-->
      <!--            </span>-->
      <!--          <input type="search" class="form-control" :placeholder="$t('search_doctor')">-->
      <!--        </div>-->
      <!--      </div>-->
      <!--  Row  -->
      <div class="row">
        <div class="col-xs-12 col-md-7 col-lg-8">
          <div class="doctor-single-wrapper">
            <div class="doctor-img">
              <img :src="doctor.avatar" alt="">
            </div>
            <div class="doctor-details">
              <div class="doctor-name">    {{ current_lang == 'ar' ? doctor.type.name_ar : doctor.type.name_en }}. {{ current_lang == 'ar' ? doctor.name_ar : doctor.name_en  }}</div>
              <div class="doctor-title">
                <template v-for="(speciality_doctor,index) in doctor.speciality">
                  {{ current_lang == 'en' ? speciality_doctor.name_en : speciality_doctor.name_ar }}
                </template>
              </div>
              <div class="doctor-brief">
                {{ current_lang == 'ar' ? doctor.account.description : doctor.account.description_en }}
              </div>
              <div class="doctor-rating">
                <i class="fa fa-star" :class="doctor.rating >=1 ? 'active' :''"></i>
                <i class="fa fa-star" :class="doctor.rating>=2 ? 'active' :''"></i>
                <i class="fa fa-star" :class="doctor.rating>=3 ? 'active' :''"></i>
                <i class="fa fa-star" :class="doctor.rating>=4 ? 'active' :''"></i>
                <i class="fa fa-star" :class="doctor.rating>=5 ? 'active' :''"></i>
              </div>
            </div>
          </div>
          <hr>
          <div class="doctor-tabs-wrapper">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
              <li role="presentation" class="active">
                <a href="#info" aria-controls="info" role="tab" data-toggle="tab">
                  {{ $t('data') }}
                </a>
              </li>
              <li role="presentation">
                <a href="#certificates" aria-controls="certificates" role="tab" data-toggle="tab">
                  {{ $t('certificates') }}
                </a>
              </li>
              <li role="presentation">
                <a href="#ratings" aria-controls="messages" role="tab"
                   data-toggle="tab"> {{ $t('reviews') }}</a>
              </li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">

              <div role="tabpanel" class="tab-pane active" id="info">
                {{current_lang == 'ar' ? doctor.account.description : doctor.account.description_en }}
                <br>
                {{ current_lang == 'ar' ? doctor.account.address : doctor.account.address_en }}
                <br>
                {{ doctor.phone }}
              </div>

              <div role="tabpanel" class="tab-pane" id="certificates">
                <p v-for="(certificate,index) in certificates" v-if="current_lang == 'ar'">
                  {{ certificate }}
                </p>
                <p v-for="(certificate_en,index) in certificates_en" v-if="current_lang == 'en'">
                  {{ certificate_en }}
                </p>
              </div>
              <div role="tabpanel" class="tab-pane" id="ratings">

                <div class="rating-section">
                  <div class="col-xs-12 col-lg-4">
                    <div class="average-rating">
                      {{ doctor.rating }}
                    </div>
                    <div class="doctor-rating">
                      <i class="fa fa-star" :class="{active : doctor.rating>=1}"></i>
                      <i class="fa fa-star" :class="{active : doctor.rating>=2}"></i>
                      <i class="fa fa-star" :class="{active : doctor.rating>=3}"></i>
                      <i class="fa fa-star" :class="{active : doctor.rating>=4}"></i>
                      <i class="fa fa-star" :class="{active : doctor.rating>=5}"></i>
                    </div>
                  </div>

                  <div class="col-xs-12 col-lg-4 margin-top-20 text-center center-block">
                    <div class="doctor-rating" v-for="(review,index) in doctor.reviews" :key="review.id">
                      <!--                      <span class="padding-10">{{ review.rate }}</span>-->
                      <i class="fa fa-star" :class="review.rate >= 1 ? 'active' : ''"></i>
                      <i class="fa fa-star" :class="review.rate >= 2 ? 'active' : ''"></i>
                      <i class="fa fa-star" :class="review.rate >= 3 ? 'active' : ''"></i>
                      <i class="fa fa-star" :class="review.rate >= 4 ? 'active' : ''"></i>
                      <i class="fa fa-star" :class="review.rate == 5 ? 'active' : ''"></i>
                    </div>
                  </div>

                  <div class="col-xs-12 col-lg-4 margin-top-20 text-center center-block">
                    <div class="rating-wrapper">
                      <fieldset class="rating" v-if="doctor_rating>0">

                        <div class="doctor-rating" v-for="(review,index) in doctor.reviews" :key="review.id">
                          <!--                      <span class="padding-10">{{ review.rate }}</span>-->
                          <i class="fa fa-star" :class="review.rate >= 1 ? 'active' : ''"></i>
                          <i class="fa fa-star" :class="review.rate >= 2 ? 'active' : ''"></i>
                          <i class="fa fa-star" :class="review.rate >= 3 ? 'active' : ''"></i>
                          <i class="fa fa-star" :class="review.rate >= 4 ? 'active' : ''"></i>
                          <i class="fa fa-star" :class="review.rate == 5 ? 'active' : ''"></i>
                        </div>
                      </fieldset>
                      <fieldset class="rating" v-else>
                        <!-- 5 Stars-->
                        <input type="radio" id="star5" value="5" name="rating" v-model="rating">
                        <label class="full" for="star5" title="5 stars"></label>
                        <!-- 4 Stars-->
                        <input type="radio" id="star4" value="4" name="rating" v-model="rating">
                        <label class="full" for="star4" title="4 stars"></label>
                        <!-- 3 Stars-->
                        <input type="radio" id="star3" value="3" name="rating" v-model="rating">
                        <label class="full disabled" for="star3" title="3 stars"></label>
                        <!-- 2 Stars-->
                        <input type="radio" id="star2" value="2" name="rating" v-model="rating">
                        <label class="full" for="star2" title="2 stars"></label>
                        <!-- 1 Star -->
                        <input type="radio" id="star1" value="1" name="rating" v-model="rating">
                        <label class="full" for="star1" title="1 star"></label>

                      </fieldset>
                    </div>
                    <button class="review  btn btn-link"
                            @click="addDoctorReview" v-if="doctor_rating==0" :disabled="loading">
                      {{ $t('evaluate_doctor') }}
                    </button>

                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
        <div class="col-xs-12 col-md-5 col-lg-4">
          <div class="booking-wrapper">
            <div class="alert alert-danger" v-if="message">
              {{ message }}
            </div>

            <div class="booking-title" v-for="(package_name,index) in packages">
              {{current_lang == 'ar' ? package_name.name_ar : package_name.name_en }}
              <img src="https://api.promental.net/images/website/individual-session.svg" alt="">
            </div>
            <!--  Session Price  -->
            <ul class="session-price-list">
              <li v-for="appointment,index in appointments">
                <span class="session-title"> {{ $t('session_price') }} </span>
                <span class="session-time"
                      v-text="appointment.session_time +' '+$t('minute')"> </span>
                <span class="session-price"
                      v-text="appointment.session_price+' '+ $t('l_e')"></span>
              </li>
            </ul>

            <!--            <p v-if="message" class="text-danger"> {{ message }} </p>-->
            <div class="hello-week">
              <div class="navigation"></div>
              <div class="month"></div>
              <div class="week"></div>
            </div>

            <!-- Calender -->
            <!--            <datetime v-model="date" input-class="form-control"-->
            <!--                      @input='getDate()' :min-datetime="minDatetime" zone="UTC"></datetime>-->
            <v-row justify="space-around">
              <!--              <v-date-picker v-model="date" @change="getDate()" :allowed-dates="getAllowedDates" color="green lighten-1"-->
              <!--                             header-color="primary"></v-date-picker>-->

              <!--              <v-menu-->
              <!--                ref="menu"-->
              <!--                v-model="menu"-->
              <!--                :close-on-content-click="false"-->
              <!--                :return-value.sync="date"-->
              <!--                transition="scale-transition"-->
              <!--                offset-y-->
              <!--                min-width="auto">-->

              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="Picker in menu"
                  prepend-icon="mdi-calendar"
                  readonly @change="getDate()"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>

              <v-date-picker
                v-model="date"
                no-title
                scrollable :allowed-dates="getAllowedDates">
                <v-spacer></v-spacer>
                <!--                <v-btn-->
                <!--                  text-->
                <!--                  color="primary"-->
                <!--                  @click="menu = false"-->
                <!--                >-->
                <!--                  {{ $t('cancel') }}-->
                <!--                </v-btn>-->
                <!--                <v-btn-->
                <!--                  text-->
                <!--                  color="primary"-->
                <!--                  @click="$refs.menu.save(date)">-->
                <!--                  {{ $t('ok') }}-->
                <!--                </v-btn>-->
              </v-date-picker>
              <!--              </v-menu>-->

            </v-row>

            <!-- Selected Day -->
            <div class="selected-day">
              <!--الثلاثاء 28 ديسمبر 2020-->
              {{ date | formatDateByDay }} {{ date | formatDateByMonth }} {{ date | formatDateByYear }}
            </div>
            <!-- Available hours -->
            <ul class="available-hours">
              <li v-for="appointment,index in appointments">
                <div>
                  <span class="available-period">{{ appointment.time }}</span>
                  <span class="available-time"
                        v-text="appointment.session_time+ ' ' + $t('minute')"></span>
                </div>

                <template v-if="user && user.user_type_id == 5">
                  <button type="button" class="btn btn-main btn-send" data-toggle="modal" data-target="#exampleModal">
                    {{ $t('book') }}
                  </button>

                  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                       aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Payment method</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <!--                          <select class="form-control" name="payment_method_id" v-model="payment_method_id">-->
                          <!--                            <option value="1">فيزا</option>-->
                          <!--                          </select>-->

                          <input type="radio" name="payment_method_id" v-model="payment_method_id" value="1">
                          <label>Visa</label>

                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t('close') }}
                          </button>
                          <button type="button" class="btn btn-primary" @click.prevent="reserveSession(appointment.id)">
                            {{ $t('submit') }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>

                <template v-else>
                  <nuxt-link :to="localePath('/login')" class="btn btn-main btn-send">
                    {{ $t('book') }}
                  </nuxt-link>
                </template>

                <template v-if="user && user.user_type_id == 3">
                  <button type="button" class="btn btn-main btn-send"
                          @click.prevent="reserveSession(appointment.id)"> {{ $t('book') }}
                  </button>

                </template>

                <template v-if="!user">
                  <button type="button" class="btn btn-main btn-send"
                          @click.prevent="reserveSession(appointment.id)"> {{ $t('book') }}
                  </button>

                </template>

              </li>
            </ul>

          </div>
        </div>
      </div>

    </div>


  </div>
</template>

<script>
import {Datetime} from 'vue-datetime';

export default {
  layout: 'mainHeader',
  head() {
    return {
      title: 'SingleDoctor',
    };
  },
  components: {
    datetime: Datetime
  },
  data() {
    return {
      doctor: {},
      certificates: {},
      general_settings: {},
      rating: 0,
      doctor_rating: 0,
      color: '',
      hover: true,
      reviews: {},
      count: '',
      total_rating: '',
      appointments: {},
      date: '',
      message: '',
      user: this.$auth.loggedIn ? this.$auth.user.user : {},
      isDoctorLoaded: false,
      minDatetime: '',
      packages: {},
      all_appointments: ["2018-03-03", "2018-03-05"],
      doctor_slug: this.$route.params.slug,
      payment_method_id: '',
      session: {},
      user_id: this.$auth.loggedIn ? this.$auth.user.user.id : '',
      allowed_dates: this.all_appointments,
      loading:false
    }
  },
  created() {
    this.getAppointments()
  },
  mounted() {
    this.minDatetime = (new Date()).toString();
    this.storage();
    this.getDoctor();
    this.getGeneralSettings();
  },
  methods: {
    getAppointments() {
      this.$axios.get('/doctors/' + this.doctor_slug + '/getAllAppointments?user_id=' + this.user_id)
        .then(response => {
          this.all_appointments = response.data.data
        })
    },
    getAllowedDates(val) {
      if (this.all_appointments.indexOf(val) !== -1) {
        return true
      } else {
        return false
      }
    },
    storage() {
      // const timeElapsed = Date.now();
      // const today = new Date(timeElapsed);
      // this.date=today.toISOString();
      if (process.client) {
        this.doctor_slug = this.$route.params.slug;
        if (this.$auth.loggedIn) {
          this.user = this.$auth.user.user;
        }
      }
    },
    getDoctor() {
      this.$axios.$get('/website/doctors/' + this.doctor_slug + '?user_id=' + this.user_id)
        .then(response => {
          this.isDoctorLoaded = true;
          this.doctor = response.doctor;
          this.certificates = response.certificates;
          this.certificates_en = response.certificates_en;
          this.appointments = response.appointments;
          this.packages = response.packages;
          this.doctor_rating = response.review;
        })
    },
    getGeneralSettings() {
      this.$axios.$get('/setting')
        .then(response => {
          this.general_settings = response.data;
        })
    },
    addDoctorReview(e) {
      if (this.$auth.loggedIn) {

        if (!this.rating) {
          if (this.current_lang == 'en') {
            this.$swal('Rating is required')
          } else if (this.current_lang == 'ar') {
            this.$swal('من فضلك حدد تقييم')
          }
        }else{
          e.preventDefault();
          this.loading=true
          this.$axios.$post('/website/doctors/single-doctor/review', {
            doctor_id: this.doctor.account.id,
            rating: this.rating
          }).then(response => {
            console.log(response)
            this.loading=false
            this.doctor = response.doctor
            this.doctor_rating = response.rate
          })
        }
      } else {
        if (this.current_lang == 'en') {
          this.$swal('login required')
        } else if (this.current_lang == 'ar') {
          this.$swal(' يرجي تسجيل الدخول')
        }
      }
    },
    getDate() {
      this.message = "";
      if (process.client) {
        this.$axios.$post('/website/reservations/getAppointments', {
          date: this.date,
          doctor_slug: this.doctor_slug,
          user_id: this.user_id
        }).then(response => {
          console.log(response)
          if (response.status == '200') {
            this.appointments = response.appointments;
          } else if (response.status == '500') {

            if (this.current_lang == 'en') {
              this.$swal('no appointments available')
            } else if (this.current_lang == 'ar') {
              this.$swal(' لا يوجد مواعيد متاحه')
            }
            this.appointments = {};
          }
        })
      }
    },
    reserveSession(id) {
      if (this.user.user_type_id == 5) {
        if (this.$auth.user) {
          if (!this.payment_method_id) {
            if (this.current_lang == 'en') {
              this.$swal('Please, choose payment method')
            } else if (this.current_lang == 'ar') {
              this.$swal('من فضلك اختر طريقه الدفع')
            }
          } else {
            if (!this.date) {
              if (this.current_lang == 'en') {
                this.$swal('Please, choose appointment date');
                this.message = 'Please, choose appointment date';
              } else if (this.current_lang == 'ar') {
                this.$swal('من فضلك اختار تاريخ الموعد');
                this.message = 'من فضلك اختار تاريخ الموعد';
              }
              $('#exampleModal').modal('hide')
            } else {
              this.message = ''
              this.loading=true
              this.$axios.$post('website/reservations/reserveSession', {
                doctor_slug: this.doctor_slug,
                user_id: this.user.id,
                appointment_id: id,
                date: this.date,
                payment_method_id: this.payment_method_id
              }).then(response => {
                console.log(response)
                if (response.status === 200) {
                  this.session = response.data;
                  $('#exampleModal').modal('hide');
                  this.$router.push(this.localePath('/sessions/' + this.session.slug + '/accept'));
                } else if (response.status === 500) {
                  this.loading=false;
                  if (this.current_lang == 'en') {
                    this.$swal('OoPs, this appointment is reserved, Please, Select Another Date');
                  } else if (this.current_lang == 'ar') {
                    this.$swal('للاسف هذا الميعاد تم حجزه من قبل, من فضلك قم بتغيير تاريخ الميعاد');
                  }
                  $('#exampleModal').modal('hide');
                }
              });
            }

          }
        }

      } else if (this.user.user_type_id == 3) {
        if (this.$auth.user) {
          if (!this.date) {
            if (this.current_lang == 'en') {
              this.$swal('Please, choose appointment date');
              this.message = 'Please, choose appointment date';
            } else if (this.current_lang == 'ar') {
              this.$swal('من فضلك اختار تاريخ الموعد');
              this.message = 'من فضلك اختار تاريخ الموعد';
            }
          } else {
            this.loading=true
            this.$axios.$post('website/reservations/reserveSession', {
              doctor_slug: this.doctor_slug,
              user_id: this.user.id,
              appointment_id: id,
              date: this.date,
            }).then(response => {
              if (response.status == '200') {
                this.$router.push(this.localePath('/User/sessions'))
              } else if (response.status == '500') {
                this.loading=false
                if (this.current_lang == 'en') {
                  this.$swal('OoPs, this appointment is reserved, Please, Select Another Date');
                } else if (this.current_lang == 'ar') {
                  this.$swal('للاسف هذا الميعاد تم حجزه من قبل, من فضلك قم بتغيير تاريخ الميعاد');
                }
              }
            });
          }

        }
      } else {
        if (this.lang == 'en') {
          this.$swal('login required');
          setTimeout(() => this.$router.push('/login'), 3000);
        } else if (this.lang == 'ar') {
          this.$swal(' يرجي تسجيل الدخول');
          setTimeout(() => this.$router.push('/login'), 3000);
        }
      }
    }
  },
  computed: {
    current_lang() {
      return this.$i18n.locale
    },
    total_review_rate() {
      return this.count > 0 ? Math.round(this.total_rating / this.count) * 5 : 0
    }
  },
}
</script>

<style scoped>
.container {
  padding-top: 70px;
}

.review {
  color: inherit;
}

.color {
  color: #FFAC00 !important
}

.v-btn--rounded {
  border-radius: 0px !important;
}
</style>

