<template>
  <div class="dashboard">
    <div :class="{rtl : current_lang === 'ar'}">
      <main class="main-wrapper">
        <DoctorSide></DoctorSide>
        <section class="content-wrapper">
          <!-- Content -->
          <div class="container-fluid">
            <div class="main-content">
              <div class="content-side">
                <!--  -->
                <div class="section-wrapper">
                  <div class="section-title">
                    {{ $t('earning') }}
                  </div>
                  <div class="doctors-block">
                    <div class="earnings-wrapper">
                      <div class="row">
                        <div class="col-xs-3">
                          <div class="earning-wrapper">
                            <div class="earning-icon">
                              <img src="https://api.promental.net/images/website/earning-accrued.svg" alt="">
                            </div>
                            <div class="earning-price">
                              {{ total_earnings }} {{ $t('l_e') }}

                            </div>
                            <div class="earning-title">
                              {{ $t('accrued_earnings') }}
                            </div>

                          </div>
                        </div>
                        <div class="col-xs-3">
                          <div class="earning-wrapper earnings-pending">
                            <div class="earning-icon">
                              <img src="https://api.promental.net/images/website/earning-pending.svg" alt="">
                            </div>
                            <div class="earning-price">
                              {{ pending_earnings }} {{ $t('l_e') }}

                            </div>
                            <div class="earning-title">
                              {{ $t('pending_earnings') }}
                            </div>

                          </div>
                        </div>
                        <div class="col-xs-3">
                          <div class="earning-wrapper">
                            <div class="earning-icon">
                              <img src="https://api.promental.net/images/website/earning-accrued.svg" alt="">
                            </div>
                            <div class="earning-price">
                              {{ withDrawl_earnings }} {{ $t('l_e') }}

                              <div class="earning-title">
                                {{ $t('withDrawl_earning') }}
                              </div>

                            </div>
                          </div>
                        </div>
                        <div class="col-xs-3">
                          <div class="earning-wrapper">
                            <div class="earning-icon">
                              <img src="https://api.promental.net/images/website/earning-accrued.svg" alt="">
                            </div>
                            <div class="earning-price">
                              {{ available_earnings }} {{ $t('l_e') }}
                            </div>
                            <div class="earning-title">
                              {{ $t('available_earnings') }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br>
                    <div class="alert alert-danger" v-if="message">
                      <p>{{ message }}</p>
                    </div>
                    <div class="table-responsive" v-if="sessions">
                      <table class="table  table-bordered text-center">
                        <thead>

                        <tr>
                          <th> {{ $t('price') }}</th>
                          <th> {{ $t('session_start_date') }}</th>
                          <th> {{ $t('patient_name') }}</th>
                          <th> {{ $t('patient_type') }}</th>
                          <th> {{ $t('session_time') }}</th>
                        </tr>

                        </thead>

                        <tr v-for="(session,index) in sessions">
                          <td>{{ session.grand_total - session.commission }}</td>
                          <td>{{ session.start_date }}</td>
                          <td> {{ session.user.first_name }} {{ session.user.last_name }}</td>
                          <td>{{ session.user.user_type_id == 5 ? 'student' : 'user' }}</td>
                          <td>{{ session.appointment.session_time }} {{ $t('minute') }}</td>
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
import DoctorSide from '@/layouts/DoctorSide'
import doctorNotifications from "@/components/doctorNotifications";

export default {
  layout: 'DoctorHeaderD',
  components: {DoctorSide, doctorNotifications},
  middleware:'doctorSuspend',
  head() {
    return {
      title: 'payment-details',
    };
  },
  data() {
    return {
      sessions: {},
      isLoaded: false,
      total_earnings: '',
      pending_earnings: 0,
      available_earnings: 0,
      withDrawl_earnings: 0,
      type: this.$route.params.type,
      message: ""
    }
  },
  mounted() {
    this.getTotalCredit()
    this.getTotalDetails()
  },
  methods: {
    getTotalCredit() {
      this.$axios.get('/doctors/payments/getTotalCredit')
        .then(response => {
          console.log(response)
          this.total_earnings = response.data.total
          this.pending_earnings = response.data.pending
          this.withDrawl_earnings = response.data.withDrawl
          this.available_earnings = response.data.available
        })
    },
    getTotalDetails() {
      this.$axios.get('/doctors/payments/' + this.type + '/getTotalDetails')
        .then(response => {
          console.log(response)
          this.sessions = response.data.data;
          if (response.data.status == '500') {
            if (this.current_lang == 'en') {
              this.message = 'no sessions available'
            } else if (this.current_lang == 'ar') {
              this.message = 'لا يوجد جلسات'
            }
          }
          console.log(this.sessions)
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
.table-bordered {
  border: 1px solid #ddd !important;
}

td {
  border: 1px solid #285E75 !important;
  text-align: center !important;
  color: #777 !important;
}

td {
  padding: 8px !important;
}
</style>

