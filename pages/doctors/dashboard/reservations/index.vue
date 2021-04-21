<template>
  <div class="dashboard">
    <div :class="{rtl:current_lang === 'ar'}">
      <main class="main-wrapper">

        <DoctorSide></DoctorSide>

        <section class="content-wrapper">
          <!-- Header -->
          <!-- Content -->
          <div class="container-fluid">
            <div class="main-content">
              <div class="content-side">
                <!--  -->
                <div class="section-wrapper">
                  <div class="section-title">
                    {{ $t('reservations') }}
                  </div>

                  <div class="doctors-block">
                    <div class="reservations-wrapper">
                      <div class="hello-week">
                        <div class="navigation"></div>
                        <div class="week"></div>
                        <datetime v-model="date" type="date" @input="getReservationsByDate()" style="border-radius: 0px"
                                  input-class="form-control" zone="UTC" :placeholder="$t('enter_date')"></datetime>
                      </div>

                      <div class="dates-wrapper">
                        <div class="date-row">
                          <div class="reservation-time">
<!--                            {{date | formatDateByDay }} {{date | formatDateByMonth }} {{ date | formatDateByYear }}-->
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
<!--                  <div class="alert alert-danger" v-if="message">{{ message }}</div>-->

                  <div class="reservations-table">
                    <div class="table-responsive">
                      <table class="table text-center">
                        <thead>
                        <tr>
                          <th class="text-center"> {{ $t('name_and_school') }}</th>
                          <th class="text-center">{{$t('type')}}</th>
                          <th class="text-center">{{ $t('age') }}</th>
                          <th class="text-center"> {{ $t('reports') }}</th>
                          <th class="text-center"> {{ $t('last_session') }}</th>
                          <th class="text-center"> {{ $t('next_session') }}</th>
                          <th></th>
                        </tr>
                        </thead>


                        <tr v-for="(reservation,index) in reservations">
                          <td>
                            <div class="font-size-14">{{ reservation.user.first_name }} {{ reservation.user.last_name }}
                            </div>
                            <div class="font-size-12 color-main" v-if="reservation.user.school">
                              {{ reservation.user.school }} {{ $t('school') }}
                            </div>
                            <div class="font-size-12 color-main" v-else>
                              {{ $t('user') }}
                            </div>

                          </td>
                          <td>
                            <div class="font-size-12 color-main" v-if="reservation.user.school">
                              {{ reservation.user.school }} {{ $t('school') }}
                            </div>
                            <div class="font-size-12 color-main" v-else>
                              {{ $t('user') }}
                            </div>
                          </td>
                          <td>
                            <template v-if="reservation.user.age">{{ reservation.user.age }}
                            </template>
                          </td>
                          <td><img src="https://api.promental.net/images/website/download.svg" alt=""></td>
                          <td>
                            <template v-if="reservation.user.last_session">
                              {{ reservation.user.last_session.appointment.day }}
                              {{ reservation.user.last_session.appointment.day |formatDateByMonth }}
                            </template>
                            <template v-else>no session</template>

                          </td>
                          <td>
                            <template v-if="reservation.user.next_session">
                              <span class="text-success">{{ reservation.user.next_session.appointment.day }} {{reservation.user.next_session.appointment.day | formatDateByMonth}}</span>
                            </template>
                          </td>
                          <td>
                            <nuxt-link :to="localePath('/doctors/dashboard/reservations/'+reservation.id)">
                              <i class="fa fa-gear color-main fa-2x"></i>
                            </nuxt-link>
                          </td>

                        </tr>

                      </table>
                    </div>
                  </div>


                </div>
              </div>
              <doctorNotifications></doctorNotifications>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>


</template>

<script>
import DoctorSide from '~/layouts/DoctorSide';
import {Datetime} from 'vue-datetime';
import doctorNotifications from "@/components/doctorNotifications";

export default {
  head() {
    return {
      title: 'Reservations',
    };
  },
  layout: 'DoctorHeaderD',
  components: {DoctorSide, datetime: Datetime, doctorNotifications},
  middleware:'doctorSuspend',
  data() {
    return {
      date: '',
      reservations: {},
      isLoaded: true,
      doctor_token: '',
      message: ''
    }
  },
  mounted() {
    this.getReservations()
  },
  methods: {

    getReservations() {
      this.$axios.$get('/doctors/reservations')
        .then(response => {
          this.reservations = response.data
          this.isLoaded = false;
        })
    },
    getReservationsByDate() {

      if (this.date) {
        this.$axios.$post('/doctors/reservations/getReservationsByDate', {
          selected_date: this.date
        })
          .then(response => {
            if (response.status == '200') {
              this.message=''
              this.reservations = response.data;
            } else if (response.status == '500') {
              this.reservations={}
              this.message = response.message
            }
          })
      }

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
*:not(i) {
  font-family: 'Montserrat', 'Cairo', serif, Arial;
}

tr > td > div {
  text-align: center !important;
}

td {
  text-align: center !important;
  padding: 20px !important;
}

th {
  text-align: center !important;
}

.section-title {
  font-family: 'Montserrat', serif, Arial;
}
.text-success {
  color: #0EE218;
}
</style>

