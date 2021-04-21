<template>
  <v-app>
    <div :class="{rtl:current_lang === 'ar'}">
      <nav class="navbar navbar-fixed-top">
        <div class="container">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <nuxt-link to="/" class="navbar-brand">
              <img :src="general_settings.logo" alt="">
            </nuxt-link>
          </div>
          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav visible-xs">
              <li>
                <div class="user-wrapper">
                  <div class="user-img">
                    <img src="~/assets/images/Group1699.svg" alt="">
                  </div>
                  <div class="user-details">
                    <div class="user-name">{{ user.first_name }}</div>
                    <div class="user-phone">{{ user.phone }}</div>
                    <div class="user-email">{{ user.email }}</div>
                  </div>
                </div>
              </li>
            </ul>
            <ul class="nav navbar-nav navbar-left">
              <li>
                <nuxt-link :to="localePath('/')" class="navbar-brand">
                  <img :src="general_settings.logo" alt="">
                </nuxt-link>
              </li>
              <li class="active">
                <nuxt-link :to="localePath('/User/sessions')">
                  {{ $t('bookings') }}
                </nuxt-link>
              </li>
              <li>
                <nuxt-link :to="localePath('/User/Profile')">
                  {{ $t('profile') }}
                </nuxt-link>
              </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li class="lang-link">
                <nuxt-link :to="switchLocalePath('en')" v-if="current_lang == 'ar'">English</nuxt-link>
              </li>
              <li class="lang-link">
                <nuxt-link :to="switchLocalePath('ar')" v-if="current_lang == 'en'">Ar</nuxt-link>
              </li>

            </ul>
            <form class="nav navbar-form navbar-right">
              <div class="form-group">
                <a href="#" class="btn btn-login" @click.prevent="logout">{{ $t('logout') }}</a>
              </div>
            </form>
          </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
      </nav>

      <nuxt/>

      <footer-app></footer-app>

    </div>
  </v-app>
</template>

<script>
import footerApp from '~/components/footer.vue'

export default {
  data() {
    return {
      user: false,
      general_settings: {}
    }
  },
  components: {footerApp},
  mounted() {
    // console.log(this.$auth.user);
    this.storage();
    this.getGeneralSettings();
  },
  methods: {
    storage() {
      if (this.$auth.loggedIn) {
        this.user = this.$auth.user.user;
      }
    },
    async logout(e) {
      await this.$auth.logout();
      e.preventDefault();
      this.$router.push('/')
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
    }
  },

}
</script>
