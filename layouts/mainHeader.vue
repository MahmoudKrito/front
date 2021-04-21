<template>
  <v-app>

    <div :class="{rtl : current_lang === 'ar'}">
      <!--preloader-->
      <preloader-app></preloader-app>

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

            <nuxt-link to="/" class="navbar-brand">
              <img :src="general_settings.logo" alt="">
            </nuxt-link>
          </div>

          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-left">
              <li class="active">
                <nuxt-link :to="localePath('/')">
                  <img src="../assets/images/icon-home.svg" alt="">
                  {{ $t('home') }}
                </nuxt-link>
              </li>
              <li>
                <nuxt-link :to="localePath('/schools')">
                  <img src="../assets/images/icon-schools.svg" alt="">
                  {{ $t('schools') }}
                </nuxt-link>
              </li>
              <li>
                <nuxt-link :to="localePath('/doctors/DoctorSearch')">
                  <img src="../assets/images/icon-doctors.svg" alt="">
                  {{ $t('doctors') }}
                </nuxt-link>
              </li>
              <li>
                <nuxt-link :to="localePath('/students')">
                  <img src="../assets/images/icon-students.svg" alt="">
                  {{ $t('students') }}
                </nuxt-link>
              </li>
              <li>
                <nuxt-link :to="localePath('/sessions')">
                  <img src="../assets/images/icon-session.svg" alt="">
                  {{ $t('sessions') }}
                </nuxt-link>
              </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">

              <form class="nav navbar-form navbar-right">
                <div class="form-group">
                  <nuxt-link :to="localePath('/login?query='+query)" class="btn btn-login" v-if="!user">
                    {{ $t('log_in') }}
                  </nuxt-link>
                </div>
                <div class="form-group">

                  <nuxt-link :to="localePath('/doctors/Register-1')" class="btn btn-login" v-if="!user && query=='doctors'">
                    {{ $t('new_account') }}
                  </nuxt-link>

                  <nuxt-link :to="localePath('/schools/Register-1')" class="btn btn-login" v-if="!user && query=='schools'">
                    {{ $t('new_account') }}
                  </nuxt-link>

                  <nuxt-link :to="localePath('/User/Register')" class="btn btn-login" v-if="!user && query==''">
                    {{ $t('new_account') }}
                  </nuxt-link>
<!--                  <nuxt-link :to="localePath('/User/Profile')" class="btn btn-login"-->
<!--                             v-if="user && user.user_type_id == 5">-->
<!--                    {{ $t('profile') }}-->
<!--                  </nuxt-link>-->

                  <!-- User -->
                    <li class="dropdown dropdown-user" v-if="user && user.user_type_id == 5">
                      <a href="#" class="dropdown-toggle btn btn-login" data-toggle="dropdown" role="button"
                         aria-haspopup="true"
                         aria-expanded="false" style="padding:1px 10px">
                                <span>
                                  <button class="btn">{{$t('profile')}}</button>
                                </span>
                        <i class="caret"></i>
                      </a>
                      <ul class="dropdown-menu">
                        <li>
                          <nuxt-link :to="localePath('/User/Profile')" @click.prevent="logout">
                            <i class="fa fa-sign-out"></i>
                            {{ $t('profile') }}
                          </nuxt-link>
                        </li>
                        <li>
                          <nuxt-link :to="localePath('/User/sessions')" @click.prevent="logout">
                            <i class="fa fa-sign-out"></i>
                            {{ $t('bookings') }}
                          </nuxt-link>
                        </li>
                        <li>
                          <a href="#" @click.prevent="logout">
                            <i class="fa fa-sign-out"></i>
                            {{ $t('logout') }}
                          </a>
                        </li>
                      </ul>
                    </li>


                  <nuxt-link :to="localePath('/students/dashboard')" class="btn btn-login"
                             v-if="user && user.user_type_id == 3">
                    {{ $t('dashboard') }}
                  </nuxt-link>

                  <nuxt-link :to="localePath('/doctors/dashboard')" class="btn btn-login"
                             v-if="user && user.user_type_id == 2">
                    {{ $t('dashboard') }}
                  </nuxt-link>

                  <nuxt-link :to="localePath('/schools/dashboard')" class="btn btn-login"
                             v-if="user && user.user_type_id == 4">
                    {{ $t('dashboard') }}
                  </nuxt-link>

<!--                  <a href="#" class="btn btn-login" @click.prevent="logout" v-if="user">-->
<!--                    {{ $t('logout') }} </a>-->
                </div>
              </form>

              <li>
                <nuxt-link :to="localePath('/articles')">{{ $t('articles') }}</nuxt-link>
              </li>
              <li>
                <nuxt-link :to="localePath('/consulting')">{{ $t('ask_doctor') }}</nuxt-link>
              </li>
<!--              <li class="lang-link">-->
<!--                <nuxt-link :to="switchLocalePath('en')" v-if="current_lang == 'ar'">English</nuxt-link>-->
<!--              </li>-->
<!--&lt;!&ndash;              <li class="lang-link">&ndash;&gt;-->
<!--&lt;!&ndash;                <nuxt-link :to="switchLocalePath('ar')" v-if="current_lang == 'en'">ar</nuxt-link>&ndash;&gt;-->
<!--&lt;!&ndash;              </li>&ndash;&gt;-->
            </ul>


          </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
      </nav>

      <nuxt/>

      <footerApp></footerApp>
      <!-- Top Section -->
    </div>

  </v-app>

</template>

<script>
import PreloaderApp from "~/components/PreloaderApp.vue";
import footerApp from '~/components/footer.vue'

export default {
  components: {
    PreloaderApp,
    footerApp
  },
  data() {
    return {
      preloader: false,
      general_settings: {},
      refresh_const: "",
      isLoaded: false,
      refresh_page: false,
      user: false,
      // current_lang : this.$i18n.locale
    }
  },

  mounted() {
    // this.storage();
    this.check_preloader();
    this.getGeneralSettings();
    this.getUser()
    this.storage()
  },
  methods: {
    getUser() {
      if (this.$auth.loggedIn) {
        this.user = this.$auth.user.user;
      }
    },
    storage() {
      if (localStorage.getItem('student_log') == 'true') {
        this.refresh_page = localStorage.getItem('student_log');
      } else if (localStorage.getItem('school_log') == 'true') {
        console.log('school')
        this.refresh_page = localStorage.getItem('school_log');
      } else if (localStorage.getItem('doctor_log') == 'true') {
        console.log('doctor')
        this.refresh_page = localStorage.getItem('doctor_log');
      }

      if (this.refresh_page == 'true') {
        console.log(this.refresh_page);
        this.refresh_page = false;
        localStorage.setItem('student_log', false)
        localStorage.setItem('school_log', false)
        localStorage.setItem('doctor_log', false)
        window.location.reload();
        this.isLoaded = true;
      }
    },
    check_preloader() {
      if (process.server) {
        this.preloader = true
      } else {
        this.preloader = false
      }
    },
    getGeneralSettings() {
      this.$axios.$get('/setting')
        .then(response => {
          this.general_settings = response.data;
        })
    },
    async logout(e) {
      await this.$auth.logout();
      location.reload()
    },
  },
  computed: {
    current_lang() {
      return this.$i18n.locale
    },
    query() {
      let path = this.$route.fullPath;
      let m = path.includes("doctors")
      let s = path.includes("schools")
      console.log(m)
      if (m) {
        return 'doctors'
      } else if (s) {
        return 'schools'
      }else{
        return ''
      }
    }
  },

}
</script>

<style scoped>

v-app {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
  background-color: #fff !important;
}
</style>
