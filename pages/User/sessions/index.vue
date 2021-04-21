<template>
  <div :class="{rtl:current_lang === 'ar'}">
    <!-- Profile -->
    <div class="container">
      <v-container fluid>
        <v-row align="center">
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              :items="items"
              :label="$t('filter_sessions')"
              dense
              solo
              v-model="value"
              @change="filterSessions"></v-select>
          </v-col>
        </v-row>
      </v-container>

      <div class="profile-wrapper">
        <div class="profile-side">
          <div class="user-wrapper">
            <div class="user-img">
              <img src="https://api.promental.net/images/website/Group1699.svg" alt="">
            </div>
            <div class="user-details">
              <div class="user-name">{{ user.first_name }} {{ user.last_name }}</div>
              <div class="user-phone">{{ user.phone }}</div>
              <div class="user-email">{{ user.email }}</div>
            </div>
          </div>
        </div>
        <div class="profile-content">
          <div class="profile-body">
            <div class="col-xs-12">
              <div v-if="message">
                <div class="alert alert-danger">{{ message }}</div>
              </div>

              <div class="booking-item" v-if="sessions.length > 0" v-for="(session,index) in sessions"
                   :key="session.id">


                <div class="doctor-booking">
                  <div class="doctor-img">
                    <img src="https://api.promental.net/images/website/bg-doctors.png" alt="">
                  </div>
                  <div class="doctor-details">
                    <div class="doctor-name"> {{ (current_lang == 'ar' ? session.doctor.type.name_ar : session.doctor.type.name_en)}}.  {{current_lang == 'ar' ? session.doctor.name_ar : session.doctor.name_en }}
                    </div>
                    <div class="doctor-title">{{ current_lang == 'ar' ? session.doctor.speciality.name_ar : session.doctor.speciality.name_en  }}
                    </div>

                    <div class="doctor-rating">
                      <i class="fa fa-star active"></i>
                      <i class="fa fa-star active"></i>
                      <i class="fa fa-star active"></i>
                      <i class="fa fa-star active"></i>
                      <i class="fa fa-star"></i>
                    </div>
                    <div v-if="user.user_type_id == 5">
                      <span class="booking-status success" v-if="session.payment_status==1">{{ $t('paid') }}</span>
                      <span class="booking-price">{{ session.grand_total }} {{ $t('l_e') }}</span>
                    </div>
                    <template v-if="session.payment_status == 1 && session.status_id == 1">
                      <nuxt-link
                        :to="localePath('/User/sessions/'+session.slug+'/start')"><span
                        class="booking-price btn-success" v-if="session.status_id !== 3">open session</span></nuxt-link>
                    </template>
                    <template v-if="session.payment_status == 1 && session.status_id == 2">
                      <nuxt-link
                        :to="localePath('/User/sessions/'+session.slug+'/start')"><span
                        class="booking-price btn-success">open session</span></nuxt-link>
                    </template>
                    <template v-if="session.payment_status == 0">
                      <span class="booking-price btn-success">not paid session</span>
                    </template>
                    <nuxt-link :to="'/sessions/'+session.slug+'/accept'"
                               v-if="user.user_type_id == 5 && session.payment_status == 0">
                      <span class="booking-price btn-success">{{ $t('pay') }}</span>
                    </nuxt-link>
                  </div>
                </div>
                <div class="booking-details">
                  <div class="booking-status" v-if="session.status_id == 1"> {{ $t('pending') }}</div>
                  <div class="booking-status" v-if="session.status_id == 2"> {{ $t('ongoing') }}</div>
                  <div class="booking-status" v-if="session.status_id == 3"> {{ $t('done') }}</div>
                  <div class="booking-time">{{ session.appointment.time }}</div>
                  <div class="booking-date">{{ session.date }}</div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'mainHeader',
  middleware:'user',
  head() {
    return {
      title: 'Booking',
    };
  },
  data() {
    return {
      user: {},
      token: '',
      general_settings: {},
      sessions: {},
      message: '',
      items: ['ongoing', 'pending', 'done'],
      value: ''
    }
  },
  mounted() {
    this.storage();
    this.getGeneralSettings();
    this.getSessions();
  },
  methods: {
    storage() {
      this.user = this.$auth.user.user;
    },
    getGeneralSettings() {
      this.$axios.$get('/setting')
        .then(response => {
          this.general_settings = response.data;
        })
    },
    getSessions() {
      this.$axios.$get('/user/getReservations')
        .then(response => {
          if (response.status == '200') {
            this.sessions = response.data.reverse();
          } else if (response.status == '204') {
            this.message = response.message;
          }
        })
    },
    filterSessions() {
      this.$axios.post('/user/filterSessions',
        {name: this.value}).then(response => {
        this.message = '';
        this.sessions = response.data.data;
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

<style scoped>
.profile-wrapper .profile-side:after {
  content: '';
  position: absolute;
  top: 150px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background: url(../../../assets/images/Group1710.svg) center no-repeat;
  background-size: contain;
  width: 150px;
  height: 350px;
}
</style>
