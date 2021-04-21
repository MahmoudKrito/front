<template>
  <div class="dashboard">
    <div :class="{rtl:current_lang === 'ar'}">
      <main class="main-wrapper">
        <StudentSide></StudentSide>
        <section class="content-wrapper">
          <!-- Header -->
          <!-- Content -->
          <div class="container-fluid">
            <div class="main-content">
              <div class="content-side">
                <div class="section-wrapper">
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
                        {{ $t('total_sessions') }}
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
                        {{ $t('sessions_done') }}
                      </div>

                    </div>

                    <div class="box-wrapper">
                      <div class="box-circle">
                        <div class="circle-border" data-color1="#1E1E2A" data-color2="#FF2AE2">
                          <div class="circle-percentage">
                            <span class="percentage" :data-percentage="remain"></span>
                          </div>
                        </div>
                      </div>
                      <div class="box-title">
                        <i class="fa fa-circle" style="color: #FF2AE2"></i>
                        {{ $t('remain') }}
                      </div>

                    </div>
                  </div>
                </div>
                <!--  -->
                <div class="row">
                  <div class="col-xs-12 col-md-6 col-lg-4">
                    <div class="section-wrapper">
                      <div class="section-title">
                        {{ $t('last_sessions') }}
                      </div>

                      <table class="table">
                        <tr v-for="(session,index) in sessions" :key="session.id">
                          <td>
                            {{ session.date }}
                            <i class="fa fa-eye"></i>
                          </td>
                        </tr>
                      </table>
                      <nuxt-link :to="localePath('/students/dashboard/sessions')"
                                 class="btn see-all-sessions">
                        {{ $t('see_all_sessions') }}
                      </nuxt-link>

                    </div>
                  </div>
                  <div class="col-xs-12 col-md-6 col-lg-8">


                    <nuxt-link :to="localePath('/students/dashboard/sessions/'+session.slug+'/start')"
                               class="btn next-session-btn" v-if="Object.keys(session).length !== 0">
                      {{ $t('start_new_session') }}
                      <!--                    <img src="https://api.promental.net/images/website/RepeatGrid1.svg" alt="">-->
                    </nuxt-link>


                    <button type="button"
                            class="btn next-session-btn" v-if="message">
                      {{ message }}
                      <!--                    <img src="https://api.promental.net/images/website/RepeatGrid1.svg" alt="">-->
                    </button>

                  </div>
                </div>
              </div>
              <studentNotifications></studentNotifications>

            </div>
          </div>
        </section>
      </main>
    </div>
  </div>

</template>

<script>
import StudentSide from '~/layouts/StudentSideD'
import $ from 'jquery'
import studentNotifications from "~/components/studentNotifications"

export default {
  layout: 'StudentHeaderD',
  head() {
    return {
      title: 'Home',
    };
  },
  components: {StudentSide, studentNotifications},
  data() {
    return {
      sessions: {},
      count1: 0,
      count2: 0,
      remain: 0,
      session_not_done_count: '',
      user: this.$auth.user.user,
      school: this.$auth.user.school,
      session: false,
      message: '',
      time_remain: "",
      notifications: {}
    }
  },
  mounted() {
    this.addPercentage();
    this.getSessions();
    this.getNextSessionTime();
    this.getNotifications()
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
        if (this.$auth.user.count1 > 0) {
          this.count1 = (this.$auth.user.count1 / this.$auth.user.count2) * 100
        }
        if (this.$auth.user.count2 > 0) {
          this.count2 = this.$auth.user.count2
          this.remain = ((this.$auth.user.count2 - this.$auth.user.count1) / this.$auth.user.count2) * 100
        }
      }
    },
    getSessions() {
      this.$axios.$get('/student/sessions')
        .then(response => {
          if (response.status == 200) {
            this.sessions = response.data
            console.log(this.sessions)
          } else if (response.status == '204') {
            this.message = 'no associated sessions'
          }

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
        }

      })
    },
    getNextSessionTime() {
      this.$axios.get('student/sessions/getNextSessionTime')
        .then(response => {
          if (response.data.status == '200') {
            this.session = response.data.data;
            console.log(this.session)
            this.time_remain = response.data.time_remain
          } else if (response.data.status == '500') {
            if (this.current_lang == 'en') {
              this.message = 'no available session'
            } else if (this.current_lang == 'ar') {
              this.message = 'لا يوجد جلسه متاحه'
            }

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
.main-wrapper {
 padding-top: 100px !important;
}
*:not(i) {
  font-family: 'Montserrat', 'Cairo', serif, Arial;
}
</style>
