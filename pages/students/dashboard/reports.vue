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
                <!--  -->
                <div class="section-wrapper">
                  <div class="tabs-wrapper">

                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs" role="tablist">
                      <li role="presentation" class="active" @click="addActive()"><a href="#reports"
                                                                                     aria-controls="reports"
                                                                                     role="tab" data-toggle="tab">{{$t('reports')}}</a>
                      </li>
                      <li role="presentation"><a href="#doctor" aria-controls="doctor" role="tab"
                                                 data-toggle="tab" v-for="(doctor,index) in doctors"
                                                 :key="doctor.id"
                                                 @click="getDoctorReports(doctor.account_id)">By Dr.{{doctor.first_name}} {{ doctor.last_name }}</a></li>

                    </ul>
                    <div class="alert alert-danger" role="alert" v-if="message" style="margin-top: 80px;">
                      {{ message }}
                    </div>
                    <!-- Tab panes -->
                    <div class="tab-content" v-if="reports">
                      <div role="tabpanel" class="tab-pane active" id="reports">
                        <div class="report-wrapper" v-for="report,index in reports" :key="report.id">
                          {{ report.body }}
                        </div>
                      </div>
                      <div role="tabpanel" class="tab-pane" id="doctor">
                        <div class="report-wrapper" v-for="doctor_report,index in doctor_reports">
                          {{ doctor_report.body }}
                        </div>
                      </div>
                    </div>

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
import $ from "jquery";
import studentNotifications from "~/components/studentNotifications"

export default {
  layout: 'StudentHeaderD',
  head() {
    return {
      title: 'Reports',
    };
  },
  components: {StudentSide, studentNotifications},
  data() {
    return {
      reports: {},
      message: '',
      doctors: {},
      doctor_reports: {},
      school: this.$auth.user.school
    }
  },
  mounted() {
    this.getReports();
  },
  methods: {
    addActive() {
      $('li').click(function () {
        var app = this;
        $(app).addClass('active');
        $(app).siblings().removeClass('active');
      })
    },
    getReports() {
      this.$axios.$get('/student/reports')
        .then(response => {
          if (response.status == '200') {
            this.reports = response.data;
            this.doctors = response.doctors;
          } else if (response.status == '204') {
            this.message = 'no available reports'
          }
        })
    },
    getDoctorReports(id) {
      $('li').click(function () {
        var app = this;
        $(app).addClass('active');
        $(app).siblings().removeClass('active')
      });

      this.$axios.$get('/student/reports/' + id + '/show')
        .then(response => {
          this.doctor_reports = response.data;
          console.log(this.doctor_reports)
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
.main-wrapper{
  padding-top:100px;
}
*:not(i) {
  font-family: 'Montserrat', 'Cairo', serif, Arial;
}
</style>
