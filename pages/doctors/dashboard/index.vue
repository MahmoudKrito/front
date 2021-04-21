<template>

  <div class="dashboard">
    <div :class="{ rtl : current_lang === 'ar' }">
      <main class="main-wrapper">

        <DoctorSide></DoctorSide>

        <section class="content-wrapper">
          <!-- Content -->
          <div class="container-fluid">
            <div class="main-content">
              <div class="content-side">
                <div class="row">
                  <div class="col-xs-12 col-lg-6">
                    <div class="section-wrapper">
                      <div class="section-title">
                        {{ $t('reservations') }}
                      </div>

                      <!-- Circle Percentage -->
                      <div class="box-container">
                        <div class="box-wrapper">
                          <div class="box-circle">
                            <div class="circle-border" data-color1="#1E1E2A" data-color2="#0F9400">
                              <div class="circle-percentage">
                                <span class="percentage" data-percentage="25"></span>
                              </div>
                            </div>
                          </div>
                          <div class="box-title">
                            <i class="fa fa-circle" style="color: #0F9400"></i>
                            {{ $t('total') }}
                          </div>
                        </div>

                        <div class="box-wrapper">
                          <div class="box-circle">
                            <div class="circle-border" data-color1="#1E1E2A" data-color2="#FF2462">
                              <div class="circle-percentage">
                                <span class="percentage" :data-percentage="count1"></span>
                              </div>
                            </div>
                          </div>
                          <div class="box-title">
                            <i class="fa fa-circle" style="color: #FF2462"></i>
                            {{ $t('done') }}
                          </div>

                        </div>

                        <div class="box-wrapper">
                          <div class="box-circle">
                            <div class="circle-border" data-color1="#1E1E2A" data-color2="#FF2AE2">
                              <div class="circle-percentage">
                                <span class="percentage" :data-percentage="count2"></span>
                              </div>
                            </div>
                          </div>
                          <div class="box-title">
                            <i class="fa fa-circle" style="color: #FF2AE2"></i>
                            {{ $t('remaining') }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-lg-6">
                    <div class="section-wrapper">
                      <div class="section-title">
                        {{ $t('earnings') }}
                      </div>
                      <div class="row margin-top-40">
                        <div class="col-xs-12 col-md-6">
                          <div class="earning-wrapper">
                            <div class="earning-icon">
                              <img src="https://api.promental.net/images/website/earning-accrued.svg" alt="">
                            </div>
                            <div class="earning-price">
                              {{ total_earnings }} L.#
                            </div>
                            <div class="earning-title">
                              {{ $t('accrued_earning') }}
                            </div>

                          </div>
                        </div>
                        <div class="col-xs-12 col-md-6">
                          <div class="earning-wrapper earnings-pending">
                            <div class="earning-icon">
                              <img src="https://api.promental.net/images/website/earning-pending.svg" alt="">
                            </div>
                            <div class="earning-price">
                              {{ pending_earnings }} L.#
                            </div>
                            <div class="earning-title">
                              {{ $t('pending_earning') }}

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Chart -->
                <div class="section-wrapper">
                  <GChart
                    type="LineChart"
                    :data="chartData"
                    style="height: 400px"
                    :options="chartOptions" v-if="chart_load"
                  />
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
import {GChart} from 'vue-google-charts'
import DoctorSide from '~/layouts/DoctorSide'
import $ from 'jquery';
import doctorNotifications from "@/components/doctorNotifications";

export default {
  head() {
    return {
      title: 'home',
    };
  },
  middleware:'doctorSuspend',
  layout: 'DoctorHeaderD',
  components: {DoctorSide, GChart, doctorNotifications},
  data() {
    return {
      count1: 0,
      count2: 0,
      chart_load: false,
      chartData: [],
      chartOptions: {},
      accured_payments: '',
      pending_payments: '',
      notifications: {},
      total_earnings: 0,
      pending_earnings: 0,

      // Array will be automatically processed with visualization.arrayToDataTable function
    }
  },
  mounted() {
    this.getStatistics();
    this.get_count();
    this.addPercentage();
    this.getTotalCredit()
  },
  methods: {
    getTotalCredit() {
      this.$axios.get('/doctors/payments/getTotalCredit')
        .then(response => {
          this.total_earnings = response.data.total
          this.pending_earnings = response.data.pending

        })
    },
    get_count() {
      if (this.$auth.user) {
        if (this.$auth.user.count1 > 0) {
          this.count1 = this.$auth.user.count1 / (parseInt(this.$auth.user.count1) + parseInt(this.$auth.user.count2)) * 100
        }
        if (this.$auth.user.count2 > 0) {
          this.count2 = this.$auth.user.count2 / (parseInt(this.$auth.user.count1) + parseInt(this.$auth.user.count2)) * 100
        }
      }
    },
    getStatistics() {
      this.$axios.$get('/doctors/statistics')
        .then(response => {
          this.statistics = response.data;
          this.accured_payments = response.occured_payments;
          this.pending_payments = response.pending_payments;
          this.chart_load = true;
          this.chartData = JSON.parse(this.statistics);
          this.chartOptions = {
            chart: {
              title: 'Company Performance',
              curveType: 'function',
              legend: {position: 'bottom'},
              colors: ['#0F9400', '#FF2462']
            }
          };
        })
    },
    addPercentage() {
      $(".box-circle").each(function () {
        let i = 0,
          that = $(this),
          circleBorder = that.find(".circle-border"),
          borderColor = circleBorder.data("color1"),
          animationColor = circleBorder.data("color2"),
          percentageText = that.find(".percentage"),
          percentage = percentageText.data("percentage"),
          degrees = percentage * 3.6;

        circleBorder.css({
          "background-color": animationColor
        });

        setTimeout(function () {
          loopIt();
        }, 1);

        function loopIt() {
          i = i + 1;

          if (i < 0) {
            i = 0;
          }

          if (i > degrees) {
            i = degrees;
          }

          percentage = i / 3.6;
          percentageText.text(percentage.toFixed(0) + " %");

          if (i <= 180) {
            circleBorder.css('background-image', 'linear-gradient(' + (90 + i) + 'deg, transparent 50%,' + borderColor + ' 50%),linear-gradient(90deg, ' + borderColor + ' 50%, transparent 50%)');
          } else {
            circleBorder.css('background-image', 'linear-gradient(' + (i - 90) + 'deg, transparent 50%,' + animationColor + ' 50%),linear-gradient(90deg, ' + borderColor + ' 50%, transparent 50%)');
          }

          setTimeout(function () {
            loopIt();
          }, 1);
        }
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

<style scoped>
*:not(i) {
  font-family: 'Montserrat', 'Cairo', serif, Arial;
}
</style>

