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
                    <div class="">
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
                          <div class="student-name">{{ this.user.first_name }} {{
                              this.user.last_name
                            }}
                          </div>
                          <div>
                            <div class="pull-left student-school">{{ this.student.classroom }}</div>
                          </div>
                          <div class="clearfix"></div>
                        </div>
                        <nuxt-link :to="localePath('/schools/dashboard/students/' + student.id)" class="btn btn-success student-profile">
                          {{ $t('profile') }}
                        </nuxt-link>

                        <div class="student-status text-success" v-if="this.user.is_suspended == 0">
                          {{ $t('activated') }}
                        </div>
                        <div class="student-sessionsNum">
                          {{ sessions.length }}
                        </div>
                      </div>
                      <div class="student-info">
                        <div class="student-info-row">
                          <span class="title">{{ $t('date_of_birth') }}</span>
                          <span class="description">
                                               <datetime v-model="BD" input-class="form-control"
                                                         zone="UTC"></datetime>

                      </span>

                        </div>
                        <div class="student-info-row">
                          <span class="title">{{ $t('hobbies') }}</span>
                          <span class="description">
                                                <client-only>
                                                 <tags-input element-id="tags" v-model="hobbies" :typeahead="true"
                                                             :placeholder="current_lang == 'en' ? 'hobbies' : 'الهوايات'"
                                                             style="border-radius:20px;"></tags-input>
                                                 </client-only>
                                            </span>
                        </div>
                        <div class="student-info-row">
                          <span class="title"> {{ $t('brother_and_sisters_number') }}</span>
                          <span class="description">
                                            <client-only>
                                                 <tags-input element-id="tags" v-model="brothers_count"
                                                             :typeahead="true" placeholder="2 sisters 3 brothers"
                                                             style="border-radius:20px;"></tags-input>
                                                 </client-only>
                                            </span>
                        </div>
                      </div>
                    </div>
                    <a href="#" class="student-edit">
                      <i class="fa fa-gear"></i>
                    </a>
                  </div>

                  <button class="btn btn-success" @click.prevent="editStudentProfile()">{{ $t('save') }}</button>
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
import {Datetime} from 'vue-datetime';
import SchoolSide from '~/layouts/SchoolSideD';
import schoolNotifications from '~/components/schoolNotifications'

export default {
  head() {
    return {
      title: 'session-edit',
    };
  },
  layout: 'SchoolHeaderD',
  middleware: 'schoolSuspend',
  components: {SchoolSide, Datetime, schoolNotifications},
  data() {
    return {
      student_id: this.$route.params.id,
      sessions: {},
      student: {},
      user: {},
      tag: '',
      tags: [],
      hobbies: [],
      brothers_count: [],
      numbers: "",
      BD: '',
      notifications: {}
    }
  },
  mounted() {
    this.getStudent();
    this.getNotifications()
  },
  methods: {
    getNotifications() {
      this.$axios.$get('/school/notifications')
        .then(response => {
          this.notifications = response.data;
        })
    },
    getStudent() {
      this.$axios.$get('/school/students/' + this.student_id + '/student')
        .then(response => {
          this.user = response.data;
          this.student = response.student;
          this.sessions = response.sessions;
          this.hobbies=JSON.parse(response.student.hobbies)
          this.brothers_count=JSON.parse(response.student.siblings)
          this.BD=response.data.BD
        })
    },
    editStudentProfile() {
      this.$axios.$post('/school/students/' + this.student_id + '/editProfile', {
        hobbies: this.hobbies,
        brothers_count: this.brothers_count,
        BD: this.BD
      })
        .then(response => {
          this.$router.push(this.localePath('/schools/dashboard/students/' + this.$route.params.id))
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

.student-profile {
  text-align: center !important;
}
</style>

