<template>
  <div :class="{rtl : current_lang === 'ar'}">
    <section class="page-banner schools-banner">
      <div class="container">
        <div class="page-banner-title pt-3">
          <img src="https://api.promental.net/images/website/schools-white.svg" alt="" v-if="current_lang == 'ar'">
          <img src="https://api.promental.net/images/website/schools-white_en.png" alt="" v-if="current_lang == 'en'">
        </div>
      </div>
    </section>
    <!-- Content -->
    <section class="container">
      <!--  Page Icon  -->
      <div class="page-name">
        <img src="https://api.promental.net/images/website/schools.svg" alt="" v-if="current_lang == 'ar'">
        <img src="https://api.promental.net/images/website/schools_en.png" alt="" v-if="current_lang == 'en'">
      </div>
      <!--  Page Details  -->
      <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-8">
          <div class="page-title">
            {{ $t('how_to_benefit_schools') }}
          </div>
          <div class="page-description">
            <span class="color-main">{{
                current_lang == 'ar' ? general_settings.site_name_ar : general_settings.site_name_en
              }}</span>
            <!--            <template v-if="current_lang == 'ar'">-->
            <!--              {{  general_settings.description_ar }}-->
            <!--            </template>-->
            <!--            <template v-if="current_lang == 'en'">-->
            <!--              {{  general_settings.description_en }}-->
            <!--            </template>-->
          </div>
          <div class="page-text">
            {{ current_lang == 'ar' ? service.benefits_ar : service.benefits_en }}
          </div>
          <div class="page-title">
            {{ $t('features_and_advantages') }}
          </div>
          <div class="page-text">
            {{ current_lang == 'ar' ? service.advantages_ar : service.advantages_en }}
          </div>
          <nuxt-link :to="localePath('/schools/Register-1')" class="btn btn-main"> {{
              $t('subscribe_with_us')
            }}
          </nuxt-link>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
          <div class="page-img">
            <img src="https://api.promental.net/images/website/bg-schools.png" alt="">
          </div>
        </div>
      </div>
      <!--  Divider  -->
      <hr>
    </section>
    <!-- partners -->
    <section class="container">
      <div class="section-title">
        {{ $t('our_partners_in_success_from_schools') }}
        <img src="https://api.promental.net/images/website/partners-icon.svg" alt="">
      </div>
      <VueSlickCarousel v-bind="slider_options" ref="slick" v-if="schools_ready && schools.length > 0">
        <div v-for="(school,index) in schools" :key="index">
          <div>
            <div class="item">
              <div class="partner-item">
                <img :src="school" alt="">
              </div>
            </div>
          </div>
        </div>
      </VueSlickCarousel>
      <VueSlickCarousel v-bind="slider_options" ref="slick" v-if="schools_ready && schools.length == 0">
        <div v-for="i in 10">
          <div>
            <div class="item">
              <div class="partner-item">
                <img src="https://api.promental.net/images/website/Rectangle418.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </VueSlickCarousel>
    </section>
    <!-- Testimonial -->
    <reviews></reviews>
  </div>
</template>
<script>
import reviews from "~/components/Reviews";

export default {
  layout: 'mainHeader',
  head() {
    return {
      title: 'Schools',
    };
  },
  components: {
    reviews
  },
  data() {
    return {
      slider_options: {
        'centerMode': true,
        'arrows': false,
        'centerPadding': '150',
        'focusOnSelect': true,
        'infinite': true,
        'slidesToShow': 4,
        'autoplay': true,
        'autoplaySpeed': 2000,
        'speed': 500,
        'slidesToScroll': 1,
        'touchThreshold': 5,
        'responsive': [
          {
            'breakpoint': 1050,
            'settings': {
              'centerPadding': '100px',
              'slidesToShow': 4,
              'slidesToScroll': 1,
              'infinite': true,
            }
          },
          {
            'breakpoint': 850,
            'settings': {
              'centerPadding': '100px',
              'slidesToShow': 3,
              'slidesToScroll': 1,
              'infinite': true,
            }
          },
          {
            'breakpoint': 600,
            'settings': {
              'centerPadding': '100px',
              'slidesToShow': 1,
              'slidesToScroll': 1,
              'initialSlide': 1,
              'infinite': true,
            }
          },
          {
            'breakpoint': 480,
            'settings': {
              'centerPadding': '50px',
              'slidesToShow': 1,
              'slidesToScroll': 1,
              'infinite': true,
            }
          }
        ]
      },
      schools: {},
      general_settings: {},
      description_ar_length: 0,
      description_en_length: 0,
      schools_ready: false,
      service: {},
    }
  },
  mounted() {
    this.getService();
    this.getSchools();
    this.getGeneralSettings();

  },

  methods: {
    getSchools() {
      this.$axios.$get('/website/getSchoolsAvatars')
        .then(response => {
          this.schools = response.data;
          this.schools_ready = true;
        })
    },
    getGeneralSettings() {
      this.$axios.$get('/setting')
        .then(response => {
          this.general_settings = response.data;
        })
    },
    getService() {
      this.$axios.$get('/website/services/school')
        .then(response => {
          this.service = response.data
        })
    },
  },
  computed: {
    current_lang() {
      return this.$i18n.locale
    }
  }
}
</script>
<style scoped>
.container {
  padding-top: 50px;
}
</style>
