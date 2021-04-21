<template>
  <div class="dashboard">
    <div :clas="{rtl:current_lang === 'ar'}">
      <!-- Content -->
      <main class="main-wrapper">
        <SchoolSide></SchoolSide>
        <section class="content-wrapper">
          <!-- Content -->
          <div class="container-fluid">
            <div class="main-content">
              <div class="content-side">
                <!--  -->
                <div class="section-wrapper">
                  <div class="tabs-wrapper">
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs" role="tablist">
                      <li role="presentation" class="active"><a href="#methods" aria-controls="methods"
                                                                role="tab" data-toggle="tab">
                        {{ $t('payment_methods') }}</a></li>
                      <li role="presentation"><a href="#history" aria-controls="history" role="tab"
                                                 data-toggle="tab">{{ $t('payment_history') }} </a></li>
                    </ul>
                    <!-- Tab panes -->
                    <div class="tab-content">
                      <div role="tabpanel" class="tab-pane active" id="methods">
                        <div class="row">
                          <div class="col-xs-12 col-lg-6">
                            <div class="subscription-wrapper">
                              <div class="subscription-title">
                                {{ $t('subscription_start_date') }}
                              </div>

                              <div class="subscription-info">
                                {{ subscription.from | formatDateByDay }}
                                {{ subscription.from | formatDateByMonth }}
                                {{ subscription.from | formatDateByYear }}
                              </div>
                            </div>
                          </div>
                          <div class="col-xs-12 col-lg-6">
                            <div class="subscription-wrapper">
                              <div class="subscription-title">
                                {{ $t('subscription_end_date') }}
                              </div>

                              <div class="subscription-info">
                                {{ end_date | formatDateByDay }} {{ end_date | formatDateByMonth }}
                                {{ end_date | formatDateByYear }}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-xs-12 col-lg-6">
                            <div class="subscription-wrapper">
                              <div class="subscription-title">
                                {{ $t('subscription_plan') }}
                              </div>
                              <div class="subscription-info">
                                <td>{{
                                    current_lang == 'en' ? subscription_data.name_en : subscription_data.name_ar
                                  }}
                                </td>
                              </div>
                            </div>
                          </div>
                          <div class="col-xs-12 col-lg-6">
                            <div class="subscription-wrapper">
                              <div class="subscription-title">
                                {{ $t('subscription_status') }}
                              </div>

                              <div class="subscription-info" v-if="school.active == 0">
                                <img src="https://api.promental.net/images/website/uncheck.svg" alt="" width="20">
                                {{ $t('note_enabled') }}
                              </div>

                              <div class="subscription-info" v-if="school.active==1">
                                <img src="https://api.promental.net/images/website/check.svg" alt="" width="20">
                                {{ $t('activated') }}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-xs-12">
                            <div class="subscription-wrapper">
                              <div class="subscription-title">
                                Billing
                              </div>

                              <div class="margin-20">
                                <div class="billing-row">
                                  <div class="billing-data">{{ user.email }}</div>
                                  <!--                              <button class="btn-link billing-edit ">Edit</button>-->
                                </div>
                                <div class="billing-row">
                                  <div class="billing-data">{{ user.phone }}</div>
                                  <!--                              <button class="btn-link billing-edit ">Edit</button>-->
                                </div>
                                <!--                            <div class="billing-row">-->
                                <!--                              <div class="billing-data">Visa card number : **** **** ****-->
                                <!--                                8614-->
                                <!--                              </div>-->
                                <!--                              <button class="btn-link billing-edit ">Update</button>-->
                                <!--                            </div>-->
                              </div>

                              <hr>
                              <div class="subscription-title">
                                {{ $t('subscription_details') }}
                              </div>

                              <div class="margin-20">
                                <div class="billing-row" v-for="name in packages_names">
                                  <div class="billing-data">{{current_lang == 'ar' ? name.name_ar : name.name_en}}
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>

                      <div role="tabpanel" class="tab-pane" id="history">
                        <div class="earning-wrapper">
                          <div class="earning-icon">
                            <img src="https://api.promental.net/images/website/earning-accrued.svg" alt="">
                          </div>
                          <div class="earning-price">
                            {{ total_paid }} {{ $t('l_e') }}
                          </div>
                          <div class="earning-title">
                            {{ $t('accrued_earnings') }}
                          </div>

                        </div>
                        <br>
                        <div class="table-responsive">
                          <table class="table  table-bordered text-center">
                            <thead>
                            <tr>
                              <th v-for="school_package in packages">
                                {{ current_lang == 'en' ? school_package.name_en : school_package.name_ar }}
                              </th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr>
                              <td v-for="school_package in packages">{{ school_package.sessions_price }}</td>
                            </tr>
                            </tbody>
                          </table>
                        </div>

                        <div class="table-responsive">
                          <table class="table  table-bordered text-center">
                            <thead>
                            <tr>
                              <th>{{ $t('total') }}</th>
                              <th>{{ $t('status') }}</th>
                              <th>{{ $t('end_date') }}</th>
                              <th>{{ $t('receive_date') }}</th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr v-for="(payment,index) in payments">
                              <td>{{ payment.amount }}</td>
                              <td> {{ payment.paid == 0 ? $t('not_paid') : $t('paid') }}</td>
                              <td>{{ payment.end_at }}</td>
                              <td>{{ payment.received_at }}</td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </div>

              <!--   notifications       -->
              <schoolNotifications></schoolNotifications>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>


<script>
import SchoolSide from '~/layouts/SchoolSideD';
import schoolNotifications from '@/components/schoolNotifications'

export default {
  head() {
    return {
      title: 'subscriptions',
    };
  },
  layout: 'SchoolHeaderD',
  components: {SchoolSide, schoolNotifications},
  middleware: 'schoolSuspend',
  data() {
    return {
      date: '',
      subscription: {},
      school_package: {},
      end_date: '',
      packages_names: {},
      packages: {},
      school_subscriptions: {},
      total_paid: '',
      user: this.$auth.user.user,
      school: this.$auth.user.school,
      subscription_data: {},
      payments: {},
      count: 0
    }
  },
  mounted() {
    this.getCurrentSubscription();
    this.getSchoolPackages();
    this.getPackageCategories();
    this.getPayments()
  },
  methods: {
    getCurrentSubscription() {
      this.$axios.get('/school/getCurrentSubscription')
        .then(response => {
          console.log(response)
          if (response.status == '200') {
            this.subscription = response.data.data;
            this.subscription_data = response.data.subscription;
            this.end_date = response.data.end_date
          } else if (response.status == '500') {
            if (this.current_lang == 'en') {
              this.message = 'no subscription till now'
            } else if (this.current_lang == 'ar') {
              this.message = 'لا يوجد اشتراك حتي الان'
            }

          }

        })
    },
    getSchoolPackages() {
      this.$axios.get('/school/payments/getSchoolPackages')
        .then(response => {
          this.packages_names = response.data.data
        })
    },
    getPackageCategories() {
      this.$axios.$get('/school/payments/packages')
        .then(response => {
          this.packages = response.data;
          this.total_paid = response.total
        })
    },
    getPayments() {
      this.$axios.get('/school/payments')
        .then(response => {
          this.payments = response.data.data
        })
    }
  },
  computed: {
    current_lang() {
      return this.$i18n.locale
    },
    total() {
      return this.school_subscriptions.reduce(function (sum, item) {
        return sum + item.sessions_number
      }, 0)
    }
  }

}
</script>


<style scoped>
.main-wrapper {
  padding-top: 100px;
}

*:not(i) {
  font-family: 'Montserrat', 'Cairo', serif, Arial;
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


