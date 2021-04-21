<template>

  <div v-if="isLoaded" :class="{rtl : current_lang === 'ar'}">
    <!-- Page Banner -->
    <section class="page-banner doctors-banner">
      <div class="container">
        <div class="page-banner-title pt-3">
          <img src="https://api.promental.net/images/website/doctors-white.png" alt="" v-if="current_lang == 'ar'">
          <img src="https://api.promental.net/images/website/doctors-white_en.png" alt="" v-if="current_lang == 'en'">
        </div>
      </div>
    </section>

    <section class="container">
      <!--  Page Icon  -->
      <div class="page-name">
        <img src="https://api.promental.net/images/website/doctors.svg" alt="" v-if="current_lang == 'ar'">
        <img src="https://api.promental.net/images/website/doctors_en.png" alt="" v-if="current_lang == 'en'">
      </div>
      <!--  Page Details  -->
      <div class="row">


        <div class="col-xs-12 col-sm-6 col-md-8">
          <div class="page-title">
            {{ $t('how_to_benefit_as_doctor') }}
          </div>
          <div class="page-description">
            <span
              class="color-main">{{
                current_lang === 'ar' ? this.general_settings.site_name_ar : this.general_settings.site_name_en
              }}</span>
            <!--            <template v-if="current_lang == 'ar'">-->
            <!--              {{ general_settings.description_ar  | sliceText(0,100) }}-->
            <!--            </template>-->
            <!--            <template v-if="current_lang == 'en'">-->
            <!--              {{ general_settings.description_en  | sliceText(0,100) }}-->
            <!--            </template>-->
          </div>
          <div class="page-text">
            {{ current_lang === 'en' ? this.service.benefits_en : this.service.benefits_ar }}
          </div>
          <div class="page-title">
            {{ $t('features_and_advantages') }}
          </div>
          <div class="page-text">
            {{ current_lang === 'en' ? this.service.advantages_en : this.service.advantages_ar }}
          </div>
          <nuxt-link :to="localePath('/doctors/Register-1')" class="btn btn-main">
            {{ $t('join_us') }}
          </nuxt-link>

        </div>

        <div class="col-xs-12 col-sm-6 col-md-4">
          <div class="page-img">
            <img src="https://api.promental.net/images/website/bg-doctors.png" alt="">
          </div>
        </div>
      </div>
      <hr>
    </section>


    <section class="container">
      <div class="section-title">
        {{ $t('available_packages') }}
      </div>
      <!--  Subscription  -->
      <div class="subscription-wrapper" v-for="doctorPackage,index in packages" :key="doctorPackage.id">
        <div class="subscription-icon">
          <img src="https://api.promental.net/images/website/clock.svg" alt="" v-if="index == 0">
          <img src="https://api.promental.net/images/website/individual-session.svg" alt="" v-else-if="index == 1">
        </div>

        <div class="subscription-details">
          <div class="subscription-title">
            {{ current_lang == 'en' ? doctorPackage.name_en : doctorPackage.name_ar }}
            <div>
                    <span>
                         {{ $t('it_will_be_package') }}
                    </span>
              {{ $t('custom_to_students') }}
            </div>
          </div>
          <div class="subscription-description">
            {{ current_lang == 'en' ? doctorPackage.desc_en : doctorPackage.desc_ar }}
          </div>
        </div>
        <nuxt-link :to="localePath('/doctors/Register-1')" class="btn btn-main"> {{ $t('subscribe_now') }}</nuxt-link>
      </div>

    </section>


    <!--  end section 1  -->


    <!-- Doctors -->
    <section class="container">
      <div class="section-title">
        {{ $t('our_partners_in_success_are_doctors') }}
        <img src="https://api.promental.net/images/website/doctors-icon.svg" alt="">
      </div>

      <u-animate-container>
        <div class="row">
          <u-animate
            name="fadeIn"
            delay="2s"
            duration="1s"
            :iteration="1"
            animateClass="animated" class="col-xs-12 col-sm-6 col-md-4 col-lg-3 wow zoomIn"
            v-for="(doctor,index) in doctors" :key="doctor.id">
            <div class="doctor-item">
              <div class="doctor-details">
                <div class="doctor-img">
                  <img :src="doctor.avatar" alt="">
                </div>
                <div class="doctor-details">
                  <div class="doctor-name">
                    <span
                      class="doctor-abbr">{{ current_lang == 'en' ? doctor.type.name_en : doctor.type.name_ar }} . </span>
                    <span class="doctor-fName">{{ current_lang == 'ar' ? doctor.name_ar : doctor.name_en }}</span>
                  </div>
                  <div class="doctor-brief" v-if="current_lang == 'ar'">
                    {{ doctor.account.description | subBody }}
                  </div>
                  <div class="doctor-brief" v-if="current_lang == 'en'">
                    {{ doctor.account.description_en | subBody }}
                  </div>
                </div>
              </div>

              <div class="book-now">
                <nuxt-link :to="localePath('/doctors/'+doctor.slug)" class="btn btn-main btn-lg">
                  {{ $t('book_now') }}
                </nuxt-link>

              </div>
            </div>
          </u-animate>
        </div>
      </u-animate-container>


      <nav aria-label="Page navigation" class="text-center center-block">
        <ul class="pagination">
          <li :class="prev ? 'disabled' : ''">
            <a href="" aria-label="Previous" @click="prevStep">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          <li :class="current_page == c ? 'active' : ''" v-for="c in count2">
            <a href=""@click.prevent="getDoctors(c)">{{ c }}</a>
          </li>
          <li :class="next ? 'disabled' : ''">
            <a href="" aria-label="Next" @click="nextStep">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>

    </section>

  </div>

