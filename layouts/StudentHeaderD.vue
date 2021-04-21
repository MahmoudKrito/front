<template>
<!--  <v-app>-->
    <div class="dashboard">
      <div :class="{rtl:current_lang === 'ar'}">
        <section class="content-wrapper">
          <nav :class="{rtl:current_lang === 'ar'}" class="navbar navbar-fixed-top" >
            <div class="container-fluid">
              <!-- Brand and toggle get grouped for better mobile display -->
              <div class="navbar-header">
                <a href="#" class="toggle-menu visible-xs">
                  <img src="https://api.promental.net/images/website/icon-menu.svg" alt="">
                </a>
                <nuxt-link class="navbar-brand" :to="localePath('/students/dashboard')">
                  <img src="https://api.promental.net/images/website/logo.svg" alt="">
                </nuxt-link>
              </div>

              <!-- Collect the nav links, forms, and other content for toggling -->
              <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                  <!-- Notification -->
<!--                  <li class="dropdown dropdown-notifications">-->
<!--                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"-->
<!--                       aria-haspopup="true"-->
<!--                       aria-expanded="true">-->
<!--                      <img src="https://api.promental.net/images/website/notifications.svg" alt="">-->
<!--                      <div class="badge">{{ notifications.length }}</div>-->
<!--                    </a>-->
<!--                    <ul class="dropdown-menu">-->
<!--                      <template v-for="(notification,index) in notifications">-->
<!--                        <li>-->
<!--                          <a href="">-->
<!--                            <div class="notification">-->
<!--                              <div class="notification-details">-->
<!--                                {{ notification.body }}-->
<!--                              </div>-->
<!--                              <div class="notification-time">{{-->
<!--                                  notification.created_at |-->
<!--                                    formatDateByDay-->
<!--                                }} {{-->
<!--                                  notification.created_at |-->
<!--                                    formatDateByMonth-->
<!--                                }}-->
<!--                                {{ notification.created_at | formatDateByYear }}-->
<!--                              </div>-->
<!--                            </div>-->
<!--                          </a>-->
<!--                        </li>-->
<!--                        <li role="separator" class="divider"></li>-->
<!--                      </template>-->
<!--                      <li v-if="notifications.length == 0">-->
<!--                        <a href="">-->
<!--                          <div class="notification">-->
<!--                            <div class="notification-details">-->
<!--                              <p>no notifications available</p>-->
<!--                            </div>-->
<!--                          </div>-->
<!--                        </a>-->
<!--                      </li>-->
<!--                      <li class="see-all"><a href="notifications.html" class=" btn btn-primary">See-->
<!--                        All</a>-->
<!--                      </li>-->
<!--                    </ul>-->
<!--                  </li>-->
                  <!-- User -->
                  <li class="dropdown dropdown-user">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                       aria-haspopup="true"
                       aria-expanded="false">
                                <span>
                                    <img src="https://api.promental.net/images/website/doctor.png" alt="">
                                </span>
                      <i class="caret"></i>
                    </a>
                    <ul class="dropdown-menu">
                      <li role="separator" class="divider"></li>
                      <li>
                        <a href="#" @click.prevent="logout">
                          <i class="fa fa-sign-out"></i>
                          {{ $t('logout') }}
                        </a>
                      </li>
                    </ul>
                  </li>
                  <!-- Logo -->
                  <li class="logo-img">
                    <img src="https://api.promental.net/images/website/students.svg" alt="">
                  </li>
                </ul>

                <form class="navbar-form navbar-right">
                  <label class="switch-mode">
                    <input type="checkbox" @click="changeMode()">
                    <span class="slider round"></span>
                  </label>
                  <div class="form-group search-group">
                    <div class="input-group">
                      <input type="text" class="form-control" :placeholder="$t('search')">
                      <span class="input-group-addon">
                                    <i class="fa fa-search"></i>
                                </span>
                    </div>
                  </div>
                </form>

              </div><!-- /.navbar-collapse -->
            </div><!-- /.container-fluid -->
          </nav>

          <nuxt/>
        </section>
      </div>

    </div>
<!--  </v-app>-->
</template>

<script>
import $ from "jquery";

export default {
  middleware: 'student',
  head() {
    return {};
  },
  name: 'Header',
  data() {
    return {
      notifications: {}
    }
  },
  created() {
    this.getMode();
  },
  mounted() {
    this.getNotifications();
  },
  methods: {
    getMode() {
      if (process.client) {
        if (localStorage.getItem('mode') == 'dark') {
          $("body").addClass("dark-mode")
          $('.switch-mode input[type="checkbox"]').attr("checked", "checked")
        } else {
          $('.switch-mode input[type="checkbox"]').removeAttr("checked", "checked")
          $("body").removeClass("dark-mode")
        }
      }
    },
    getNotifications() {
      this.$axios.$get('/school/notifications')
        .then(response => {
          this.notifications = response.data;
        })
    },
    changeMode() {
      $('.switch-mode input[type="checkbox"]').change(function () {
        if ($(this).is(':checked')) {
          // alert('Dark mode');
          $("body").addClass("dark-mode")
          if (process.client) {
            localStorage.setItem('mode', 'dark')
          }
        } else {
          if (process.client) {
            localStorage.setItem('mode', '');
          }
          // alert('Light mode');
          $("body").removeClass("dark-mode")

        }
      });
    },
    async logout(e) {
      await this.$auth.logout();
      e.preventDefault();
      localStorage.setItem('student_log', true);
      this.$router.push(this.localePath('/'));

    },
  },
  computed: {
    current_lang() {
      return this.$i18n.locale
    }
  }
}
</script>


