<template>
  <div class="dashboard">
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
                <div class="section-wrapper section-custom">
                  <div class="row">
                    <div class="col-xs-12 col-lg-10 col-lg-push-1">
                      <div class="complaint-info">
                        <div class="">
                          <div class="complaint-col">{{ $t('complaint_number') }}</div>
                          <div>{{ $t('date') }}</div>
                          <div>{{ $t('status') }}</div>
                        </div>
                        <div class="">
                          <div>{{ complaint.number }}</div>
                          <div>{{ complaint.created_at | formatDateByDay }} {{
                              complaint.created_at |formatDateByMonth
                            }}
                            {{ complaint.created_at | formatDateByYear }}
                          </div>
                          <div v-if="complaint.status == 1"><img src="https://api.promental.net/images/website/check.svg"
                                                                 alt="" width="20"></div>
                          <div v-if="complaint.status == 0"><img src="https://api.promental.net/images/website/uncheck.svg"
                                                                 alt="" width="20"></div>
                        </div>
                      </div>
                      <div class="complaint-question">
                        {{ complaint.body }}
                      </div>
                      <div class="row">
                        <div class="col-xs-12 col-lg-10 col-lg-push-1">

                          <div class="reply-wrapper" v-if="messages.length > 0"
                               v-for="message,index in messages"
                               :key="message.id">
                            <div class="reply-title"
                                 v-if="message.user_id != user.id">
                              {{ $t('technical_support_reply') }}
                              <img src="https://api.promental.net/images/website/check.svg" alt="" width="20">
                            </div>

                            <div class="reply-title"
                                 v-if="message.user_id == user.id">
                              {{ $t('your_reply') }}
                              <img src="https://api.promental.net/images/website/check.svg" alt="" width="20">
                            </div>

                            <div class="reply-text">
                              {{ message.body }}
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-xs-12 col-md-9">
                              <div class="form-group">
                              <textarea class="form-control" name="" rows="6"
                                        :placeholder="$t('leave_your_reply_here')" v-model="body"></textarea>
                                <small class="text-danger" v-if="errorMessage">{{ errorMessage }}
                                </small>
                              </div>
                              <div class="form-group text-right">
                                <button type="submit" class="btn btn-primary"
                                        @click.prevent="addReply" style="font-family:'Cairo'">
                                  {{ $t('add') }}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

<!--                  <div class="section-footer">-->
<!--                    <div class="row">-->
<!--                      <div class="col-xs-12 col-lg-10 col-lg-push-1">-->
<!--                        <small class="text-danger" v-if="rating_error">{{ rating_error }}</small>-->
<!--                        <span class="rating-wrapper rating-complaint">-->
<!--                                        <fieldset class="rating">-->
<!--                                            &lt;!&ndash; 5 Stars&ndash;&gt;-->
<!--                                            <input type="radio" id="star5" value="5" name="rating" v-model="rating">-->
<!--                                            <label class="full" for="star5" title="Excellent"-->
<!--                                                   :class="complaint.rating == 5  ? 'color' : ''"></label>-->
<!--                                          &lt;!&ndash; 4 Stars&ndash;&gt;-->
<!--                                            <input type="radio" id="star4" value="4" name="rating" v-model="rating">-->
<!--                                            <label class="full" for="star4" title="Very good"-->
<!--                                                   :class="complaint.rating >= 4  ? 'color' : ''"></label>-->
<!--                                          &lt;!&ndash; 3 Stars&ndash;&gt;-->
<!--                                            <input type="radio" id="star3" value="3" name="rating" v-model="rating">-->
<!--                                            <label class="full" for="star3" title="Good"-->
<!--                                                   :class="complaint.rating >= 3  ? 'color' : ''"></label>-->
<!--                                          &lt;!&ndash; 2 Stars&ndash;&gt;-->
<!--                                            <input type="radio" id="star2" value="2" name="rating" v-model="rating">-->
<!--                                            <label class="full" for="star2" title="Very bad"-->
<!--                                                   :class="complaint.rating >= 2  ? 'color' : ''"></label>-->
<!--                                          &lt;!&ndash; 1 Star &ndash;&gt;-->
<!--                                            <input type="radio" id="star1" value="1" name="rating" v-model="rating">-->
<!--                                            <label class="full" for="star1" title="Bad"-->
<!--                                                   :class="complaint.rating >= 1  ? 'color' : ''"></label>-->
<!--                                        </fieldset>-->
<!--                                        <button type="submit" class="btn btn-primary d-inline-block"-->
<!--                                                v-if="!complaint.rating" @click.prevent="addRating()"-->
<!--                                                style="font-family:'Cairo'">{{ $t('done') }}</button>-->
<!--                                    </span>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->

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
      title: 'complaint-single',
    };
  },
  layout: 'DoctorHeaderD',
  components: {DoctorSide, doctorNotifications},
  middleware: 'doctorSuspend',
  data() {
    return {
      complaint_id: '',
      complaint: {},
      messages: [],
      message: {},
      body: '',
      errorMessage: '',
      rating: '',
      rating_error: '',
      user: {}
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
      this.$axios.$get('/doctors/complaint/' + this.complaint_id + '/show')
        .then(response => {
          this.complaint = response.data;
          if (response.messages) {
            this.messages = response.messages
          }
        })
    },
    addReply() {
      if (!this.body) {
        this.errorMessage = 'enter your reply'
      } else {
        this.errorMessage = '';
        this.$axios.$post('/doctors/complaint/addReply', {
          body: this.body,
          complaint_id: this.complaint_id
        })
          .then(response => {
            this.message = response.data;
            this.messages.push(this.message);
            this.body = '';
          })
      }

    },
    addRating() {
      if (!this.rating) {
        if (this.current_lang == 'en') {
          this.rating_error = 'add rating'
        } else if (this.current_lang == 'ar') {
          this.rating_error = 'اضافه تقييم '
        }
      } else {
        this.rating_error = '';
        this.$axios.$post('/doctors/complaint/' + this.complaint_id + '/addRating', {
          rating: this.rating
        })
          .then(response => {
            if (this.current_lang == 'en') {
              this.$swal('rating added');
            } else if (this.current_lang == 'ar') {
              this.$swal('تم اضافه التقييم');
            }
            this.complaint = response.data
            this.$router.push(this.localePath('/doctors/dashboard/complaints'))
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

