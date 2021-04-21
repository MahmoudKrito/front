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
                <div class="section-wrapper section-custom">

                  <div class="row">
                    <div class="col-xs-12 col-lg-10 col-lg-push-1">
                      <div class="complaint-info">
                        <div>
                          <div class="complaint-col"> {{ $t('complaint_number') }}</div>
                          <div>{{ $t('date') }}</div>
                          <div>{{ $t('status') }}</div>
                        </div>

                        <div>
                          <div>{{ complaint.number }}</div>
                          <div>{{ complaint.created_at | formatDateByDay }} {{
                              complaint.created_at | formatDateByMonth
                            }}
                            {{ complaint.created_at | formatDateByYear }}
                          </div>
                          <div v-if="complaint.status==1"><img
                            src="https://api.promental.net/images/website/check.svg"
                            alt="" width="20"></div>
                          <div v-if="complaint.status==0"><img
                            src="https://api.promental.net/images/website/uncheck.svg" alt="" width="20">
                          </div>
                        </div>
                      </div>
                      <div class="complaint-question">
                        {{ complaint.body }}
                      </div>
                      <div class="row">
                        <div class="col-xs-12 col-lg-10 col-lg-push-1">
                          <div class="reply-wrapper" v-for="(message,index) in messages"
                               :key="message.id">
                            <div class="reply-title" v-if="message.user_id != user.id">
                              {{ $t('technical_support_reply') }}
                              <img src="https://api.promental.net/images/website/check.svg" alt="" width="20">
                            </div>

                            <div class="reply-title" v-if="message.user_id == user.id">
                              {{ $t('your_reply') }}
                              <img src="https://api.promental.net/images/website/check.svg" alt="" width="20">
                            </div>


                            <div class="reply-text" style=" word-wrap: break-word;">
                              {{ message.body }}
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-xs-12 col-md-9">
                              <div class="form-group">
                                                        <textarea class="form-control" name="" rows="6"
                                                                  :placeholder="current_lang == 'en' ? 'Leave your reply here...' : 'اترك ردك هنا'"
                                                                  v-model="reply">

                                                        </textarea>
                                <small class="text-danger" v-if="replyError">{{ replyError }}
                                </small>
                              </div>
                              <div class="form-group text-right">
                                <button type="submit" class="btn btn-primary"
                                        @click.prevent="validateForm" style="color:#ffffff">{{ $t('add') }}
                                </button>

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="section-footer">
                    <div class="row">
                      <div class="col-xs-12 col-lg-10 col-lg-push-1">
                                    <span class="rating-wrapper rating-complaint">
                                        <fieldset class="rating">
                                            <!-- 5 Stars-->
                                                              <input type="radio" id="star5" value="5" name="rating"
                                                                     v-model="rating">
                                            <label class="full" for="star5" title="Excellent"
                                                   :class="complaint.rating == 5  ? 'color' : ''"></label>
                                          <!-- 4 Stars-->
                                            <input type="radio" id="star4" value="4" name="rating" v-model="rating">
                                            <label class="full" for="star4" title="Very good"
                                                   :class="complaint.rating >= 4  ? 'color' : ''"></label>
                                          <!-- 3 Stars-->
                                            <input type="radio" id="star3" value="3" name="rating" v-model="rating">
                                            <label class="full" for="star3" title="Good"
                                                   :class="complaint.rating >= 3  ? 'color' : ''"></label>
                                          <!-- 2 Stars-->
                                            <input type="radio" id="star2" value="2" name="rating" v-model="rating">
                                            <label class="full" for="star2" title="Very bad"
                                                   :class="complaint.rating >= 2  ? 'color' : ''"></label>
                                          <!-- 1 Star -->
                                            <input type="radio" id="star1" value="1" name="rating" v-model="rating"
                                            >
                                            <label class="full" for="star1" title="Bad"
                                                   :class="complaint.rating >= 1  ? 'color' : ''"></label>
                                        </fieldset>
                                         <small v-if="ratingError" class="text-danger">{{ ratingError }}</small>
                                        <button type="submit" class="btn btn-primary d-inline-block"
                                                v-if="!complaint.rating"
                                                @click="addReview" style="color:#ffffff">>{{ $t('done') }}</button>

                                    </span>
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
import schoolNotifications from '~/components/schoolNotifications'

export default {
  head() {
    return {
      title: 'complaint-single',
    };
  },
  layout: 'SchoolHeaderD',
  middleware: 'schoolSuspend',
  components: {SchoolSide, schoolNotifications},
  data() {
    return {
      complaint: {},
      messages: [],
      auth2: {},
      replyError: "",
      complaint_id: "",
      reply: '',
      user: {},
      rating: '',
      ratingError: '',
    }
  },
  mounted() {
    this.storage();
    this.getComplaint();
  },
  methods: {
    storage() {
      this.complaint_id = this.$route.params.id;
      this.user = this.$auth.user.user;
    },
    getComplaint() {
      this.$axios.$get('/school/complaints/' + this.complaint_id + '/show')
        .then(response => {
          this.complaint = response.data;
          if (response.messages) {
            this.messages = response.messages;
          }
        })
    },
    validateForm(e) {
      this.replyError = '';
      if (!this.reply) {
        this.replyError = 'add your reply'
      } else {
        this.replyError = '';
        this.addReply();
      }
      e.preventDefault();
    },
    addReply() {
      this.$axios.$post('/school/complaints/addReply', {
        complaint_id: this.complaint.id,
        body: this.reply,
      })
        .then(response => {
          this.messages.push(response.data);
          this.reply = ''
        })
    },
    addReview(e) {
      if (!this.rating) {
        this.ratingError = 'enter your rating'
      } else {
        this.$axios.$post('/school/complaints/' + this.complaint_id + '/rating', {
          rating: this.rating
        })
          .then(response => {
            this.complaint = response.data;
          })
      }
      e.preventDefault();
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

*:not(button) {
  font-family: 'Montserrat', 'Cairo', serif, Arial;
}

.btn {
  text-align: center !important;
}

.text-right {
  text-align: right !important;
  margin-top: 10px !important;
}

.rating {
  margin-top: 30px !important;
}
.color{
  color: gold !important;
}
</style>

