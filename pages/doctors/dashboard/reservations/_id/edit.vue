<template>

  <div :class="{rtl:current_lang === 'ar'}">
    <!-- Content -->
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
                  {{ $t('reservations') }}
                </div>

                <div class="doctors-block">
                  <div class="set-time">
                    <div class="student-details">
                      <div class="student-name">{{ user.first_name }} {{ user.last_name }}</div>
                      <div class="school-name" v-if="school.length > 0">{{ school.school_name }}
                        {{ $t('school') }}
                      </div>
                    </div>

                    <div class="alert alert-danger" v-if="message">
                      {{ message }}
                    </div>

                    <div class="row">
                      <div class="col-xs-12 col-md-6 col-lg-4 margin-20">
                        <datetime v-model="date" :placeholder="$t('date')"
                                  input-class="form-control" style="font-family: 'Cairo' !important"></datetime>
                        <small class="text-white" v-if="date_message" style="color:#fff !important">
                          {{ date_message }}
                        </small>
                      </div>
                      <div class="col-xs-12 col-md-6 col-lg-4 margin-20">
                        <datetime type="time" v-model="time" input-class="form-control"
                                  :placeholder="$t('time')" zone="UTC"
                                  style="font-family: 'Cairo'"></datetime>
                        <small class="text-white" v-if="time_message" style="color:#fff !important">
                          {{ time_message }}
                        </small>
                      </div>
                      <div class="col-xs-12 col-lg-4">
                        <div class="selected-day">
                          <img src="https://api.promental.net/images/website/waiting2.svg" alt="">
                          {{ appointment.day }} {{ appointment.date |formatDateByMonth }}
                        </div>
                        <div class="selected-time">
                          {{ appointment.time }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="hello-week"></div>
                  <!-- Session details -->

                  <div class="row">
                    <div class="col-xs-12 col-lg-6">
                      <div class="session-details-wrapper">
                        <div class="session-title">
                          {{ $t('session_details') }}
                        </div>

                        <div class="session-description" v-for="note in notes">
                          {{ note }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-xs-12 col-lg-8">
                      <div class="session-details-wrapper">
                        <div class="row">
                          <div class="col-xs-12 col-lg-8">
                            <div>
                            <textarea class="form-control" name="" rows="6"
                                      :placeholder="current_lang == 'en' ? 'Leave your note here...' : 'ادخل ملاحظتك هنا'"
                                      v-model="body"></textarea>
                              <small class="text-danger" v-if="body_message">{{ body_message }}
                              </small>
                            </div>
                          </div>
                          <div class="col-xs-12 col-lg-4">
                            <a href="" class="btn btn-primary btn-sm"
                               @click.prevent="editReservationTime()">{{ $t('edit') }}</a>

                          </div>
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

</template>

<script>
import DoctorSide from '../../../../../layouts/DoctorSide'
import {Datetime} from 'vue-datetime';
import doctorNotifications from "@/components/doctorNotifications";

export default {
  head() {
    return {
      title: 'reservation-edit',
    };
  },
  layout: 'DoctorHeaderD',
  components: {DoctorSide, Datetime, doctorNotifications},
  middleware:'doctorSuspend',
  data() {
    return {
      reservation_id: '',
      reservation: {},
      school: {},
      user: {},
      appointment: {},
      date: '',
      time: '',
      body: '',
      date_message: '',
      time_message: '',
      body_message: "",
      doctor_token: '',
      message: '',
      notes: []
    }
  },
  mounted() {
    this.storage();
    this.getReservation();
    // this.getMinutes()
  },
  methods: {
    storage() {
      this.reservation_id = this.$route.params.id;
    },
    getReservation() {
      this.$axios.$get('/doctors/reservations/' + this.reservation_id + '/show')
        .then(response => {
          this.reservation = response.data;
          this.user = response.user;
          this.appointment = response.appointment;
          if (response.school) {
            this.school = response.school
          }
          if (this.reservation.notes) {
            this.notes = JSON.parse(this.reservation.notes);
          }

          console.log(this.reservation)
        })
    }
    ,
    getMinutes() {
      var twentyMinutesLater = new Date();
      twentyMinutesLater.setMinutes(twentyMinutesLater.getMinutes() + 20);
      console.log(twentyMinutesLater)
    }
    ,
    editReservationTime() {
      if (!this.date) {
        if (this.current_lang == 'en') {
          this.date_message = 'enter date'
        } else if (this.current_lang == 'ar') {
          this.date_message = 'ادخل التاريخ'
        }
      }
      if (!this.time) {
        if (this.current_lang == 'en') {
          this.time_message = 'enter time'
        } else if (this.current_lang == 'ar') {
          this.time_message = 'ادخل الوقت '
        }
      }
      if (!this.body) {
        if (this.current_lang == 'en') {
          this.body_message = 'enter your note'
        } else if (this.current_lang == 'ar') {
          this.body_message = ' ادخل ملاحظتك'
        }
      } else if (this.time && this.date && this.body) {
        this.date_message = '';
        this.time_message = '';
        this.$axios.$post('doctors/reservations/' + this.reservation_id + '/edit', {
          date: this.date,
          time: this.time,
          body: this.body
        })
          .then(response => {
            console.log(response);
            this.$axios.$post('doctors/reservations/' + this.reservation_id + '/addNote', {
              body: this.body
            })
              .then(response => {
                if (response.status == '200') {
                  if (this.current_lang == 'en') {
                    this.$swal('reservation edited');
                  } else if (this.current_lang == 'ar') {
                    this.$swal(' تم تعديل الحجز');
                  }
                  this.$router.push(this.localePath('/doctors/dashboard/reservations'))
                } else if (response.status == '500') {
                  if (this.current_lang == 'en') {
                    this.message = 'no appointment available';
                  } else if (this.current_lang == 'ar') {
                    this.message = ' لا يوجد مواعيد متاحه';
                  }

                }
              })
          });

      }
    }
    ,
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

.btn {
  text-align: center
}
</style>
