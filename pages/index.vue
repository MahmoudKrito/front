<script src="../../../../Users/pc/Desktop/vue-core-video-player-dev/src/index.js"></script>
<template>
  <div>
    <section class="intro-section" :class="{rtl : current_lang === 'ar'}">
      <div class="container" style="padding-top:60px">
        <div class="row">
          <div class="col-xs-12 col-md-8 col-lg-6">
            <div class="intro-details">
              <div class="intro-icon-1">
                <img src="../assets/images/Group1699.svg" alt="">
              </div>
              <div class="intro-title">
                <img src="https://api.promental.net/images/website/intro-title.svg" alt="" v-if="current_lang == 'ar'">
                <img src="https://api.promental.net/images/website/intro-title_en.png" alt=""
                     v-if="current_lang == 'en'">
              </div>
              <div class="intro-icon-2">
                <img src="https://api.promental.net/images/website/Page-1.svg" alt="">
              </div>
              <div class="intro-description" style="width:50%">
                {{ current_lang === 'ar' ? general_settings.header_title_ar : general_settings.header_title_en }}
              </div>

              <div class="intro-promental">
                <!--                <img :src="general_settings.footer_logo" alt="">-->
                <img src="https://api.promental.net/images/website/promental.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="arrow-animation"></div>
      <div class="arrow-animation arrow-animation-2"></div>
    </section>
    <!-- Services Links -->
    <div class="container">
      <ul class="main-links">
        <li>

          <nuxt-link :to="localePath('/schools')">
            {{ $t('schools') }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="localePath('/doctors/DoctorSearch')">
            {{ $t('doctors') }}
          </nuxt-link>
        </li>
        <li>

          <nuxt-link :to="localePath('/sessions')">
            {{ $t('sessions') }}
          </nuxt-link>
        </li>
      </ul>
      <div>
        <form class="form-inline">
          <div class="form-group">
            <button type="button" class="btn btn-main"> {{ $t('subscribe') }} {{ $t('to') }} {{ $t('news') }}
            </button>
          </div>
          <div class="form-group">
            <nuxt-link :to="localePath('/contact-us')"  class="btn btn-main"> {{ $t('contact_us') }} </nuxt-link>
          </div>
<!--          <div class="checkbox">-->
<!--&lt;!&ndash;            <label>&ndash;&gt;-->
<!--&lt;!&ndash;              <input type="checkbox">&ndash;&gt;-->
<!--&lt;!&ndash;              {{ $t('by_clicking_on_start_i_agree_to_the_terms_and_conditions') }}&ndash;&gt;-->

<!--&lt;!&ndash;            </label>&ndash;&gt;-->

<!--          </div>-->
        </form>

      </div>
    </div>
    <!-- About -->
    <section class="about-wrapper">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-sm-6">
            <div class="about-title">
              <img src="https://api.promental.net/images/website/about.svg" alt="" v-if="current_lang == 'ar'">
              <img src="https://api.promental.net/images/website/about_en.png" alt="" v-if="current_lang == 'en'">
            </div>
          </div>
          <div class="col-xs-12 col-md-6">
            <div class="logo">
              <img src="https://api.promental.net/images/website/logo-3.svg" alt="">
            </div>
            <div class="about-text" v-if="current_lang=='ar'">
              <p class="text-highlight">
                <span class="color-main">{{ general_settings.site_name_ar }}</span>
                {{ general_settings.description_ar }}
              </p>
              <!--              <p>-->
              <!--                {{ general_settings.description_ar | sliceText(101,300) }}-->
              <!--              </p>-->
              <!--              <p>-->
              <!--                {{ general_settings.description_ar | sliceText(301,500) }}-->
              <!--              </p>-->
              <!--              <p>-->
              <!--                {{ general_settings.description_ar | sliceText(501,description_ar_length) }}-->
              <!--              </p>-->
            </div>

            <div class="about-text" v-if="current_lang=='en'">
              <p class="text-highlight">
                <span class="color-main">{{ general_settings.site_name_en }}</span>
                {{ general_settings.description_en }}
              </p>

            </div>
          </div>
        </div>
      </div>

      <div class="arrow-animation"></div>
      <div class="arrow-animation arrow-animation-2"></div>
    </section>
    <!-- Why Choose Us -->
    <section class="chooseUs-banner">
      <div class="container">
        <div class="chooseUs-title">
          <img src="https://api.promental.net/images/website/choose-us.svg" alt="" v-if="current_lang == 'ar'">
          <img src="https://api.promental.net/images/website/choose-us-en.png" alt="" v-if="current_lang == 'en'">
        </div>
      </div>
      <div class="arrow-animation"></div>
      <div class="arrow-animation arrow-animation-2"></div>
    </section>
    <!-- Services -->
    <div class="container">
      <div class="chooseUs-description" style="width:75%">
        {{ current_lang == 'en' ? general_settings.subtitle : general_settings.subtitle_ar }}
      </div>

      <!--  Services list  -->
      <ul class="services-list">


        <li class="service-item" v-for="(service,index) in services" :key="service.id">
          <div class="service-title">{{ current_lang == 'en' ? service.title_en : service.title_ar }}</div>
          <div class="service-description">
            {{ current_lang == 'en' ? service.description_en : service.description_ar }}
          </div>
          <nuxt-link :to="localePath('/'+service.title_en)" class="btn">
            {{ $t('more') }}
          </nuxt-link>

        </li>

<!--        <li class="service-item">-->
<!--          <div class="service-title">{{  $t('sessions') }}</div>-->
<!--          <div class="service-description">-->
<!--            {{ current_lang == 'en' ? service.description_en : service.description_ar }}-->
<!--          </div>-->
<!--          <nuxt-link :to="localePath('/sessions')" class="btn">-->
<!--            {{ $t('more') }}-->
<!--          </nuxt-link>-->

<!--        </li>-->

      </ul>
    </div>
    <!-- Video -->
    <div class="video-section">
      <div class="container">
        <div class="row">

<!--          <div class="col-xs-12 col-md-12">-->
<!--            <a href="javascript:;" class="toggle-video">-->

<!--              <video controls autoplay loop style="width:100%;height:auto">-->
<!--                <source :src="video_url+'video'" type="video/mp4">-->
<!--              </video>-->
<!--              &lt;!&ndash;              <client-only>&ndash;&gt;-->
<!--              &lt;!&ndash;                <vue-core-video-player loop :src="video_url+'video'" title="《Your Name》OST Sparkle"&ndash;&gt;-->
<!--              &lt;!&ndash;                                       autoplay></vue-core-video-player>&ndash;&gt;-->
<!--              &lt;!&ndash;              </client-only>&ndash;&gt;-->

<!--            </a>-->
<!--          </div>-->

          <!--          <div class="col-xs-12 col-md-6">-->
          <!--            <div class="logo">-->
          <!--              <img src="../assets/images/logo-4.svg" alt="">-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// import VueCoreVideoPlayer from 'vue-core-video-player'

export default {
  head() {
    return {
      title: 'Home',
    };
  },

  layout: 'mainHeader',
  data() {
    return {
      general_settings: {},
      description_ar_length: 0,
      description_en_length: 0,
      services: {},
      school_auth: '',
      student_log: '',
      isLoaded: false,
      isLoaded2: false,
      current_lang: this.$i18n.locale,
      header_title_ar: '',
      header_title_en: '',
      video_url: this.$axios.defaults.baseURL,
      base_url: process.env.StorageUrl
    }
  }
  ,
  mounted() {
    this.getServices();
    this.getGeneralSettings();
    // console.log(process.env.StorageUrl)
  }
  ,
  methods: {
    getGeneralSettings() {
      this.$axios.$get('/setting')
        .then(response => {
          this.isLoaded = true;
          this.general_settings = response.data;
          // for filter
          this.description_ar_length = this.general_settings.description_ar.length;
          this.description_en_length = this.general_settings.description_en.length;
          // this.header_title_ar_length =  this.general_settings.header_title_ar.split(' ').length;
          // this.header_title_en_length =  this.general_settings.header_title_en.split(' ').length;
          this.header_title_en = this.general_settings.header_title_en.split(' ')
          this.header_title_ar = this.general_settings.header_title_ar.split(' ')
          console.log(this.header_title_en.length)
          console.log(this.header_title_ar.length)
        })
    },
    getServices() {
      this.$axios.$get('/website/services')
        .then(response => {
          this.isLoaded2 = true;
          this.services = response.data;
        })
    }
  },
}
</script>
