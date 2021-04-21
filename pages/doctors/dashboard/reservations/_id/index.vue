<template>
  <div class="dashboard">
    <div :class="{rtl:current_lang === 'ar'}">
      <!-- Content -->
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
                    <div class="reservation-row">
                      <div class="student-details">
                        <div class="student-name">{{ user.first_name }} {{ user.last_name }}</div>
                        <div class="school-name" v-if="school.length > 0">{{ school.name }} {{ $t('school') }}
                        </div>
                        <div class="school-name" v-else> {{ $t('user') }}</div>
                      </div>
                      <div class="reservation-date">
                        <img src="https://api.promental.net/images/website/waiting.svg" alt="" width="20">
                        {{ appointment.date }} {{ appointment.date | formatDateByMonth }}
                      </div>
                      <div class="reservation-time">
                        {{ appointment.time }}
                      </div>
                      <div class="reservation-edit">
                        <nuxt-link :to="localePath('/doctors/dashboard/reservations/' + reservation.id + '/edit')">
                          <i class="fa fa-gear fa-2x"></i>
                        </nuxt-link>
                      </div>
                    </div>
                    <div class="student-info">
                      <div class="student-info-row" v-if="school.length > 0">
                                        <span class="title">
                                          {{ $t('date_of_birth') }}
                                        </span>
                        <span class="description">{{ user.BD }} {{ user.BD | formatDateByMonth }} {{ user.BD }}</span>
                      </div>
                      <div class="student-info-row" v-if="school.length > 0">
                        <span class="title">{{ $t('hobbies') }}</span>
                        <span class="description" v-if="student" v-for="hobby in hobbies">{{ hobby.value }}  - </span>
                      </div>
                      <div class="student-info-row" v-if="school.length > 0">
                        <span class="title"> {{ $t('brother_and_sisters_number') }}</span>
                        <span class="description" v-if="student" v-for="sibling in siblings">{{ sibling.value }} - </span>
                      </div>
                    </div>

                    <!-- Session details -->
                    <div class="row">
                      <div class="col-xs-12 col-lg-6">
                        <div class="session-details-wrapper">
                          <div class="session-title">
                            {{ $t('last_session_details') }}
                            <span class="pull-right session-date">{{last_session_appointment.date}} {{ last_session_appointment.date | formatDateByMonth }} </span>
                          </div>

                          <div class="session-description" v-for="note in notes">
                            {{ note }}
                            <hr>
                          </div>
                        </div>
                      </div>
                      <div class="col-xs-12 col-lg-6">
                        <div class="session-details-wrapper">
                          <!--                        <div class="session-title">-->
                          <!--                          {{ $t('reports') }}-->
                          <!--                        </div>-->
                          <!--                        <div class="session-description" v-for="(report,index) in reports">-->
                          <!--                          {{ report.body }}-->
                          <!--                        </div>-->

                          <div class="session-title">
                            {{ $t('notes') }}
                          </div>
                          <div class="session-description" v-for="(session_note,index) in session_notes">
                            {{ session_note }}
                          </div>

                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xs-12 col-lg-8">
                        <div class="session-details-wrapper">
                          <div class="session-title">
                            {{ $t('add_note') }}
                            <span class="pull-right"><a href="#" class="btn btn-primary btn-sm"
                                                        @click.prevent="addNote()">{{ $t('add') }}</a></span>
                            <div class="clearfix"></div>
                          </div>

                          <div>
                          <textarea class="form-control" name="" rows="4"
                                    :placeholder="current_lang=='en' ? 'Leave your note here...' : 'اترك ملاحظتك هنا....'"
                                    v-model="body"></textarea>
                            <small class="text-danger" v-if="message">{{ message }}</small>
                          </div>
                        </div>
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
  </div>

</template>

<script>
import DoctorSide from '~/layouts/DoctorSide';
import doctorNotifications from "@/components/doctorNotifications";

export default {
  head() {
    return {
      title: 'reservation-single',
    };
  },
  layout: 'DoctorHeaderD',
  components: {DoctorSide, doctorNotifications},
  middleware:'doctorSuspend',
  data() {
    return {
      reservation_id: '',
      user: {},
      reservation: {},
      appointment: {},
      school: {},
      student: {},
      hobbies: [],
      siblings: [],
      lastSession: {},
      reports: {},
      notes: [],
      last_session_appointment: {},
      body: '',
      message: '',
      session_notes:[]
    }
  },
  mounted() {
    this.storage();
    this.getReservation();
    this.getLastSession()
  },
  methods: {
    storage() {
      this.reservation_id = this.$route.params.id
    },
    getReservation() {
      this.$axios.$get('/doctors/reservations/' + this.reservation_id + '/show')
        .then(response => {
          this.reservation = response.data;
          this.user = response.user;
          this.appointment = response.appointment;
          if(this.reservation.notes){
            this.session_notes = JSON.parse(this.reservation.notes)
          }

          if (response.data.school) {
            this.school = response.school
          }
          if (response.data.student) {
            this.student = response.student;
            this.hobbies = JSON.parse(this.student.hobbies);
            this.siblings = JSON.parse(this.student.siblings)
          }
        })
    },
    getLastSession() {

      this.$axios.$get('/doctors/reservations/' + this.reservation_id + '/getLastSession')
        .then(response => {
          this.lastSession = response.data;
          this.last_session_appointment = response.appointment;

          if (response.reports) {
            this.reports = response.reports;
          }
          if (this.lastSession) {
            this.notes = JSON.parse(this.lastSession.notes);
          }

          console.log(this.reports)
        })
    },
    addNote() {

      if (!this.body) {
        if (this.current_lang == 'en') {
          this.message = 'add your note'
        } else if (this.current_lang == 'ar') {
          this.message = 'اضف ملاحظتك  '
        }

      } else {
        this.message = '';
        this.$axios.$post('/doctors/reservations/' + this.reservation_id + '/addNote', {
          body: this.body
        })
          .then(response => {
            this.body = '';

            if (this.current_lang == 'en') {
              this.$swal('note added');
            } else if (this.current_lang == 'ar') {
              this.$swal(' تم اضافه ملاحظتك');
            }
            this.$router.push(this.localePath('/doctors/dashboard/reservations'));

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

<style lang="css" scoped>
*:not(i) {
  font-family: 'Montserrat', 'Cairo', serif, Arial;
}

a {
  color: #2BB788;
}

.btn {
  color: #fff !important;
  text-align: center;
}

.btn-primary {
  background: #285E75;
}

</style>
