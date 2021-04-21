<template>

  <div :class="{rtl: current_lang === 'ar'}">
    <!-- Header -->
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
          <nuxt-link :to="localePath('/')" class="navbar-brand">
            <img :src="general_settings.logo" alt="">
          </nuxt-link>

        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav navbar-left">
            <li>
              <nuxt-link :to="localePath('/')">
                <img src="../assets/images/icon-home.svg" alt="">
                {{ $t('home') }}
              </nuxt-link>
            </li>
            <li class="active">
              <nuxt-link :to="localePath('/students')">
                <img src="../assets/images/icon-students.svg" alt="">
                {{ $t('students') }}
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
              <nuxt-link :to="localePath('/Login')" v-if="!user" class="btn btn-login">
                {{ $t('login') }}
              </nuxt-link>
              <a href="" class="btn btn-login" v-if="user" @click.prevent="logout">{{ $t('logout') }}</a>
            </div>
          </form>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>

    <nuxt/>

    <footer-app></footer-app>

  </div>

</template>

<script>
import footerApp from '~/components/footer.vue'

export default {
  name: 'StudentHeader',
  data() {
    return {
      general_settings: {},
      user: false
    }
  },
  components: {footerApp},
  mounted() {
    this.storage();
    this.getGeneralSettings()
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
    }
  },
  computed: {
    current_lang() {
      return this.$i18n.locale
    }
  },
}
</script>

