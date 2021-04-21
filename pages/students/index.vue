<template>
  <div :class="{rtl : current_lang === 'ar'}">
    <!-- Page Banner -->
    <section class="page-banner students-banner">
      <div class="container">
        <div class="page-banner-title">
          <img src="https://api.promental.net/images/website/students-white.png" alt="" v-if="current_lang == 'ar'">
          <img src="https://api.promental.net/images/website/students-white_en.png" alt="" v-if="current_lang == 'en'">
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="container">
      <!--  Page Icon  -->
      <div class="page-name page-students">
        <img src="https://api.promental.net/images/website/students.svg" alt="" v-if="current_lang == 'ar'">
        <img src="https://api.promental.net/images/website/students_en.png" alt="" v-if="current_lang == 'en'">
      </div>
      <!-- Page -->
      <div class="about-wrapper style-2">
        <div class="row">
          <div class="col-xs-12 col-md-5">
            <div class="about-title">
              <img src="https://api.promental.net/images/website/about-2.svg" alt="" v-if="current_lang == 'ar'">
              <img src="https://api.promental.net/images/website/about-2_en.png" alt="" v-if="current_lang == 'en'">
              <div class="arrow-animation"></div>
            </div>
          </div>
          <div class="col-xs-12 col-md-7">
            <div class="logo">
              <img src="https://api.promental.net/images/website/logo-3.svg" alt="">
              <div class="doctor-rating">
                <i class="fa fa-star active"></i>
                <i class="fa fa-star active"></i>
                <i class="fa fa-star active"></i>
                <i class="fa fa-star active"></i>
                <i class="fa fa-star active"></i>
              </div>
            </div>
            <div class="about-text" v-if="current_lang=='ar'">
              <p class="text-highlight">
                <span class="color-main">{{ general_settings.site_name_ar }}</span>
                {{ general_settings.description_ar }}
              </p>
            </div>

            <div class="about-text" v-if="current_lang=='en'">
              <p class="text-highlight">
                <span class="color-main">{{ general_settings.site_name_en }}</span>
                {{ general_settings.description_en  }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!--  Divider  -->
      <div class="col-xs-12 col-md-8 col-md-push-2">
        <hr>
      </div>
      <!-- Page -->
      <div class="about-wrapper style-2">

        <div class="row">
          <div class="col-xs-12 col-md-6">
            <div class="page-title">
              {{ $t('how_to_benefit_students') }}
            </div>
            <div class="about-text">
              <p class="text-highlight">
                <span class="color-main">{{current_lang == 'ar' ? general_settings.site_name_ar : general_settings.site_name_en}}</span>
                {{ current_lang == 'ar' ? service.benefits_ar : service.benefits_en }}
              </p>
            </div>

          </div>
          <div class="col-xs-12 col-md-6">
            <div class="page-title">
              {{ $t('features_and_advantages') }}
            </div>

            <div class="about-text">
              <p>
                {{ current_lang == 'ar' ? service.advantages_ar : service.advantages_en }}
              </p>
            </div>
          </div>
        </div>

        <div class="text-center margin-top-20 wow zoomInDown" data-wow-delay="0.5s">

          <nuxt-link :to="localePath('/students/StudentsJoin')" class="btn btn-main btn-lg">
            {{ $t('join_request') }}
          </nuxt-link>

        </div>

      </div>
    </section>

  </div>

</template>

<script>
export default {
  layout: 'mainHeader',
  head() {
    return {
      title: 'Students',
    };
  },
  data() {
    return {
      description_ar_length: 0,
      description_en_length: 0,
      service: {},
      general_settings: {},
      user: false
    }
  },
  mounted() {
    this.getUser();
    this.getGeneralSettings();
    this.getService();
  },
  methods: {
    getUser() {
      if (this.$auth.loggedIn) {
        this.user = this.$auth.user
      }
    },
    getService() {
      this.$axios.$get('/website/services/student')
        .then(response => {
          this.service = response.data
        })
    },
    getGeneralSettings() {
      this.$axios.$get('/setting')
        .then(response => {
          this.general_settings = response.data;
          console.log(this.general_settings)
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
.container {
  padding-top: 70px
}
</style>
