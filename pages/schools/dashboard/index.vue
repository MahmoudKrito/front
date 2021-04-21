<template>
  <div class="dashboard">
    <div :clas="{rtl:current_lang === 'ar'}">
      <main class="main-wrapper">
        <SchoolSide></SchoolSide>
        <section class="content-wrapper">
          <div class="container-fluid">
            <div class="main-content">
              <div class="content-side">

                <div class="section-wrapper">
                  <GChart type="LineChart" :data="chartData" style="height: 400px" :options="chartOptions"
                          v-if="chart_load"/>
                </div>

                <!-- Circle Percentage -->
                <div class="row">
                  <div class="col-xs-12 col-md-6">
                    <div class="section-wrapper">
                      <div class="box-container">
                        <div class="box-wrapper">
                          <div class="box-circle">
                            <div class="circle-border" data-color1="#1E1E2A"
                                 data-color2="#0F9400">
                              <div class="circle-percentage">
                                <span class="percentage" :data-percentage="count2>0 ? count2 : 0"></span>
                              </div>
                            </div>
                          </div>
                          <div class="box-title">
                            <i class="fa fa-circle" style="color: #0F9400"></i>
                            {{ $t('total_sessions') }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-md-6">
                    <div class="section-wrapper">
                      <div class="box-container">
                        <div class="box-wrapper">
                          <div class="box-circle">
                            <div class="circle-border" data-color1="#1E1E2A"
                                 data-color2="#FF2462">
                              <div class="circle-percentage">
                                <span class="percentage" :data-percentage="count1>0 ? count1 :0 "></span>
                              </div>
                            </div>
                          </div>
                          <div class="box-title">
                            <i class="fa fa-circle" style="color: #FF2462"></i>
                            {{ $t('sessions_done') }}
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <schoolNotifications></schoolNotifications>

            </div>
          </div>
        </section>
      </main>
      <!-- Modal -->
      <transition name="fade">
        <div class="modal fade modal-stats" id="modal1" tabindex="-1" role="dialog" v-show="isModal1"
             style="opacity:0.9 !important">

          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-body" style="margin-top:40%;">
                <div class="section-wrapper">
                  <button type="button" class="close" @click="closeModal()"><span aria-hidden="true">&times;</span>
                  </button>
                  <div class="clearfix"></div>
                  <div class="row">
                    <div class="col-xs-12 col-md-4">
                      <div class="box-container">
                        <div class="box-wrapper">
                          <div class="box-circle">
                            <div class="circle-border" data-color1="#1E1E2A"
                                 data-color2="#0F9400">
                              <div class="circle-percentage">
                                <span class="percentage" data-percentage="25"></span>
                              </div>
                            </div>
                          </div>
                          <div class="box-title">
                            <i class="fa fa-circle" style="color: #0F9400"></i>
                            {{ $t('total_sessions') }}
                          </div>

                        </div>
                      </div>
                    </div>
                    <div class="col-xs-12 col-md-8">
                      <div class="box-container">
                        <div class="box-wrapper">

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->

        </div><!-- /.modal -->
      </transition>


      <div class="modal fade modal-stats" id="modal2" tabindex="-1" role="dialog" v-show="isModal2"
           style="opacity:0.9 !important">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body" style="margin-top:40%;">
              <div class="section-wrapper">
                <button type="button" class="close" @click="closeModal()"><span
                  aria-hidden="true">&times;</span>
                </button>
                <div class="clearfix"></div>
                <div class="row">
                  <div class="col-xs-12 col-md-4">
                    <div class="box-container">
                      <div class="box-wrapper">
                        <div class="box-circle">
                          <div class="circle-border" data-color1="#1E1E2A" data-color2="#FF2462">
                            <div class="circle-percentage">
                              <span class="percentage" data-percentage="50"></span>
                            </div>
                          </div>
                        </div>
                        <div class="box-title">
                          <i class="fa fa-circle" style="color: #0F9400"></i>
                          {{ $t('total_sessions') }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-md-8">
                    <div class="box-container">
                      <div class="box-wrapper">

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
      </div><!-- /.modal -->
    </div>
  </div>

</template>

<script>
import SchoolSide from '../../../layouts/SchoolSideD'
import {GChart} from 'vue-google-charts'
import $ from 'jquery';
import schoolNotifications from '../../../components/schoolNotifications';

export default {
  head() {
    return {
      title: 'home',
    };
  },
  layout: 'SchoolHeaderD',
  components: {SchoolSide, GChart, schoolNotifications},
  middleware: 'schoolSuspend',
  data() {
    return {
      isModal1: false,
      isModal2: false,
      chart_load: false,
      completed_sessions: 0,
      uncompleted_sessions: 0,
      chartData: [],
      chartOptions: {},
      count1: 0,
      count2: 0,
      notifications: {}

    }
  },
  mounted() {
    this.get_count();
    this.getStatistics();
    this.addPercentage();
    this.getNotifications();
  },
  methods: {
    getNotifications() {
      this.$axios.$get('/school/notifications')
        .then(response => {
          this.notifications = response.data;
        })
    },
    get_count() {
      if (this.$auth.user) {
        if (this.$auth.user.completed_sessions) {
          this.count1 = (this.$auth.user.completed_sessions / (this.$auth.user.completed_sessions + this.$auth.user.uncompleted_sessions)) * 100
        }
        if (this.$auth.user.completed_sessions) {
          this.count2 = (this.$auth.user.uncompleted_sessions / (this.$auth.user.completed_sessions + this.$auth.user.uncompleted_sessions)) * 100
        }
      }
    },

    getStatistics() {
      this.$axios.$get('/school/statistics')
        .then(response => {
          this.statistics = response.data;
          console.log(this.statistics);
          this.completed_sessions = response.completed_sessions;
          this.uncompleted_sessions = response.uncompleted_sessions;
          this.chart_load = true;
          this.chartData = this.statistics;
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
    showModal1() {
      this.isModal1 = true
    },
    showModal2() {
      this.isModal2 = true
    },
    closeModal() {
      this.isModal1 = false;
      this.isModal2 = false;
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
.main-wrapper{
  padding-top:100px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease-out !important;
}

.fade-enter, .fade-leave-to {
  opacity: 0 !important;
}

*:not(i) {
  font-family: 'Montserrat', 'Cairo', serif, Arial;
}

.modal {
  background: #454545;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

</style>
