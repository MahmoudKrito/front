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
                  <!-- Doctor -->
                  <div class="doctor-wrapper doctor-single">
                    <div class="doctor-img">
                      <img :src="doctor.avatar" alt="">
                    </div>
                    <div class="doctor-details">
                      <div class="doctor-name">
                        {{ current_lang == 'ar' ? doctor.name_ar : doctor.name_en }}
                      </div>
                      <div v-for="(special, index) in doctor.speciality">
                        {{ current_lang == 'ar' ? special.name_ar : special.name_en }},
                      </div>
                    </div>
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs" role="tablist">
                      <li role="presentation" class="active">
                        <a href="#students" aria-controls="students"
                                                                role="tab" data-toggle="tab">{{$t('students')}}</a>
                      </li>
                      <li role="presentation"><a href="#cv" aria-controls="cv"
                                                 role="tab" data-toggle="tab">{{$t('cv')}}</a>
                      </li>
                    </ul>
                  </div>

                  <!-- Tab panes -->
                  <div class="tab-content doctor-content">
                    <div role="tabpanel" class="tab-pane active" id="students">
                      <div class="student-row" v-for="(student,index) in students" :key="student.id">
                        <div class="student-wrapper">
                          <div class="student-block">
                            <div class="student-details">
                              <div class="student-name">
                                {{ student.user.first_name }} {{student.user.last_name}}
                              </div>
                              <div>
                                <div class="pull-left student-school">{{ student.classroom }}
                                </div>
                                <div class="pull-right student-date">{{ student.created_at | formatDateByDay }}
                                  {{ student.created_at | formatDateByMonth }} {{ student.created_at | formatDateByYear }}
                                </div>
                              </div>
                              <div class="clearfix"></div>
                            </div>

                            <nuxt-link :to="localePath('/schools/dashboard/students/'+student.id)"
                                       class="btn btn-success student-profile">
                              {{ $t('profile') }}
                            </nuxt-link>

                            <div class="student-status text-success">
                              {{ $t('activated') }}
                            </div>
                            <div class="student-sessionsNum">

                            </div>
                          </div>
                        </div>
                        <nuxt-link :to="localePath('/schools/dashboard/students/'+student.id+'/edit')"
                                   class="student-edit">
                          <i class="fa fa-gear"></i>
                        </nuxt-link>

                      </div>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="cv">
                      <div class="report-wrapper">
                        <!--<img :src="doctor.cv" height="200" width="200">-->
                        <iframe :src="doctor.cv" height="300" width="100%"></iframe>
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
import SchoolSide from '~/layouts/SchoolSideD'
import $ from 'jquery';
import schoolNotifications from '~/components/schoolNotifications'

export default {
  head() {
    return {
      title: 'doctor-single',
    };
  },
  layout: 'SchoolHeaderD',
  middleware: 'schoolSuspend',
  components: {SchoolSide, schoolNotifications},
  data() {
    return {
      doctor_id: '',
      doctor: {},
      students: {},
    }
  },
  mounted() {
    this.storage();
    this.getSingleDoctor();
  },
  methods: {
    storage() {
      this.doctor_id = this.$route.params.id;
    },
    addActive() {
      $('.nav-tabs > li').click(function () {
        var app = this
        $(app).addClass('active');
        $(app).siblings().removeClass('active');
      })
    },
    getSingleDoctor() {
      this.$axios.$get('/school/doctors/' + this.doctor_id + '/show')
        .then(response => {
          this.doctor = response.doctor;
          this.students = response.students;
          console.log('ssssssssss',this.students)
        })
    },

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
*:not(i) {

  font-family: 'Montserrat', 'Cairo', serif, Arial;
}

.student-profile {
  text-align: center;
  margin-left: 10px !important;
}

.student-status {
  text-align: center;
}
</style>
