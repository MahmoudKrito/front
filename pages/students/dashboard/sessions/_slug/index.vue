<template>
  <div class="dashboard">
    <div :clas="{rtl:current_lang === 'ar'}">
      <!-- Content -->
      <main class="main-wrapper">
        <StudentSide></StudentSide>
        <section class="content-wrapper">

          <!-- Content -->
          <div class="container-fluid">
            <div class="main-content">
              <div class="content-side">
                <!--  -->
                <div class="section-wrapper">
                  <div class="row">
                    <div class="col-xs-12 col-lg-4">
                      <div class="session-details">
                        <div class="session-title">{{ $t('session') }}</div>
                        <div class="doctor-name">
                          {{ current_lang == 'en' ? doctorType.name_en : doctorType.name_ar }}.
                          {{ current_lang == 'ar' ? doctor.name_ar : doctor.name_en }}
                        </div>
                        <div class="session-date">{{ session.start_date }}</div>
                      </div>
                    </div>
                    <div class="col-xs-12 col-lg-8">
                      <div class="tabs-wrapper">
                        <ul class="nav nav-tabs" role="tablist">
                          <li role="presentation" class="active" @click="addActive()">
                            <a href="#reports" aria-controls="reports" role="tab" data-toggle="tab">{{ $t('reports') }}
                            </a>
                          </li>
                          <li role="presentation" @click="addActive()">
                            <a href="#notes" aria-controls="notes" role="tab" data-toggle="tab">{{ $t('notes') }}
                            </a>
                          </li>
                          <li role="presentation" @click="addActive()">
                            <a href="#complains" aria-controls="complains" role="tab"
                               data-toggle="tab">{{$t('complains')}}
                            </a>
                          </li>
                        </ul>

                        <div class="tab-content">
                          <div role="tabpanel" class="tab-pane active" id="reports">
                            <div class="report-wrapper" v-for="report,index in reports">
                              {{ report.body }}
                            </div>
                          </div>
                          <div role="tabpanel" class="tab-pane" id="notes">
                            <div class="report-wrapper" v-for="note,index in notes">
                              {{ note }}
                            </div>
                          </div>

                        </div>

                      </div>
                      <div class="text-right">
                        <a href="#" class="btn btn-success">{{ $t('done') }}</a>
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
import studentNotifications from '~/components/studentNotifications';

export default {
  layout: 'StudentHeaderD',
  head() {
    return {
      title: 'Session-single',
    };
  },
  components: {StudentSide, studentNotifications},
  data() {
    return {
      session_slug: '',
      session: {},
      notes: {},
      doctor: {},
      doctorType: {},
      reports: {},
      appointment: {},
      user: {},
      icons: false,
      centered: false,
      grow: false,
      vertical: false,
      prevIcon: false,
      nextIcon: false,
      right: false,
      tabs: 3,
      school: this.$auth.user.school
    }
  },
  mounted() {
    this.storage();
    this.getSession()
  },
  methods: {
    storage() {
      this.session_slug = this.$route.params.slug;
    },
    addActive() {
      $('li').click(function () {
        var app = this
        $(app).addClass('active');
        $(app).siblings().removeClass('active')
      })
    },
    getSession() {
      this.$axios.$get('/student/sessions/' + this.session_slug + '/show')
        .then(response => {
          this.session = response.data;
          this.notes = JSON.parse(this.session.notes);
          this.doctor = response.doctor;
          this.doctorType = response.doctorType;
          this.appointment = response.appointment;
          this.reports = response.reports;
          this.user = response.user;
          this.school = response.school
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

*:not(i) {
  font-family: 'Montserrat', 'Cairo', serif, Arial;
}

.btn-success {
  text-align: center;
}
.main-wrapper{
  padding-top:100px;
}
</style>

