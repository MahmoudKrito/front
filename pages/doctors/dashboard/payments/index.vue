<template>
  <div class="dashboard">
    <div :class="{rtl:current_lang === 'ar'}">
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


                  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" style="color:#ffffff">
                    {{ $t('send_request') }}
                  </button>

                  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                       aria-labelledby="exampleModalLabel"
                       aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Payment Methods</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <div class="row" v-if="doctor.postal_status == 1">
                            <div class="col">
                              <input type="radio" name="postal" value="postal" v-model="payment_method_name">
                              <label class="text-label">Postal</label>
                            </div>

                          </div>

                          <div class="row" v-if="doctor.vodafone_status == 1">
                            <div class="col">
                              <input type="radio" name="vodafone" value="vodafone" v-model="payment_method_name">
                              <label class="text-label">Vodafone Cash</label>
                            </div>
                          </div>


                          <div class="row" v-if="doctor.bank_account_status == 1">
                            <div class="col">
                              <input type="radio" name="bank" v-model="payment_method_name">
                              <label class="text-label">Bank</label>
                            </div>
                          </div>


                          <label
                            v-if="doctor.postal_status == 0 && doctor.vodafone_status==0 && doctor.bank_account_status==0">
                            {{ $t('update_your_payment_data_first') }}</label>

                        </div>

                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">
                            {{ $t('close') }}
                          </button>
                          <button type="button" class="btn btn-primary"
                                  @click.prevent="sendPaymentRequest()">
                            {{ $t('save') }}
                          </button>
                        </div>
                      </div>
                    </div>
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
                              <nuxt-link
                                :to="localePath('/doctors/dashboard/payments/total')">
                                {{ total_earnings }} {{ $t('l_e') }}
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
                              <img src="https://api.promental.net/images/website/earning-pending.svg" alt="">
                            </div>
                            <div class="earning-price">

                              <nuxt-link
                                :to="localePath('/doctors/dashboard/payments/pending')">
                                {{ pending_earnings }} {{ $t('l_e') }}
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
                              <img src="https://api.promental.net/images/website/earning-accrued.svg" alt="">
                            </div>
                            <div class="earning-price">

                              <nuxt-link
                                :to="localePath('/doctors/dashboard/payments/withDrawl')">
                                {{ withDrawl_earnings }} {{ $t('l_e') }}

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
                              <img src="https://api.promental.net/images/website/earning-accrued.svg" alt="">
                            </div>
                            <div class="earning-price">
                              <nuxt-link
                                :to="localePath('/doctors/dashboard/payments/available')">
                                {{ available_earnings }} {{ $t('l_e') }}

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
                      <table class="table  table-bordered text-center" v-if="isLoaded">
                        <thead>

                        <tr>
                          <th>
                            <datetime v-model="date" input-class="form-control" :placeholder="$t('choose_date')"
                                      @input="getPaymentsByDate()" zone="UTC"></datetime>
                          </th>
                          <th v-for="(school_package,index) in packages">
                            {{ current_lang == 'en' ? school_package.name_en : school_package.name_ar }}
                          </th>
                        </tr>
                        </thead>

                        <tr v-if="sessions.length > 0">
                          <td></td>
                          <td v-for="(session,index) in sessions">{{ session - commissions[index] }}</td>
                        </tr>

                        <tr v-if="sessions_dated.length > 0">
                          <td></td>
                          <td v-for="(session_dated,index) in sessions_dated">{{ session_dated-commissions_dated[index] }}</td>
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
  middleware:'doctorSuspend',
  head() {
    return {
      title: 'payments',
    };
  },
  data() {
    return {
      sessions: {},
      commissions:{},
      packages: {},
      date: '',
      sessions_dated: {},
      commissions_dated:{},
      isLoaded: false,
      total_earnings: '',
      pending_earnings: 0,
      available_earnings: 0,
      withDrawl_earnings: 0,
      payment_methods: {},
      doctor: {},
      payment_method_name: ''
    }
  },
  mounted() {
    this.getPayments();
    this.getSchoolPackageCategories();
    this.getTotalCredit();
    this.getPaymentData()
  },
  methods: {
    getPaymentData() {
      this.$axios.get('/doctors/paymentMethods')
        .then(response => {
          console.log(response)
          this.doctor = response.data.data;
        })
    },
    sendPaymentRequest() {
      this.$axios.get('/doctors/payments/paymentRequest?payment_method=' + this.payment_method_name)
        .then(response => {
          $('#exampleModal').modal('hide')
          if (response.data.status == '200') {
            if (this.current_lang == 'en') {
              this.$swal('your request is send successfully your credit is : ' + response.data.data)
            } else if (this.current_lang == 'ar') {
              this.$swal('تم ارسال طلبك الرصيد المتاح : ' + response.data.data)
            }
            this.getTotalCredit();
          } else if (response.data.status == '500') {
            if (this.current_lang == 'en') {
              this.$swal('no available credit')
            } else if (this.current_lang == 'ar') {
              this.$swal(' لا يوجد رصيد متاح ')
            }

          }

        })
    },
    getPayments() {
      this.$axios.get('/doctors/payments')
        .then(response => {
          this.sessions = response.data.data
          this.commissions = response.data.commission
        })
    },
    getSchoolPackageCategories() {
      this.$axios.$get('/website/schools/getPackageCategories')
        .then(response => {
          this.packages = response.data;
          this.isLoaded = true
        })
    },
    getPaymentsByDate() {
      this.$axios.post('/doctors/payments/filterPaymentsByDate', {
        date: this.date
      })
        .then(response => {
          this.sessions_dated = response.data.data;
          this.commissions_dated = response.data.commission;
          if (this.sessions_dated.length > 0) {
            this.sessions = {}
          }
        })
    },
    getTotalCredit() {
      this.$axios.get('/doctors/payments/getTotalCredit')
        .then(response => {
          console.log(response)
          this.total_earnings = response.data.total
          this.pending_earnings = response.data.pending
          this.withDrawl_earnings = response.data.withDrawl
          this.available_earnings = response.data.available
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
.text-label {
  color: #000000 !important;
}

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

