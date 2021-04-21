<template>
  <div class="dashboard">
    <div :class="{rtl:current_lang === 'ar'}">
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
                    <nuxt-link to="/schools/dashboard/students/students-sheet" target="_blank" class="p-5"
                               style="width:50px;height: 50px"><img
                      src="https://api.promental.net/images/website/download.svg" alt="">
                    </nuxt-link>
                    <template>
                      <div>
                        {{ $t('name') }}
                      </div>
                      <div>
                        {{ $t('number_of_sessions') }}
                      </div>

                    </template>
                  </div>
                  <!-- Students -->
                  <div class="student-row" v-for="(student,index) in students" :key="student.id">
                    <div class="student-wrapper">
                      <div class="student-block">
                        <div class="student-details">
                          <div class="student-name" v-if="student.user">{{ student.user.first_name }}
                            {{ student.user.last_name }}
                          </div>
                          <div>
                            <div class="pull-left student-school" v-if="student.classroom">{{ $t('primary') }} {{ student.classroom }}</div>
                            <div class="pull-right student-date">{{ student.created_at }}
                            </div>
                          </div>
                          <div class="clearfix"></div>
                        </div>
                        <nuxt-link :to="localePath('/schools/dashboard/students/' + student.id)"
                                   class="btn btn-success student-profile">
                          {{ $t('profile') }}
                        </nuxt-link>

                        <div class="student-status text-success"
                             v-if="student.user && student.user.is_suspended == 1">
                          {{ $t('activated') }}
                        </div>

                        <div class="student-status text-danger"
                             v-if="student.user && student.user.is_suspended == 0">
                          {{ $t('not_enabled') }}
                        </div>

                        <div class="student-sessionsNum">
                          {{ student.sessions.length }}
                        </div>
                      </div>
                    </div>
                    <nuxt-link :to="localePath('/schools/dashboard/students/' + student.id + '/edit')"
                               class="student-edit">
                      <i class="fa fa-gear"></i>
                    </nuxt-link>
                  </div>

                  <nav aria-label="Page navigation" class="text-center center-block">
                    <ul class="pagination">
                      <li :class="prev ? 'disabled' : ''">
                        <a href="" aria-label="Previous" @click="prevStep">
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>

                      <li :class="current_page == c ? 'active' : ''" v-for="c in count2"><a href=""
                                                                                            @click.prevent="getStudents(c)">{{
                          c
                        }}</a></li>
                      <li :class="next ? 'disabled' : ''">
                        <a href="" aria-label="Next" @click="nextStep">
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>
                    </ul>
                  </nav>

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
      title: 'students',
    };
  },
  layout: 'SchoolHeaderD',
  middleware: 'schoolSuspend',
  components: {SchoolSide, schoolNotifications},
  data() {
    return {
      students: {},
      last_page: '',
      count2: [],
      stepIndex: '',
      next: false,
      prev: false,
      current_page: '',
    }
  },
  mounted() {
    this.getStudents(1)
  },
  methods: {
    nextStep(e) {
      e.preventDefault();
      if (this.stepIndex < this.count2.length) {
        this.stepIndex++;
        this.getStudents(this.stepIndex)
      }
      if (this.stepIndex == this.count2.length) {
        this.next = true
      }
    },
    prevStep(e) {
      e.preventDefault();
      if (this.stepIndex > 1) {
        this.stepIndex--;
        this.getStudents(this.stepIndex)
      }
      if (this.stepIndex == 1) {
        this.prev = true
      }
    },

    getStudents(page) {
      this.$axios.$get('/school/students?page=' + page)
        .then(response => {
          this.students = response.data.data;
          this.last_page = response.data.last_page;
          this.current_page = response.data.current_page;
          if (this.count2.length == 0) {
            for (var i = 1; i <= this.last_page; i++) {
              this.count2.push(i)
              console.log(this.count2)
            }
          }
          console.log(this.students)
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
  margin-left: 30px !important;
}

.student-status {
  text-align: center !important;
  margin-left: 30px !important;
}
</style>
