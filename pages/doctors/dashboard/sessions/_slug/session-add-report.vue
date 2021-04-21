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
                    {{$t('new_sessions')}}
                </div>

                <div class="doctors-block">
                  <div class="session-header">
                    <div class="student-name">
                      {{ user.first_name }} {{ user.last_name }}
                    </div>
                  </div>
                  <br>
                  <div class="student-row ">
                    <div class="student-wrapper">
                      <div class="student-info" v-if="student.length">
                        <div class="student-info-row">
                          <span class="description school-name" v-if=" school">{{ school.school_name }} {{ $t('school') }}</span>
                        </div>
                        <div class="student-info-row">
                          <span class="title"> {{$t('date_of_birth')}}</span>
                          <span class="description">{{ user.BD }}</span>
                        </div>
                        <div class="student-info-row">
                          <span class="title">{{ $t('hobbies') }}</span>
                          <span class="description" v-if="hobbies.length > 0"
                                v-for="hobby in hobbies">{{ hobby }} - </span>
                        </div>

                        <div class="student-info-row">

                          <span class="title"> {{ $t('brothers_and_sisters_number')}} </span>
                          <span class="description" v-if="sibling.count > 0"
                                v-for="(sibling,index) in siblings">{{ sibling.value[0] }} <template
                            v-if="index == 0">{{ $t('sisters') }} </template>&ensp;{{ sibling.value[1] }}<template
                            v-if="index==1">{{ $t('brothers') }}</template></span>


                        </div>
                      </div>
                      <div class="student-info" v-else>
                        <div class="student-info-row">
                          <span class="description school-name"> {{ $t('user') }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xs-12 col-lg-10 col-lg-push-1 margin-50">
                      <div class="alert alert-danger" v-if="message">
                        {{ message }}
                      </div>

                      <form action="">
                        <div class="form-group" v-for="(question,index) in questionnaires"
                             :key="question.id">
                          <label>
                            {{ question.body }}
                          </label>
                          <textarea class="form-control" name=""
                                    :placeholder="current_lang == 'en' ? 'Add answer here .....' : 'اضف اجابتك'" rows="4"
                                    v-model="answers[index]"></textarea>
                        </div>
                        <br>
                        <div class="form-group text-center">
                          <button type="button" class="btn btn-main"
                                  @click.prevent="answerQuestions()">{{ $t('done') }}
                          </button>

                        </div>
                      </form>
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
import DoctorSide from '~/layouts/DoctorSide';
import doctorNotifications from "@/components/doctorNotifications";

export default {
  head() {
    return {
      title: 'session-add-report',
    };
  },
  layout: 'DoctorHeaderD',
  components: {DoctorSide, doctorNotifications},
  middleware:'doctorSuspend',
  data() {
    return {
      questionnaires: {},
      answers: [],
      message: '',
      questionnaires_ids: [],
      student: {},
      session_slug: this.$route.params.slug,
      school: {},
      user: {},
      hobbies: [],
      siblings: []
    }
  },
  mounted() {
    this.getQuestionnaires();
    this.getStudentData();
  },
  methods: {
    getStudentData() {
      this.$axios.$get('/doctors/questionnaires/' + this.session_slug + '/getSessionData')
        .then(response => {
          if (response.student) {
            this.student = response.student;
            this.school = response.school;
            this.hobbies = JSON.parse(response.hobbies)
            this.siblings = JSON.parse(response.student.siblings)
          }
          this.user = response.user;
          console.log(this.student);
        })
    },
    getQuestionnaires() {
      this.$axios.get('doctors/questionnaires')
        .then(response => {
          this.questionnaires = response.data.data;
          this.questionnaires_ids = response.data.ids;
          console.log(response.data.ids)
        })
    },
    answerQuestions() {
      if (this.answers.length != this.questionnaires_ids.length) {
        this.message = 'your answers is not completed'
      } else {
        this.$axios.$post('doctors/questionnaires/answerQuestionnaire', {
          answers: this.answers,
          question_ids: this.questionnaires_ids,
          session_slug: this.session_slug,
        })
          .then(response => {
            // if (this.current_lang == 'en') {
            //   this.$swal('your answers send');
            // } else if (this.current_lang == 'ar') {
            //   this.$swal('تم اضافه اجابتك');
            // }
            this.$router.push(this.localePath('/doctors/dashboard/sessions/' + this.session_slug + '/session-end-confirm'))

          })
      }
    }
  },
  computed: {
    current_lang() {
      return this.$i18n.locale
    }
  }
}
</script>

<style scoped>
*:not(i) {
  font-family: 'Montserrat', 'Cairo', serif, Arial;
}

.btn-main {
  background: #2BB788 !important;
}
</style>

