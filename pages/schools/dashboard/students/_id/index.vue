<template>
  <div class="dashboard">
    <div :class="{rtl:current_lang==='ar'}">
      <!-- Content -->
      <main class="main-wrapper">
        <SchoolSide></SchoolSide>
        <section class="content-wrapper">
          <!-- Content -->
          <div class="container-fluid">
            <div class="main-content">
              <div class="content-side">
                <!--  -->
                <div class="section-wrapper section-custom section-custom-2">
                  <div class="students-header">
                    <div clas>
                      {{ $t('name') }}
                    </div>

                    <div>
                      {{ $t('number_of_sessions') }}
                    </div>

                  </div>
                  <!-- Students -->
                  <div class="student-row">
                    <div class="student-wrapper">
                      <div class="student-block">
                        <div class="student-details">
                          <div class="student-name">{{ user.first_name }} {{ user.last_name }}</div>
                          <div>
                            <div class="pull-left student-school">{{ student.classroom }}</div>
                          </div>
                          <div class="clearfix"></div>
                        </div>

                        <a href="#" class="btn btn-success student-profile">
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
                          <span class="title">{{ $t('date_of_birth') }}</span>
                          <span class="description">{{ user.BD }}</span>
                        </div>
                        <div class="student-info-row">
                          <span class="title">{{ $t('hobbies') }}</span>
                          <span class="description"
                                v-for="hobby in hobbies">{{ hobby.value }} -</span>
                        </div>
                        <div class="student-info-row">
                          <span class="title">{{ $t('brother_and_sisters_number') }}</span>
                          <span class="description" v-for="(sibling,index) in siblings"> <template v-if="index == 0"> {{  sibling.value }} {{ $t('sisters') }} </template> , <template v-if="index == 1">  {{  sibling.value }} {{ $t('brothers') }} </template></span>
                        </div>
                      </div>
                    </div>
                    <nuxt-link :to="localePath('/schools/dashboard/students/' + this.$route.params.id + '/edit')"
                               class="student-edit">
                      <i class="fa fa-gear"></i>
                    </nuxt-link>

                  </div>
                  <!-- Sessions -->
                  <div class="sessions-wrapper">
                    <template v-for="(session,index) in sessions">
                      <a href="#" class="sessions-row"
                         @click.prevent="getSessionDetails(session.id)">
                        <div class="session-number">Session {{ ++index }}</div>
                        <div class="session-date">{{ session.appointment.date }}</div>
                        <div class="session-consultant" v-if="session.doctor.first_name">{{ $t('consultant') }} :
                          {{ session.doctor.first_name }} {{
                            session.doctor.last_name
                          }}
                        </div>

                      </a>
                    </template>

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
      title: 'session-single',
    };
  },
  layout: 'SchoolHeaderD',
  middleware: 'schoolSuspend',
  components: {SchoolSide, schoolNotifications},
  data() {
    return {
      student: {},
      user: {},
      hobbies: [],
      sessions: {},
      student_id:this.$route.params.id,
      siblings:[]
    }
  },
  mounted() {
    this.getStudent();
  },
  methods: {
    getStudent() {
      this.$axios.$get('/school/students/' + this.student_id + '/student')
        .then(response => {
          this.user = response.data;
          this.student = response.student;
          this.hobbies = JSON.parse(this.student.hobbies);
          this.siblings = JSON.parse(this.student.siblings);
          this.sessions = response.sessions;
          console.log(this.sessions)
        })
    },
    getSessionDetails(id) {
      localStorage.setItem('session_id', id);
      this.$router.push(this.localePath('/schools/dashboard/students/' + this.student_id + '/session'))
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

.student-profile {
  text-align: center !important;
}
</style>

