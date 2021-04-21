<template>
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
                  {{ $t('new_sessions') }}
                </div>

                <div class="doctors-block">
                  <div class="session-header">
                    <div class="student-name">
                      {{ user.first_name }} {{ user.last_name }}
                      <!--                    <a href="#" class="btn btn-primary" v-if="lang == 'en'">Profile</a>-->
                      <!--                    <a href="#" class="btn btn-primary" v-if="lang == 'ar'">البروفايل</a>-->
                    </div>
                    <div class="session-date">
                      {{ $t('today') }}
                    </div>

                    <div class="session-time">
                      {{ appointment.time }}
                    </div>
                    <a href="#" class="btn start-video" @click.prevent="getSessionTime()">
                      {{ $t('start_video_calling') }}
                      <img src="https://api.promental.net/images/website/Group696.svg" alt="">
                    </a>

                  </div>

                  <div class="student-row ">
                    <div class="student-wrapper">
                      <div class="student-info" v-if="user.user_type_id == 3">
                        <div class="student-info-row">
                          <span class="description school-name" ]]>{{ school.school_name }} {{ $t('school') }}</span>
                        </div>
                        <div class="student-info-row">
                          <span class="title"> {{ $t('date_of_birth') }}</span>
                          <span class="description">{{ user.BD }}</span>
                        </div>
                        <div class="student-info-row">
                          <span class="title">{{ $t('hobbies') }}</span>
                          <span class="description" v-for="(hobby,index) in hobbies">{{ hobby.value }} - </span>
                        </div>
                        <div class="student-info-row">
                          <span class="title"> {{ $t('brother_and_sisters_number') }}</span>
                          <!--                          <span class="description">3 sisters - 0 Brothers</span>-->
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-xs-12 margin-20">
                    <div class="report-wrapper" v-for="report,index in reports" :key="report.id">
                      {{ report.body }}
                    </div>
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

</template>

<script>
import DoctorSide from '~/layouts/DoctorSide';
import doctorNotifications from "@/components/doctorNotifications";

export default {
  head() {
    return {
      title: 'Single-session',
    };
  },
  components: {DoctorSide, doctorNotifications},
  layout: 'DoctorHeaderD',
  middleware:'doctorSuspend',
  data() {
    return {
      session: {},
      session_slug: this.$route.params.slug,
      school: {},
      student: {},
      user: {},
      appointment: {},
      hobbies: [],
      reports: {},
      message: ''
    }
  },
  created() {
    setInterval(() => this.getSessionTime(), 300000);
  },
  mounted() {
    this.getSession();
  },
  methods: {
    getSession() {
      this.$axios.$get('/doctors/sessions/' + this.session_slug + '/show')
        .then(response => {
          this.session = response.data;
          if (response.school) {
            this.school = response.school;
          }
          if (response.student) {
            this.student = response.student;
            this.hobbies = JSON.parse(this.student.hobbies)
            console.log('hobbies:' + this.hobbies)
          }
          this.user = response.user;
          this.appointment = response.appointment;
          this.reports = response.reports;
          console.log(this.reports)
        })
    },
    getSessionTime() {
      this.$axios.$get('/doctors/sessions/' + this.session_slug + '/getSessionTime')
        .then(response => {
          console.log(response)
          if (response.status == '500') {
            this.message = response.message
            if (response.data.error_message2) {
              if (this.current_lang == 'en') {
                this.$toast.error('session time is not coming yet : ' + response.data, {
                  action: {
                    class: 'toast',
                    text: 'cancel',
                    onClick: (e, toastObject) => {
                      toastObject.goAway(1000);
                    }
                  },
                })
              } else if (this.current_lang == 'ar') {
                this.$toast.error('وقت الجلسه لم ياتي: ' + response.data, {
                  action: {
                    class: 'toast',
                    text: 'الغاء',
                    onClick: (e, toastObject) => {
                      toastObject.goAway(1000);
                    }
                  },
                })
              }
            } else if (response.data.error_message) {
              if (this.current_lang == 'en') {
                this.$toast.error('session is time out', {
                  action: {
                    class: 'toast',
                    text: 'cancel',
                    onClick: (e, toastObject) => {
                      toastObject.goAway(1000);
                    }
                  },
                })
              } else if (this.current_lang == 'ar') {
                this.$toast.error('وقت الجلسه منتهي', {
                  action: {
                    class: 'toast',
                    text: 'الغاء',
                    onClick: (e, toastObject) => {
                      toastObject.goAway(1000);
                    }
                  },
                })
              }
            }

          } else if (response.status == '204') {

            this.message = response.message
            if (this.current_lang == 'en') {
              this.$toast.error('session time is not coming yet', {
                action: {
                  class: 'toast',
                  text: 'cancel',
                  onClick: (e, toastObject) => {
                    toastObject.goAway(1000);
                  }
                },
              })
            } else if (this.current_lang == 'ar') {
              this.$toast.error('وقت الجلسه لم ياتي بعد ', {
                action: {
                  class: 'toast',
                  text: 'الغاء',
                  onClick: (e, toastObject) => {
                    toastObject.goAway(1000);
                  }
                },
              })
            }

          } else if (response.status == '200') {
            this.message = response.message

            this.$axios.get('/doctors/sessions/' + this.session_slug + '/updateIsGoingStatus')
              .then(response => {
                console.log(response)
              })

            this.$router.push(this.localePath('/doctors/dashboard/sessions/' + this.session_slug + '/session-ongoing'))

          } else if (response.status == '201') {
            console.log(response)
            if (this.current_lang == 'ar') {
              this.$toast.error('وقت الجلسه منتهي', {
                action: {
                  class: 'toast',
                  text: 'الغاء',
                  onClick: (e, toastObject) => {
                    toastObject.goAway(1000);
                  }
                },
              })
            } else if (this.current_lang == 'en') {
              this.$toast.error(' session is time out', {
                action: {
                  class: 'toast',
                  text: 'الغاء',
                  onClick: (e, toastObject) => {
                    toastObject.goAway(1000);
                  }
                },
              })
            }
          }
        })
    }
  },
  computed: {
    current_lang() {
      return this.$i18n.locale
    }
  }
}
</script>

<style scoped>

*:not(i) {

  font-family: 'Montserrat', 'Cairo', serif, Arial;
}

.toast {
  font-family: 'Cairo' !important;
}

</style>
