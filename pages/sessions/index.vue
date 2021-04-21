<template>
  <div :class="{rtl : current_lang === 'ar'}">
    <section class="page-banner sessions-banner">
      <div class="container">
        <div class="page-banner-title">
          <img src="https://api.promental.net/images/website/sessions-white.png" alt="" v-if="current_lang=='ar'">
          <img src="https://api.promental.net/images/website/sessions-white_en.png" alt="" v-if="current_lang=='en'">
        </div>
      </div>
    </section>
    <!-- Content -->
    <section class="container">
      <!-- Page -->
      <div class="about-wrapper style-2">
        <div class="row">
          <div class="col-xs-12 col-md-5 wow fadeInRight" data-wow-delay="0.4s">
            <div class="about-title">
              <img src="https://api.promental.net/images/website/consultation.svg" alt="" v-if="current_lang == 'ar'">
              <img src="https://api.promental.net/images/website/consultation_en.png" alt="" v-if="current_lang == 'en'">
              <nuxt-link :to="localePath('/doctors/DoctorSearch')"  class="btn btn-main"> {{ $t('book_now')}} </nuxt-link>
              <div class="arrow-animation"></div>
            </div>
          </div>
          <div class="col-xs-12 col-md-7 wow fadeInDown" data-wow-delay="0.8s">
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

            <div class="about-text" v-if="current_lang == 'en'">
              <p class="text-highlight">
                <span class="color-main">{{ general_settings.site_name_en }}</span>
                {{ general_settings.description_en }}
              </p>

            </div>
          </div>
        </div>
      </div>
      <!--  Divider  -->
      <div class="col-xs-12 col-md-8 col-md-push-2">
        <hr>
      </div>
      <div class="clearfix"></div>
      <!--  Available Sections  -->
      <div class="section-title section-title-2">
        {{ $t('sections') }} {{ $t('available') }}
      </div>


      <u-animate-container>
        <div class="row">
          <u-animate
            name="fadeIn"
            duration="1.0s"
            :iteration="1"
            :offset="0"
            animateClass="animated"
            :begin="false" class="col-xs-12 col-sm-6 col-md-3 wow fadeInUp"
            v-for="(disease,index) in diseases"
            :key="disease.id" :delay="disease[index]++ + 's'" style="visibility: visible !important">
            <div class="available-section-wrapper">
              <div class="available-section-img">
                <img :src="disease.cover" alt="">
              </div>
              <div class="available-section-title">
                {{ current_lang == 'en' ? disease.name_en : disease.name_ar }}
              </div>
            </div>
          </u-animate>
        </div>
      </u-animate-container>
      <!--  Divider  -->
      <div class="col-xs-12 col-md-8 col-md-push-2">
        <hr>
      </div>
      <div class="clearfix"></div>
      <!--  How to booking  -->
      <div class="section-title section-title-2">
        {{ $t('how_to_book_session') }}
      </div>
      <u-animate-container>
        <div class="row">
          <u-animate
            name="fadeIn"
            delay="5s"
            duration="0.5s"
            :iteration="1"
            :offset="0"
            animateClass="animated"
            :begin="false" class="col-xs-12 col-md-4 wow zoomIn">
            <div class="howToBooking-wrapper">
              <div class="howToBooking-img">
                <img src="https://api.promental.net/images/website/Group1902.svg" alt="">
              </div>
              <div class="howToBooking-title">
                1-{{ $t('you_can_choose_right_doctor') }}
              </div>
              <div class="howToBooking-description">
                {{$t('you_can_choose_doctor_from_through_many_specialists')}}
              </div>
            </div>
          </u-animate>
          <u-animate
            name="fadeIn"
            delay="5s"
            duration="1s"
            :iteration="1"
            :offset="0"
            animateClass="animated"
            :begin="false" class="col-xs-12 col-md-4 wow zoomIn">
            <div class="howToBooking-wrapper">
              <div class="howToBooking-img">
                <img src="https://api.promental.net/images/website/appointment.svg" alt="">
              </div>
              <div class="howToBooking-title">
                2-{{ $t('register_and_book_an_appointment') }}
              </div>

              <div class="howToBooking-description">
                {{ $t('then_register_and_choose_an_appointment_the_appropriate_session') }}
              </div>

            </div>
          </u-animate>
          <u-animate
            name="fadeIn"
            delay="5s"
            duration="1.5s"
            :iteration="1"
            :offset="0"
            animateClass="animated"
            :begin="false" class="col-xs-12 col-md-4 wow zoomIn">
            <div class="howToBooking-wrapper">
              <div class="howToBooking-img">
                <img src="https://api.promental.net/images/website/Group679ew.svg" alt="">
              </div>
              <div class="howToBooking-title">
                3- {{ $t('speak') }}
              </div>

              <div class="howToBooking-description">
                {{ $t('then_speak_to_the_specialist_directly') }}
              </div>
            </div>
          </u-animate>
        </div>
      </u-animate-container>

    </section>

    <!-- Testimonial -->
    <reviews></reviews>

  </div>

</template>

<script>
import {UAnimateContainer, UAnimate} from 'vue-wow'
// import carousel from 'vue-owl-carousel'
import Reviews from "../../components/Reviews";

export default {
  layout: 'mainHeader',
  head() {
    return {
      title: 'Sessions',
    };
  },
  components: {
    UAnimateContainer,
    UAnimate,
    Reviews,
  },
  data() {
    return {
      diseases: {},
      reviews: {},
      general_settings: {},
      description_ar_length: '',
      description_en_length: '',
    }
  },
  mounted() {
    this.getDiseases();
    this.getGeneralSettings();
  },
  methods: {
    getGeneralSettings() {
      this.$axios.$get('/setting')
        .then(response => {
          this.general_settings = response.data;
          this.description_ar_length = this.general_settings.description_ar.length;
          this.description_en_length = this.general_settings.description_en.length
        })
    },
    getDiseases() {
      this.$axios.$get('/website/getDiseases')
        .then(response => {
          this.diseases = response.data;
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
.page-banner{
  margin-top: 70px;
}

</style>


