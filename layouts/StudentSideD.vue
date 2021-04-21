<template>
  <div class="dashboard" :class="{rtl : current_lang === 'ar'}">
    <aside class="side-wrapper">
      <ul class="dashboard side-menu" :class="{rtl : current_lang === 'ar'}">
        <li>
          <a href="#" class="toggle-menu" @click="toggleMenu">
            <img src="https://api.promental.net/images/website/icon-menu.svg" alt="">
          </a>
        </li>

        <li @click="addActive()">
          <nuxt-link :to="localePath('/students/dashboard')">
            <img src="https://api.promental.net/images/website/icon-home.svg" alt="">
            <span>{{ $t('home') }}</span>
          </nuxt-link>
        </li>

        <li @click="addActive()">
          <nuxt-link :to=" localePath('/students/dashboard/sessions')">
            <img src="https://api.promental.net/images/website/icon-sessions.svg" alt="">
            <span>{{ $t('session') }}</span>
          </nuxt-link>
        </li>

        <li @click="addActive()">
          <nuxt-link :to="localePath('/students/dashboard/sessions-management')">
            <img src="https://api.promental.net/images/website/icon-sessions.svg" alt="">
            <span>{{ $t('session_management') }}</span>
          </nuxt-link>
        </li>
        <li @click="addActive()">
          <nuxt-link :to=" localePath('/students/dashboard/my-packages')">
            <img src="https://api.promental.net/images/website/icon-sessions.svg" alt="">
            <span>{{ $t('my_packages') }}</span>
          </nuxt-link>
        </li>
        <li @click="addActive()">
          <nuxt-link :to="localePath('/students/dashboard/reports')">
            <img src="https://api.promental.net/images/website/icon-reports.svg" alt="">
            <span> {{ $t('reports') }}</span>
          </nuxt-link>
        </li>
        <li @click="addActive()">
          <nuxt-link :to="localePath('/students/dashboard/complaints')">
            <img src="https://api.promental.net/images/website/icon-complaint.svg" alt="">
            <span> {{ $t('complaint') }}</span>
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
      <img src="https://api.promental.net/images/website/students.svg" alt="Promental" class="side-logo">
    </aside>
  </div>
</template>

<script>
export default {
  name: 'Side',
  data() {
    return {
      user: this.$auth.user.user,
      school: this.$auth.user.school,
      school_user: this.$auth.user.school_user
    }
  },
  methods: {
    addActive() {
      $('li').click(function () {
        var app = this
        $(app).addClass('active');
        $(app).siblings().removeClass('active')
      });
    },
    toggleMenu(e) {
      // Side Menu
      e.preventDefault();
      $(".main-wrapper").toggleClass("openMenu");
      // Dark Mode
      $('.switch-mode input[type="checkbox"]').change(function () {
        if ($(this).is(':checked')) {
          // alert('Dark mode');
          $("body").addClass("dark-mode")
        } else {
          // alert('Light mode');
          $("body").removeClass("dark-mode")

        }
      });
    }
  },
  computed: {
    current_lang() {
      return this.$i18n.locale
    }
  },
}
</script>