</template>

<script>
import {UAnimateContainer, UAnimate} from 'vue-wow'

export default {
  layout: 'mainHeader',
  head() {
    return {
      title: 'Doctors',
    };
  },
  components: {UAnimateContainer, UAnimate},
  data() {
    return {
      packages: {},
      doctors: {},
      count: '5',
      service: {},
      general_settings: {},
      renderComponent: true,
      isLoaded: false,
      last_page: '',
      count2: [],
      stepIndex: '',
      next: false,
      prev: false,
      current_page: '',
      user_id: this.$auth.loggedIn ? this.$auth.user.user.id : ''
    }
  },
  mounted() {
    this.getPackages();
    this.getDoctors(1);
    this.getDoctorService();
    this.getGeneralSettings();
  },

  methods: {
    nextStep(e) {
      e.preventDefault();
      if (this.stepIndex < this.count2.length) {
        this.stepIndex++;
        this.getDoctors(this.stepIndex)
      }
      if (this.stepIndex == this.count2.length) {
        this.next = true
      }
    },
    prevStep(e) {
      e.preventDefault();
      if (this.stepIndex > 1) {
        this.stepIndex--;
        this.getDoctors(this.stepIndex)
      }
      if (this.stepIndex == 1) {
        this.prev = true
      }
    },
    getSingleDoctor(e, slug) {
      e.preventDefault();
      this.$router.push(this.localePath('/doctors/' + slug))
    },
    getPackages() {
      this.$axios.$get('/website/getPackages')
        .then(response => {
          this.packages = response.data;
        })
    },
    getDoctors(page) {
      this.stepIndex = page;
      this.$axios.$get('/website/doctors?page=' + page + '&user_id=' + this.user_id)
        .then(response => {
          this.isLoaded = true;
          this.doctors = response.data.data;
          this.last_page = response.data.pagination.last_page;
          this.current_page = response.data.pagination.current_page;
          console.log(this.doctors)
          if (this.count2.length == 0) {
            for (var i = 1; i <= this.last_page; i++) {
              this.count2.push(i)
            }
          }
        })
    },
    getDoctorService() {
      this.$axios.$get('/website/services/doctor')
        .then(response => {
          this.service = response.data
        })
    },
    getGeneralSettings() {
      this.$axios.$get('/setting')
        .then(response => {
          this.general_settings = response.data;
        })
    },
  },
  computed: {
    current_lang() {
      return this.$i18n.locale
    },
    query() {
      return 'doctors'
    }
  },
}
</script>

<style scoped>
.container {
  padding-top: 50px;
}

element.style {
  visibility: visible !important;
}

@media (min-width: 1264px) {
  .col-lg-3 {
    flex: 0 0 25%;
    max-width: 100% !important;
  }
}


</style>

