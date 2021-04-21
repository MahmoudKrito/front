<template>
  <div class="dashboard">
    <div :class="{rtl:current_lang === 'ar'}">
      <main class="main-wrapper">
        <DoctorSide></DoctorSide>
        <section class="content-wrapper">
          <!-- Header -->

          <!-- Content -->
          <div class="container-fluid">
            <div class="main-content">
              <div class="content-side">
                <!--  -->
                <div class="section-wrapper">
                  <div class="section-title">
                    {{ $t('new_sessions') }}
                  </div>

<!--                  <div class="alert alert-danger" v-if="message">-->
<!--                    {{ message }}-->
<!--                  </div>-->
                  <div class="doctors-block">
                    <div class="table-responsive">
                      <div class="table-responsive">
                        <table class="table">
                          <tr>
                            <th>{{$t('name')}}</th>
                            <th>{{$t('type')}}</th>
                            <th>{{$t('appointment')}}</th>
                            <th>{{$t('details')}}</th>
                          </tr>

                          <tr v-for="(session,index) in sessions" :key="session.id">
                            <td>{{ session.user.first_name }} {{ session.user.last_name }}</td>
                            <td>
                              <template v-if="session.user.user_type_id == 3">{{session.user.school}} {{ $t('school') }}
                              </template>
                              <template v-else>{{ $t('uer') }}</template>
                            </td>
                            <td>{{$t('today')}}</td>
                            <td>
                              <nuxt-link :to="localePath('/doctors/dashboard/sessions/'+session.slug)"
                                         class="fa fa-eye"></nuxt-link>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <doctorNotifications></doctorNotifications>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>

</template>

<script>
import DoctorSide from '~/layouts/DoctorSide';
import doctorNotifications from "@/components/doctorNotifications";

export default {
  head() {
    return {
      title: 'School-permission',
    };
  },
  layout: 'DoctorHeaderD',
  components: {DoctorSide, doctorNotifications},
  middleware:'doctorSuspend',
  data() {
    return {
      sessions: {},
      auth2: {},
      message: ''
    }
  },
  mounted() {
    this.getSessions();
  },
  methods: {
    getSessions() {
      this.$axios.$get('/doctors/sessions/getNewSessions')
        .then(response => {
          if (response.status == '200') {
            this.sessions = response.data;
          } else if (response.status == '500') {
            if (this.current_lang == 'en') {
              this.message = 'no sessions available'
            } else if (this.current_lang == 'ar') {
              this.message = 'لا يوجد جلسات متاحه'
            }

          }

          console.log(this.sessions);
        })
    },
  },
  computed: {
    current_lang() {
      return this.$i18n.locale
    }
  }
}
</script>

<style scoped>
*:not(a) {
  font-family: 'Montserrat', 'Cairo', serif, Arial;
}

tr {
  border-bottom: 1px #2c3e50 solid;
}

td {
  padding: 8px;
  text-align: center;
}
th {
  padding: 8px;
  text-align: center;
}

a {
  color: #285E75 !important;
  text-decoration: none !important;
  transition: all 0.5s ease-in-out !important;
}

a:hover {
  color: #2BB788 !important;
}
</style>

