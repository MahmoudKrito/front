<template>
  <div class="dashboard">
    <div :class="{rtl:current_lang==='ar'}">
      <main class="main-wrapper">
        <SchoolSide></SchoolSide>
        <section class="content-wrapper">
          <div class="container-fluid">
            <div class="main-content">
              <div class="content-side">
                <!--  -->
                <div class="section-wrapper section-custom section-custom-2">
                  <div class="students-header">
                    <div class="">
                      {{ $t('name') }}
                    </div>
                    <div class="">
                      {{ $t('number_of_sessions') }}
                    </div>

                  </div>
                  <!-- Students -->
                  <div class="student-row">
                    <div class="student-wrapper">
                      <div class="student-block">
                        <div class="student-details">
                          <div class="student-name"></div>
                          <div>
                            <div class="pull-left student-school">{{ user.first_name }} {{ user.last_name }}
                            </div>
                          </div>
                          <div class="clearfix"></div>
                        </div>
                        <a href="" @click.prevent="getSingleStudent(student.id)"
                           class="btn btn-success student-profile">
                          {{ $t('profile') }}
                        </a>

                        <div class="student-status text-success" v-if="user.is_suspended == 0">
                          {{ $t('activated') }}
                        </div>

                        <div class="student-sessionsNum">
                          {{ sessions.length }}
                        </div>
                      </div>
                      <div class="student-info">
                        <div class="student-info-row">
                          <span class="title">   {{ $t('date_of_birth') }}</span>

                          <span class="description">{{ user.BD }}</span>
                        </div>
                        <div class="student-info-row">
                          <span class="title">{{ $t('hobbies') }}</span>
                          <span class="description" v-for="hobby in hobbies">{{ hobby.value }}-</span>
                        </div>
                        <div class="student-info-row">
                          <span class="title">{{ $t('brother_and_sisters_number') }}</span>
                          <span class="description">3 sisters - 0 Brothers</span>
                        </div>
                      </div>
                    </div>
                    <a href="" class="student-edit" @click.prevent="studentProfileEdit($event,student.id)">
                      <i class="fa fa-gear"></i>
                    </a>
                  </div>
                  <!-- Sessions -->
                  <div class="sessions-wrapper session-single">
                    <div class="sessions-row">
                      <div class="session-number">Session 1</div>
                      <div class="session-date">{{ session.created_at | formatDateByDay }}
                        {{ session.created_at | formatDateByMonth }} {{ session.created_at | formatDateByYear }}
                      </div>
                      <div class="session-consultant">{{ $t('consultant') }} : {{ doctor.first_name }} {{
                          doctor.last_name
                        }}
                      </div>

                    </div>
                  </div>
                  <!-- Session details -->
                  <div class="row">
                    <div class="col-xs-12 col-lg-6">
                      <div class="session-details-wrapper">
                        <div class="session-title">{{ $t('session_details') }}</div>
                        <div class="session-description" v-for="note in notes">
                          {{ note }}
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-12 col-lg-6">
                      <div class="session-details-wrapper">
                        <div class="session-title">
                          {{ $t('session_status') }}
                          <span class="pull-right text-success"
                                v-if="session.is_done == 1">{{ $t('done') }}</span>
                          <span class="pull-right text-danger"
                                v-if="session.is_done == 0">{{ $t('pending') }}</span>
                        </div>

                      </div>
                      <div class="session-details-wrapper">
                        <div class="session-request">
                          {{ $t('request_to_view_reports_and_medical_history') }}
                        </div>
                      </div>
                      <div class="text-right">
                        <button type="button" class="btn btn-request">{{ $t('request') }}</button>
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
    </div>
  </div>
</template>

<script>
import SchoolSide from '~/layouts/SchoolSideD';
import schoolNotifications from '~/components/schoolNotifications'

export default {
  head() {
    return {
      title: 'session',
    };
  },
  layout: 'SchoolHeaderD',
  middleware: 'schoolSuspend',
  components: {SchoolSide, schoolNotifications},
  data() {
    return {
      student_id: '',
      school_token: '',
      user: {},
      student: {},
      sessions: {},
      hobbies: [],
      session_id: '',
      doctor: {},
      session: {},
      notes: []
    }
  },
  created() {
    console.log(this.$route.params.id)
  },
  mounted() {
    this.storage();
    this.getStudent();
    this.getSessionDetails()
  },
  methods: {
    storage() {
      this.student_id = this.$route.params.id;
      this.session_id = localStorage.getItem('session_id');
    },
    getStudent() {
      this.$axios.$get('/school/students/' + this.student_id + '/student')
        .then(response => {
          this.user = response.data;
          this.student = response.student;
          this.hobbies = JSON.parse(this.student.hobbies);
          this.sessions = response.sessions;

        })
    },
    getSingleStudent(id) {
      this.$router.push(this.localePath('/schools/dashboard/students/' + id))
    },
    studentProfileEdit(e, id) {
      this.$router.push(this.localePath('/schools/dashboard/students/' + id + '/edit'));
      e.preventDefault();
    },
    getSessionDetails() {
      this.$axios.$get('/school/sessions/' + this.session_id + '/show')
        .then(response => {
          this.session = response.data;
          this.doctor = response.doctor;
          this.notes = JSON.parse(response.notes);
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
.main-wrapper {
  padding-top: 100px;
}

*:not(i) {
  font-family: 'Montserrat', 'Cairo', serif, Arial;
}

.arrow-icon img {
  float: right;
  margin-bottom: 20px !important;
}

.btn-success {
  text-align: center;
}
</style>
