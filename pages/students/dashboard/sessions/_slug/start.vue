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
                <div class="section-wrapper section-custom">

                  <div class="next-session-text" v-if="message">
                    {{ message }}
                  </div>

                  <div class="next-session-text" v-if="success_message">
                    {{ success_message }}
                  </div>


                  <!--              <div class="next-session-text" v-if="lang == 'en'">-->
                  <!--                Session will be started in <span>30</span> min-->
                  <!--                <br>-->
                  <!--                Please still in this page till the session began-->
                  <!--              </div>-->
                  <!--              <div class="next-session-text" v-if="lang == 'ar'">-->
                  <!--                ستبدا الجلسه في خلال <span>30</span> دقيقه-->
                  <!--                <br>-->
                  <!--                برجاء الانتظار في الصفحه حتي بدا الجلسه-->
                  <!--              </div>-->

                  <div class="section-footer">
                    <nuxt-link class="btn next-session-btn"
                               :to="localePath('/students/dashboard/sessions/'+session_slug+'/ongoing')"
                               v-if="success_message">
                      {{ $t('call') }}
<!--                      <img src="https://api.promental.net/images/website/RepeatGrid1.svg" alt="">-->

                    </nuxt-link>
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
import StudentSide from '../../../../../layouts/StudentSideD'
import studentNotifications from "~/components/studentNotifications"

export default {
  layout: 'StudentHeaderD',
  head() {
    return {
      title: 'Session-start',
    };
  },
  components: {StudentSide, studentNotifications},
  data() {
    return {
      user: this.$auth.user.user,
      school: this.$auth.user.school,
      session_slug: this.$route.params.slug,
      message: '',
      success_message: '',
    }
  },
  created() {
    setInterval(() => this.getSessionTime(), 60000);
  },
  mounted() {
    console.log(this.$auth.user.user)
    this.getSessionTime()
  },
  methods: {
    getSessionTime() {
      this.$axios.get('/student/sessions/' + this.session_slug + '/getSessionTime')
        .then(response => {

          console.log(response.data)
          this.user = this.$auth.user.user;
          if (response.data.status == '500') {
            if (this.current_lang == 'en') {
              this.message = 'session time is not coming yet';
            } else if (this.current_lang == 'ar') {
              this.message = 'وقت الجلسه لم ياتي'
            }
          } else if (response.data.status == '201') {
            if (this.current_lang == 'en') {
              this.message = 'session is time out'
            } else if (this.current_lang == 'ar') {
              this.message = 'session is time out'
            }
          } else if (response.data.status == '204') {
            if (this.current_lang == 'en') {
              this.message = 'session is not coming yet it will start at' + ' ' + response.data.data
            } else if (this.current_lang == 'ar') {
              this.message = 'وقت الجلسه لم ياتي سوف تبدا خلال' + response.data.data
            }
          } else if (response.data.status == '200') {
            if (this.current_lang == 'ar') {
              this.success_message = 'session is ready to open'
            } else if (this.current_lang == 'en') {
              this.success_message = ' الجلسه يمكن اجراؤها   '
            }
          }
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

</style>

