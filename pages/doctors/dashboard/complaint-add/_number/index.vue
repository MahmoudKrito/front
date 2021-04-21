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
                <div class="section-wrapper section-custom section-custom-2">
                  <div class="center-block text-center margin-50">
                    <img src="https://api.promental.net/images/website/check.svg" alt="" width="75">
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
                      تم اضافه الشكوي برقم {{ complaint_number }}
                      <br>
                      سيتم الرد في اقرب وقت
                    </p>
                  </div>
                  <div class="center-block text-center margin-top-50">
                    <nuxt-link :to="localePath('/doctors/dashboard/complaints')" class="btn btn-primary">
                      {{ $t('done') }}
                    </nuxt-link>
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
      title: 'complaint-add-confirm',
    };
  },
  middleware: 'doctorSuspend',
  layout: 'DoctorHeaderD',
  components: {DoctorSide, doctorNotifications},
  data() {
    return {
      complaint_number: ''
    }
  },
  mounted() {
    this.storage();
  },
  methods: {
    storage() {
      this.complaint_number = this.$route.params.number;
    }
  },
  computed: {
    current_lang() {
      return this.$i18n.locale
    }
  },
}
</script>


