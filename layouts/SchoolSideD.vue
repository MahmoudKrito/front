<template>
  <div class="dashboard">
    <div :class="{rtl : current_lang === 'ar'}">
      <aside class="side-wrapper">
        <ul class="side-menu" :class="{rtl : current_lang === 'ar'}">
          <li>
            <a href="#" class="toggle-menu" @click.prevent="toggleMenu">
              <img src="https://api.promental.net/images/website/icon-menu.svg" alt="">
            </a>
          </li>
          <li @click="addActive()">
            <nuxt-link :to="localePath('/schools/dashboard/')">
              <img src="https://api.promental.net/images/website/icon-home.svg" alt="">
              <span>{{ $t('home') }}</span>
            </nuxt-link>
          </li>
          <li @click="addActive()">
            <nuxt-link :to="localePath('/schools/dashboard/students')">
              <img src="https://api.promental.net/images/website/icon-student.svg" alt="">
              <span> {{ $t('students') }}</span>
            </nuxt-link>
          </li>
          <li @click="addActive()">
            <nuxt-link :to="localePath('/schools/dashboard/doctors')">
              <img src="https://api.promental.net/images/website/icon-doctors.svg" alt="">
              <span>{{ $t('doctors') }}</span>
            </nuxt-link>
          </li>
          <li @click="addActive()">
            <nuxt-link :to="localePath('/schools/dashboard/subscriptions')">
              <img src="https://api.promental.net/images/website/icon-reports.svg" alt="">
              <span> {{ $t('list_subscription') }}</span>
            </nuxt-link>
          </li>
          <li @click="addActive()">
            <nuxt-link :to="localePath('/schools/dashboard/packages')">
              <img src="https://api.promental.net/images/website/icon-doctors.svg" alt="">
              <span> {{ $t('management_packages') }}</span>
            </nuxt-link>
          </li>
          <li @click="addActive()">
            <nuxt-link :to="localePath('/schools/dashboard/subscriptions-history')">
              <img src="https://api.promental.net/images/website/icon-doctors.svg" alt="">
              <span> {{ $t('subscriptions_history') }}</span>
            </nuxt-link>
          </li>
          <li @click="addActive()">
            <nuxt-link :to="localePath('/schools/dashboard/complaints')">
              <img src="https://api.promental.net/images/website/icon-complaint.svg" alt="">
              <span>{{ $t('technical_support') }}</span>
            </nuxt-link>
          </li>
          <li @click="addActive()">
            <nuxt-link :to="switchLocalePath('en')">
              <img src="https://api.promental.net/images/website/icon-globe.svg" alt="">
              <span>English</span>
            </nuxt-link>
          </li>
          <li @click="addActive()">
            <nuxt-link :to="switchLocalePath('ar')">
              <img src="https://api.promental.net/images/website/icon-globe.svg" alt="">
              <span>Ar</span>
            </nuxt-link>
          </li>
        </ul>
        <img src="https://api.promental.net/images/website/schools.svg" alt="Promental" class="side-logo">
      </aside>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Side',
  data() {
    return {
      user: this.$auth.user.user,
      school: this.$auth.user.school
    }
  },
  methods: {
    addActive() {
      $('li').click(function () {
        var app = this
        $(app).addClass('active')
        $(app).siblings().removeClass('active')
      })
    },
    toggleMenu(e) {
      // Side Menu
      e.preventDefault();
      $(".main-wrapper").toggleClass("openMenu");
      // // Dark Mode
      $('.switch-mode input[type="checkbox"]').change(function () {
        if ($(this).is(':checked')) {
          $("body").addClass("dark-mode")
        } else {
          $("body").removeClass("dark-mode")

        }
      });
    },
    checkSchoolStatus() {
      if (this.school.payment_suspend == 1 && this.user.is_suspended == 1) {
        return true;
      } else {
        return false;
      }
    }
  },
  computed: {
    current_lang() {
      return this.$i18n.locale
    }
  }
}
</script>

<style scoped>
@import '../assets/css/Dashboards/style.css';
@import '../assets/css/Dashboards/theme.css';

</style>
