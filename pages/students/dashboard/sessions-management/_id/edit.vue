<template>
  <v-app>
    <div class="dashboard">
      <div :clas="{rtl:current_lang === 'ar'}">
        <main class="main-wrapper">
          <StudentSide></StudentSide>
          <section class="content-wrapper">
            <!-- Content -->
            <div class="container-fluid">
              <div class="main-content">
                <div class="content-side">

                  <div class="section-wrapper" style="margin-top: 50px;">

                    <form>
                      <div class="alert alert-danger" v-if="error_message">
                        {{ error_message }}
                      </div>

                      <div class="row" v-if="isLoaded">
                        <div class="col-6">
                          <div class="form-group" style="margin-top: 20px">
                            <input type="text" :value="current_lang === 'en' ? session.doctor.name_en: session.doctor.name_ar" readonly
                                   class="form-control" style="color:#000000">
                          </div>
                          <div class="form-group" style="margin-top: 20px">
                            <input type="text"
                                   :value="appointment.session_time + ' ' +'Minute' + ' , '+appointment.time +' , '+session.start_date"
                                   readonly class="form-control" style="color:#000000">
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="form-group" style="margin-top: 20px">
                            <v-row justify="space-around">
                              <v-date-picker v-model="date" color="green lighten-1" header-color="primary"
                                             :allowed-dates="getAllowedDates" @change="getDate()"></v-date-picker>
                            </v-row>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-6">
                          <div class="alert alert-danger" v-if="appointment_error">
                            {{ appointment_error }}
                          </div>
                          <table class="table" v-if="appointments.length > 0">
                            <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">{{ $t('appointment') }} {{ $t('time') }}</th>
                              <th scope="col">{{ $t('session') }} {{ $t('price') }}</th>
                              <th scope="col">{{ $t('select') }}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(appointment,index) in appointments">
                              <td scope="row">{{ ++index }}</td>
                              <td>{{ appointment.time }}</td>
                              <td>{{ appointment.session_price }}</td>
                              <td><input type="radio" name="appointment_id" :value="appointment.id"
                                         v-model="appointment_id"></td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div class="form-group" style="margin-top: 20px">
                        <button class="btn btn-main" @click.prevent="editSessionAppointment()">{{ $t('done') }}</button>
                      </div>

                    </form>

                  </div>
                </div>
                <studentNotifications></studentNotifications>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  </v-app>
</template>

<script>

import StudentSide from '~/layouts/StudentSideD';
import studentNotifications from '~/components/studentNotifications';

export default {
  layout: 'StudentHeaderD',
  components: {StudentSide, studentNotifications},
  data() {
    return {
      date: '',
      appointment_error: '',
      error_message: '',
      session_id: this.$route.params.id,
      session: {},
      appointment: {},
      doctor: {},
      isLoaded: false, all_appointments: {},
      available_appointments: {},
      user_id: this.$auth.user.user.id,
      appointments: {},
      appointment_id: ""

    }
  },
  mounted() {
    this.getSession()
  },
  methods: {
    getSession() {
      this.$axios.get('/student/sessions-management/' + this.session_id + '/show')
        .then(response => {
          this.isLoaded = true
          this.session = response.data.data;
          this.doctor = response.data.doctor
          this.appointment = response.data.appointment
          this.available_appointments = response.data.available_appointments
        })
    },
    getAllowedDates(val) {
      if (this.available_appointments.indexOf(val) !== -1) {
        return true
      } else {
        return false
      }
    },
    getDate() {
      this.error_message = "";
      if (process.client) {
        this.$axios.$post('/student/sessions-management/' + this.doctor.id + '/getDoctorAppointmentsAvailable', {
          date: this.date,
          doctor_id: this.doctor.id,
          user_id: this.user_id
        }).then(response => {
          console.log(response)
          if (response.status == '200') {
            this.appointments = response.appointments;
          } else if (response.status == '500') {

            if (this.current_lang == 'en') {
              this.$swal('no appointments available')
            } else if (this.current_lang == 'ar') {
              this.$swal(' لا يوجد مواعيد متاحه')
            }
            this.appointments = {};
          }
        })
      }

    },
    editSessionAppointment() {
      this.appointment_error = '';
      this.error_message = ''
      if (!this.appointment_id) {
        if (this.current_lang == 'en') {
          this.appointment_error = 'add your appointment'
        } else if (this.current_lang == 'ar') {
          this.appointment_error = 'اضف المعاد'
        }

      } else {
        this.$axios.$post('/student/sessions-management/' + this.session_id + '/edit', {
          appointment_id: this.appointment_id,
          date:this.date
        }).then(response => {
          if (response.status == '200') {
            if (this.current_lang == 'en') {
              this.$swal('session appointment updated')
            } else if (this.current_lang == 'ar') {
              this.$swal('تم تعديل معاد الجلسه ')
            }
            this.$router.push(this.localePath('/students/dashboard/sessions-management'))
          } else if (response.status == '500') {
            this.error_message = 'can not edit session time'
          }
        })
      }
    }
  },
  computed: {
    current_lang() {
      return this.$i18n.locale
    },
  }
}
</script>

<style scoped>
.main-wrapper{
  padding-top:100px;
}

</style>
