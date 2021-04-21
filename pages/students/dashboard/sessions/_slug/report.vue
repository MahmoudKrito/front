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
                <div class="section-wrapper ">
                  <div class="row">
                    <div class="col-xs-12 col-lg-10 col-lg-push-1">
                      <div class="center-block text-center margin-20">
                        <img src="https://api.promental.net/images/website/check.svg" alt="Check" width="40"
                             class="mr-auto ml-auto">
                      </div>
                      <div class="session-over">
                        <img src="https://api.promental.net/images/website/icon-complaint.svg" alt="">
                        {{$t('the_session_is_over')}}
                      </div>

                      <div class="alert alert-danger" role="alert" v-if="message">
                        {{ message }}
                      </div>
                      <form action="">
                        <div class="form-group" v-for="(question,index) in questionnaires"
                             :key="question.id">
                          <label>
                            {{ question.body }}
                          </label>
                          <input type="hidden" :value="question.id">
                          <textarea class="form-control" name="" placeholder="Add answer here ....."
                                    rows="4"
                                    v-model="answers[index]"></textarea>
                        </div>
                        <br>
                        <div class="form-group">
                                        <span class="rating-wrapper">
                                            <fieldset class="rating">
                                                <!-- 5 Stars-->
                                                <input type="radio" id="star5" value="5" name="rating" v-model="rate">
                                                <label class="full" for="star5" title="Excellent"></label>
                                              <!-- 4 Stars-->
                                                <input type="radio" id="star4" value="4" name="rating" v-model="rate">
                                                <label class="full" for="star4" title="Very good"></label>
                                              <!-- 3 Stars-->
                                                <input type="radio" id="star3" value="3" name="rating" v-model="rate">
                                                <label class="full" for="star3" title="Good"></label>
                                              <!-- 2 Stars-->
                                                <input type="radio" id="star2" value="2" name="rating" v-model="rate">
                                                <label class="full" for="star2" title="Very bad"></label>
                                              <!-- 1 Star -->
                                                <input type="radio" id="star1" value="1" name="rating" v-model="rate">
                                                <label class="full" for="star1" title="Bad"></label>
                                            </fieldset>
                                            <button type="button" class="btn btn-success d-inline-block text-center"
                                                    @click="answerQuestions"
                                                    style="text-align: center !important ">{{$t('done')}}</button>
                                        </span>
                        </div>
                      </form>
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
import StudentSide from '@/layouts/StudentSideD'
import studentNotifications from '~/components/studentNotifications';

export default {
  layout: 'StudentHeaderD',
  head() {
    return {
      title: 'Session-report',
    };
  },
  components: {StudentSide, studentNotifications},
  data() {
    return {
      questionnaires: {},
      answers: [],
      questionnaires_ids: [],
      rate: 0,
      message: '',
      user: this.$auth.user.user,
      school: this.$auth.user.school
    }
  },
  mounted() {
    this.getQuestionnaires()
  },
  methods: {
    getQuestionnaires() {
      this.$axios.$get('student/questionnaires')
        .then(response => {
          this.questionnaires = response.data;
          console.log(this.questionnaires);
          this.questionnaires_ids = response.ids
        })
    },
    answerQuestions() {
      if (this.answers.length != this.questionnaires_ids.length) {
        if (this.current_lang == 'en') {
          this.message = 'your answers is not completed'
        } else if (this.current_lang == 'ar') {
          this.message = '  اجابتك غير كامله  '
        }

      } else if (this.rate == 0) {
        if (this.current_lang == 'en') {
          this.message = 'rate is not completed'
        } else if (this.current_lang == 'ar') {
          this.message = '  لم يتم اضافه التقييم '
        }

      } else {
        this.$axios.$post('student/questionnaires/answerQuestionnaire', {
          answers: this.answers,
          question_ids: this.questionnaires_ids,
          session_slug: this.$route.params.slug,
          rate: this.rate
        })
          .then(response => {
            if (this.current_lang == 'en') {
              this.$swal('your answers send');

            } else if (this.current_lang == 'ar') {
              this.$swal(' تم ارسال اجابتك ');
            }
            this.$router.push(this.localePath('/students/dashboard'))

          })
      }
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
