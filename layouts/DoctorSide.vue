<template>
  <v-app>
    <div class="dashboard">
      <div :class="{rtl : current_lang === 'ar'}">
        <aside class="side-wrapper">
          <ul class="side-menu" :class="{rtl : current_lang === 'ar'}">
            <li>
              <a href="javascript:;" class="toggle-menu" @click.prevent="toggleMenu">
                <img src="https://api.promental.net/images/website/icon-menu.svg" alt="">
              </a>
            </li>
            <li @click="addActive()">
              <!--            <nuxt-link :to="localePath('/doctors/dashboard')">-->
              <!--              <img src="https://api.promental.net/images/website/icon-home.svg" alt="">-->
              <!--              <span>{{ $t('home') }}</span>-->
              <!--            </nuxt-link>-->
              <nuxt-link :to="localePath('/doctors/dashboard')"  data-toggle="tooltip" data-placement="right" :title="$t('home')">
                <img src="https://api.promental.net/images/website/icon-home.svg" alt="">
                <span>{{ $t('home') }}</span>
              </nuxt-link>

            </li>
            <li @click="addActive()">
              <nuxt-link :to="localePath('/doctors/dashboard/reservations')"  data-toggle="tooltip" data-placement="right" :title="$t('reservations')">
                <img src="https://api.promental.net/images/website/icon-sessions.svg" alt="">
                <span> {{ $t('reservations') }}</span>
              </nuxt-link>
            </li>
            <li @click="addActive()">
              <nuxt-link :to="localePath('/doctors/dashboard/consulting')" data-toggle="tooltip" data-placement="right" :title="$t('consulting')">
                <img src="https://api.promental.net/images/website/icon-consulting.svg" alt="">
                <span> {{ $t('consulting') }}</span>
              </nuxt-link>
            </li>
            <li @click="addActive()">
              <nuxt-link :to="localePath('/doctors/dashboard/sessions')" data-toggle="tooltip" data-placement="right" :title="$t('sessions')">
                <img src="https://api.promental.net/images/website/icon-session.svg" alt="">
                <span> {{ $t('sessions') }}</span>
              </nuxt-link>
            </li>
            <li @click="addActive()">
              <nuxt-link :to="localePath('/doctors/dashboard/sessions/sessions-new')"  data-toggle="tooltip" data-placement="right" :title="$t('start_session')">
                <img src="https://api.promental.net/images/website/icon-start-session.svg" alt="">
                <span>{{ $t('start_session') }}</span>
              </nuxt-link>
            </li>
            <li @click="addActive()">
              <nuxt-link :to="localePath('/doctors/dashboard/payments')"  data-toggle="tooltip" data-placement="right" :title="$t('payments')">
                <img src="https://api.promental.net/images/website/icon-reports.svg" alt="">
                <span> {{ $t('payments') }}</span>
              </nuxt-link>
            </li>
            <li @click="addActive()">
              <nuxt-link :to="localePath('/doctors/dashboard/payments/create')" data-toggle="tooltip" data-placement="right" :title="$t('payment_methods')">
                <img src="https://api.promental.net/images/website/icon-reports.svg" alt="">
                <span> {{ $t('payment_methods') }} </span>
              </nuxt-link>
            </li>
            <li @click="addActive()">
              <nuxt-link :to="localePath('/doctors/dashboard/payment_history')"  data-toggle="tooltip" data-placement="right" :title="$t('payment_history')">
                <img src="../assets/images/icon-reports.svg" alt="">
                <span> {{ $t('payment_history') }}</span>
              </nuxt-link>
            </li>
            <li @click="addActive()">
              <nuxt-link :to="localePath('/doctors/dashboard/complaints')"   data-toggle="tooltip" data-placement="right" :title="$t('technical_support')">
                <img src="https://api.promental.net/images/website/icon-complaint.svg" alt="">
                <span> {{ $t('technical_support') }}</span>
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
          <img src="https://api.promental.net/images/website/doctors.svg" alt="Promental" class="side-logo">
        </aside>
      </div>
    </div>
  </v-app>

</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      user: this.$auth.user.user
    }
  },
  methods: {
    addActive() {
      $('li').click(function () {
        var app = this
        $(app).addClass('active')
        $(app).siblings().removeClass('active')
      });
    },
    toggleMenu(e) {
      // Side Menu
      e.preventDefault();
      $(".main-wrapper").toggleClass("openMenu");
      // // Dark Mode
      $('.switch-mode input[type="checkbox"]').change(function () {
        if ($(this).is(':checked')) {
          //alert('Dark mode');
          $("body").addClass("dark-mode")
          // location.reload()
        } else {
          // alert('Light mode');
          //location.reload()
          $("body").removeClass("dark-mode")

        }
      });
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
.test + .tooltip > .tooltip-inner {
  background-color: #73AD21 !important;
  color: #FFFFFF !important;
  border: 1px solid green !important;
  padding: 15px !important;
  font-size: 20px !important;
}
/* Tooltip on top */
.test + .tooltip.top > .tooltip-arrow {
  border-top: 5px solid green !important;
}
/* Tooltip on bottom */
.test + .tooltip.bottom > .tooltip-arrow {
  border-bottom: 5px solid blue !important;
}
/* Tooltip on left */
.test + .tooltip.left > .tooltip-arrow {
  border-left: 5px solid red !important;
}
/* Tooltip on right */
.test + .tooltip.right > .tooltip-arrow {
  border-right: 5px solid black !important;
}
</style>





