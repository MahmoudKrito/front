<template>
  <div class="dashboard">
    <!-- Content -->
    <div :class="{rtl:current_lang === 'ar'}">
      <main class="main-wrapper">
        <DoctorSide></DoctorSide>
        <section class="content-wrapper">
          <!-- Content -->
          <div class="container-fluid">
            <div class="main-content">
              <div class="content-side">
                <!--  -->
                <div class="section-wrapper">
                  <div class="row">
                    <div class="col-xs-12 col-lg-10 col-lg-push-1">
                      <div class="tabs-wrapper">
                        <!-- Nav tabs -->
                        <ul class="nav nav-tabs" role="tablist">
                          <li role="presentation" :class="{active:visibility == 'all'}"
                              @click.prevent="visibility = 'all'">
                            <a
                              href="#allQuestions" aria-controls="AllQuestions" role="tab"
                              data-toggle="tab"> {{ $t('all_questions') }}</a>

                          </li>
                          <li role="presentation" :class="{active:visibility == 'answered'}"
                              @click.prevent="visibility = 'answered'"><a href="#answered"
                                                                          aria-controls="answered"
                                                                          role="tab"
                                                                          data-toggle="tab">{{ $t('answered') }}</a>
                          </li>
                          <li role="presentation" :class="{active:visibility == 'unanswered'}"
                              @click.prevent="visibility = 'unanswered'"><a href="#unanswered"
                                                                            aria-controls="unanswered"
                                                                            role="tab" data-toggle="tab">{{
                              $t('unanswered')
                            }}</a>

                          </li>
                        </ul>
                        <div class="doctors-block" style="margin-top: 0 !important;">
                          <!-- Tab panes -->
                          <div class="tab-content">
                            <div role="tabpanel" class="tab-pane"
                                 :class="{active : visibility=='all'}" id="allQuestions">
                              <div class="consult-wrapper" v-for="(consult,index) in filterConsults"
                                   :key="consult.id">
                                <div class="consult-row">
                                                    <span class="student-name">
                                                        <img src="https://api.promental.net/images/website/icon-complaint.svg" alt=""
                                                             width="20">
                                                        {{
                                                        consult.question_by.first_name
                                                      }} {{ consult.question_by.last_name }}
                                                    </span>
                                  <span class="consult-date">{{ consult.created_at }}</span>
                                  <span class="consult-status"
                                        v-if="!consult.answer">{{ $t('unanswered') }}
                                                            <i class="fa fa-question-circle"></i>
                              </span>

                                  <span class="consult-status answered"
                                        v-if="consult.answer">{{ $t('answered') }}
                                                            <img src="https://api.promental.net/images/website/check.svg" alt=""
                                                                 width="16">
                              </span>
                                </div>
                                <div class="complaint-question">
                                  {{ consult.question }}
                                  <div class="text-right margin-top-10">
