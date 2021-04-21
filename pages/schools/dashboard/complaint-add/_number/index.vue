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
                  <div class="center-block text-center margin-50">
                    <img src="https://api.promental.net/images/website/check.svg" alt="">
                  </div>
                  <div class="center-block text-center margin-50">
                    <p v-if="current_lang == 'en'">
                      <img src="https://api.promental.net/images/website/icon-complaint-2.svg" alt="">
                      The complaint has been sent to number {{ complaint_number }} and
                      <br>
                      will be answered soon
                    </p>
                    <p v-if="current_lang == 'ar'">
                      <img src="https://api.promental.net/images/website/icon-complaint-2.svg" alt="">
                      تم ارسال شكوتك برقم {{ complaint_number }}
                      <br>
                      وسيتم الرد في اقرب وقت
                    </p>
                  </div>
                  <div class="center-block text-center margin-top-50">
                    <nuxt-link :to="localePath('/schools/dashboard/complaints')" class="btn btn-primary">{{$t('done')}}
                    </nuxt-link>
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
      title: 'complaints',
    };
  },
  middleware: 'schoolSuspend',
  layout: 'SchoolHeaderD',
  components: {SchoolSide, schoolNotifications},
  data() {
    return {
      complaint_number: ''
    }
  },
  mounted() {
    this.storage()
  },
  methods: {
    storage() {
      this.complaint_number = this.$route.params.number
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
