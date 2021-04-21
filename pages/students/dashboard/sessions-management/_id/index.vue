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

                  <div class="section-wrapper">

                    <p> {{ $t('choose_doctor') }} </p>
                    <form>
                      <div class="alert alert-danger" v-if="error_message">
                        {{ error_message }}
                      </div>

                      <div class="row">
                        <div class="col-6">
                          <div class="alert alert-danger" v-if="doctor_error">
                            {{ doctor_error }}
                          </div>
                          <div class="form-group" style="margin-top: 20px">
                            <select class="form-control" v-model="doctor_id" @change="getDoctorAppointments()">
                              <option value="0"> {{ $t('choose_doctor') }}</option>
                              <option v-for="doctor in doctors" :value="doctor.id">
                                {{current_lang === 'en' ? doctor.name_en: doctor.name_ar}}
                              </option>
                            </select>
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
                              <th scope="col">{{ $t('appointment_time') }}</th>
                              <th scope="col">{{ $t('session_price') }}</th>
                              <th scope="col">{{ $t('select') }}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(appointment,index) in appointments">
                              <td scope="row"> {{ ++index }}</td>
                              <td><span></span>{{ appointment.session_time }} {{ $t('minute') }}
                              </td>
                              <td> {{ appointment.session_price }} <span>{{ $t('l_e') }}</span>
                              </td>
                              <td><input type="radio" name="appointment_id" :value="appointment.id"
                                         v-model="appointment_id"></td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div class="form-group" style="margin-top: 20px">
                        <button class="btn btn-main" @click.prevent="addSessionAppointment()">{{ $t('done') }}</button>
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
      session_id: this.$route.params.id,
      doctors: {},
      doctor_id: 0,
      appointments: {},
      date: '',
      all_appointments: ["2018-03-03", "2018-03-05"],
      user_id: this.$auth.user.user.id,
      error_message: '',
      appointment_id: 0,
      appointment_error: '',
      doctor_error: ''
    }
  },
  mounted() {
    this.getDoctors()
    this.getAppAppointments()
  },
  methods: {
    getDoctors() {
      this.$axios.get('/student/sessions-management/getDoctors')
        .then(response => {
          this.doctors = response.data.data
        })
    },
    getAppAppointments() {
      this.$axios.get('/student/sessions-management/getAllAppointments')
        .then(response => {
          this.all_appointments = response.data.data
          console.log(response)
        })
    },
    getAllowedDates(val) {
      if (this.all_appointments.indexOf(val) !== -1) {
        return true
      } else {
        return false
      }
    },
    getDoctorAppointments() {
      this.$axios.get('/student/sessions-management/' + this.doctor_id + '/getDoctorAppointments')
        .then(response => {
          this.all_appointments = response.data.data
        })
    },
    getDate() {
      this.error_message = "";
      if (process.client) {
        if (this.doctor_id > 0) {
          this.$axios.$post('/student/sessions-management/' + this.doctor_id + '/getDoctorAppointmentsAvailable', {
            date: this.date,
            doctor_id: this.doctor_id,
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
        } else {
          if (this.current_lang == 'en') {
            this.error_message = 'choose doctor first'
          } else if (this.current_lang == 'ar') {
            this.error_message = ' اختار دكتور اولا '
          }

        }

      }
    },
    addSessionAppointment() {
      this.appointment_error = '';
      this.doctor_error = '';
      if (this.appointment_id == 0) {
        if (this.current_lang == 'en') {
          this.appointment_error = 'add your appointment'
        } else if (this.current_lang == 'ar') {
          this.appointment_error = ' اضف المعاد'
        }
      }
      if (this.doctor_id == 0) {
        if (this.current_lang == 'en') {
          this.doctor_error = 'add doctor '
        } else if (this.current_lang == 'ar') {
          this.doctor_error = ' اضف الدكتور'
        }
      }

      if (this.doctor_id && this.appointment_id) {
        this.$axios.$post('/student/sessions-management/' + this.session_id + '/addSessionAppointment', {
          appointment_id: this.appointment_id,
          doctor_id: this.doctor_id,
          date:this.date,
        })
          .then(response => {
            if (response.status == '200') {
              // if (this.current_lang == 'en') {
              //   this.$swal('appointment added')
              // } else if (this.current_lang == 'ar') {
              //   this.$swal('تم اضافه المعاد ')
              // }
              this.$router.push(this.localePath('/students/dashboard/sessions-management/'))
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

td, th {
  padding: 8px !important;
  text-align: center;
}
</style>