<!--                                    <a href="#" class="btn-reply"-->
<!--                                       v-if="!consult.answer">{{ $t('reply') }}</a>-->
<!--                                    <a href="#" class="btn-view"-->
<!--                                       v-if="consult.answer">{{ $t('view') }}</a>-->

                                  </div>
                                </div>
                              </div>

                            </div>
                            <!--   answered consult     -->
                            <div role="tabpanel" class="tab-pane"
                                 :class="{active : visibility=='answered'}" id="answered">
                              <template v-for="(consult,index) in filterConsults">
                                <div class="">
                                  <div class="consult-row">
                                                    <span class="student-name">
                                                        <img src="https://api.promental.net/images/website/icon-complaint.svg" alt=""
                                                             width="20">
                                                        {{ consult.question_by.first_name }} {{
                                                        consult.question_by.last_name
                                                      }}
                                                    </span>
                                    <span class="consult-date">
                                  {{ consult.created_at | formatDateByDay }}
                                  {{ consult.created_at | formatDateByMonth }}
                                  {{ consult.created_at | formatDateByYear }}
                                </span>
                                    <span class="consult-status">{{ $t('answered') }}</span>
                                  </div>
                                  <div class="complaint-question">
                                    {{ consult.question }}
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-xs-12 col-lg-10 col-lg-push-1">
                                    <div class="reply-wrapper">
                                      <div class="reply-title">
                                        {{ consult.answer_by.first_name }} {{ consult.answer_by.last_name }}
                                        <img src="https://api.promental.net/images/website/check.svg"
                                             alt="" width="20">
                                      </div>
                                      <div class="reply-text">
                                        {{ consult.answer }}
                                        <div class="text-right font-size-12 color-main">
                                          {{ consult.updated_at | formatDateByDay }}
                                          {{ consult.updated_at | formatDateByMonth }}
                                          {{ consult.updated_at | formatDateByYear }}
                                        </div>
                                      </div>
                                    </div>
                                    <div class="rating-complaint ">
                                      <fieldset class="rating" disabled
                                                readonly="readonly">
                                        <!-- 5 Stars-->
                                        <input type="radio" id="star5" value="5"
                                               name="rating">
                                        <label class="full" for="star5"
                                               title="Excellent"></label>
                                        <!-- 4 Stars-->
                                        <input type="radio" id="star4" value="4"
                                               name="rating">
                                        <label class="full" for="star4"
                                               title="Very good"></label>
                                        <!-- 3 Stars-->
                                        <input type="radio" id="star3" value="3"
                                               name="rating" checked>
                                        <label class="full" for="star3"
                                               title="Good"></label>
                                        <!-- 2 Stars-->
                                        <input type="radio" id="star2" value="2"
                                               name="rating">
                                        <label class="full" for="star2"
                                               title="Very bad"></label>
                                        <!-- 1 Star -->
                                        <input type="radio" id="star1" value="1"
                                               name="rating">
                                        <label class="full" for="star1"
                                               title="Bad"></label>
                                      </fieldset>
                                    </div>
                                  </div>
                                </div>
                              </template>
                            </div>


                            <!--     unanswered consult        -->
                            <div role="tabpanel" class="tab-pane"
                                 :class="{active : visibility=='unanswered'}" id="unanswered">
                              <template v-for="(consult,index) in filterConsults">
                                <div class="">
                                  <div class="consult-row">
                                                    <span class="student-name">
                                                        <img src="https://api.promental.net/images/website/icon-complaint.svg" alt=""
                                                             width="20">
                                                        {{
                                                        consult.question_by.first_name
                                                      }} {{ consult.question_by.last_name }}
                                                    </span>
                                    <span class="consult-date">{{ consult.created_at }}</span>
                                    <span class="consult-status">{{ $t('unanswered') }}</span>
                                  </div>
                                  <div class="complaint-question">
                                    {{ consult.question }}
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-xs-12 col-lg-10 col-lg-push-1">
                                    <div class="row">
                                      <div class="col-xs-12 col-md-9">
                                        <div class="form-group">
                                    <textarea class="form-control" name="" rows="6"
                                              :placeholder="current_lang == 'en' ? 'Leave your reply here...' : 'اكتب ردك'"
                                              v-model="body[index]"></textarea>
                                          <small class="text-danger" v-if="message">{{ message }}
                                          </small>
                                        </div>
                                        <div class="form-group text-right">
                                          <button type="submit" class="btn btn-primary"
                                                  @click.prevent="addAnswer(consult.id,index)">
                                            {{ $t('add') }}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </template>

                            </div>
                          </div>
                        </div>
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
  </div>

</template>

<script>
import DoctorSide from '~/layouts/DoctorSide';
import doctorNotifications from "@/components/doctorNotifications";

export default {
  head() {
    return {
      title: 'consulting',
    };
  },
  middleware:'doctorSuspend',
  layout: 'DoctorHeaderD',
  components: {DoctorSide, doctorNotifications},
  data() {
    return {
      consults: {},
      visibility: 'all',
      body: [],
      message: ''

    }
  },
  mounted() {
    this.getConsults();
  },
  computed: {
    filterConsults: function () {
      var filters = {
        'all': function (consults) {
          return consults
        },
        'answered': function (consults) {
          return consults.filter(function (consult) {
            return consult.answer
          })
        },
        'unanswered': function (consults) {
          return consults.filter(function (consult) {
            return !consult.answer
          })
        }
      };
      return filters[this.visibility](this.consults)
    },
    current_lang() {
      return this.$i18n.locale
    }
  },
  methods: {
    addActive() {
      $('.nav-tabs > li').click(function () {
        var app = this
        $(app).addClass('active')
        $(app).siblings().removeClass('active')
      })
    },
    getConsults() {
      this.$axios.$get('/doctors/consults')
        .then(response => {
          this.consults = response.data;
        })
    },
    addAnswer(id, index) {
      if (!this.body) {
        if (this.current_lang == 'en') {
          this.message = 'add your answer'
        } else if (this.current_lang == 'ar') {
          this.message = 'اضف اجابتك'
        }

      } else {
        this.message = '';
        this.$axios.$post('/doctors/consults/' + id + '/addAnswer', {
          answer: this.body
        })
          .then(response => {
            this.body = '';
            this.visibility = 'all';
            console.log(response.data)
            this.getConsults()
            // this.filterConsults[index]=response.data

          })
      }
    }
  },

}
</script>


<style scoped>
.btn {
  text-align: center !important;
  margin-top: 10px !important;
  color:#ffffff !important;
}

*:not(i) {
  font-family: 'Montserrat', 'Cairo', serif, Arial;
}
</style>

