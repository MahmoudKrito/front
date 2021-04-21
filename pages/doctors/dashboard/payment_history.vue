<template>
  <div class="dashboard">
    <div :class="{rtl:current_lang==='ar'}">
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
                              <img src="https://api.promental.net/images/earning-accrued.svg" alt="">
                            </div>
                            <div class="earning-price">
                              <nuxt-link
                                :to="localePath('/doctors/dashboard/payments/total')">
                                {{ total_earnings }} {{$t('l_e') }}
                              </nuxt-link>

                            </div>
                            <div class="earning-title">
                              {{ $t('accrued_earnings') }}
                            </div>

                          </div>
                        </div>
                        <div class="col-xs-3">
                          <div class="earning-wrapper earnings-pending">
                            <div class="earning-icon">
                              <img src="https://api.promental.net/images/earning-pending.svg" alt="">
                            </div>
                            <div class="earning-price">

                              <nuxt-link
                                :to="localePath('/doctors/dashboard/payments/pending')">
                                {{ pending_earnings }} {{$t('l_e') }}
                              </nuxt-link>

                            </div>
                            <div class="earning-title">
                              {{ $t('pending_earnings') }}
                            </div>
                          </div>
                        </div>
                        <div class="col-xs-3">
                          <div class="earning-wrapper">
                            <div class="earning-icon">
                              <img src="https://api.promental.net/images/earning-accrued.svg" alt="">
                            </div>
                            <div class="earning-price">

                              <nuxt-link
                                :to="localePath('/doctors/dashboard/payments/withDrawl')">
                                {{ withDrawl_earnings }} {{$t('l_e') }}
                              </nuxt-link>
                            </div>

                            <div class="earning-title">
                              {{ $t('withDrawl_earnings') }}
                            </div>
                          </div>
                        </div>
                        <div class="col-xs-3">
                          <div class="earning-wrapper">
                            <div class="earning-icon">
                              <img src="https://api.promental.net/images/earning-accrued.svg" alt="">
                            </div>
                            <div class="earning-price">
                              <nuxt-link
                                :to="localePath('/doctors/dashboard/payments/available')">
                                {{ available_earnings }} {{$t('l_e') }}
                              </nuxt-link>

                            </div>
                            <div class="earning-title">
                              {{ $t('available_earnings') }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br>
                    <div class="table-responsive">
                      <table class="table  table-bordered text-center">
                        <thead>
                        <tr>
                          <th>{{ $t('total') }}</th>
                          <th>{{ $t('date') }}</th>
                          <th>{{ $t('status') }}</th>
                        </tr>


                        </thead>

                        <tr v-for="payment in payments">
                          <td>{{ payment.total }}</td>
                          <td>{{ payment.created_at | formatDateByDay }} {{ payment.created_at | formatDateByMonth }}
                            {{ payment.created_at | formatDateByYear }}
                          </td>
                          <td v-if="payment.status == 1"><img src="https://api.promental.net/images/website/check.svg" alt=""
                                                              width="20"></td>
                          <td v-if="payment.status == 0"><img src="https://api.promental.net/images/website/uncheck.svg" alt=""
                                                              width="20"></td>
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
import {Datetime} from 'vue-datetime';

export default {
  layout: 'DoctorHeaderD',
  components: {DoctorSide, datetime: Datetime, doctorNotifications},
  middleware: 'doctorSuspend',
  head() {
    return {
      title: 'payments',
    };
  },
  data() {
    return {
      sessions_dated: {},
      isLoaded: false,
      total_earnings: '',
      pending_earnings: 0,
      available_earnings: 0,
      withDrawl_earnings: 0,
      payments: {}
    }
  },
  mounted() {
    this.getTotalCredit();
    this.getPaymentHistory()
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
    getPaymentHistory() {
      this.$axios.get('/doctors/payments/getPaymentHistory')
        .then(response => {
          this.payments = response.data.data;
          console.log(this.payments)
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


