<template>
  <div class="dashboard">
    <div :class="{rtl:current_lang === 'ar'}">
      <!-- Content -->
      <main class="main-wrapper">
        <DoctorSide></DoctorSide>
        <section class="content-wrapper">
          <!-- Content -->
          <div class="container-fluid">
            <div class="main-content">
              <div class="content-side">
                <!--  -->
                <div class="section-wrapper">
                  <div class="section-title">
                    {{ $t('sessions') }}
                  </div>
                  <div class="row">
                    <div class="col-4">
                      <input type="text" class="form-control" :placeholder="$t('search_student_or_user_name')" v-model="name">
                    </div>
                  </div>
                  <div class="doctors-block">
                    <div class="table-responsive">
                      <table class="table border-bottom">
                        <tr>
                          <th>{{$t('name')}}</th>
                          <th>{{$t('type')}}</th>
                          <th>{{$t('appointment')}}</th>
                          <th>{{$t('status')}}</th>
                        </tr>

                        <tr v-for="(session,index) in filter_sessions" :key="session.id">
                          <td>{{ session.user.first_name }} {{ session.user.last_name }}</td>
                          <td>
                            <template v-if="session.user.user_type_id == 3">{{ session.user.school }}
                              {{ $t('school') }}
                            </template>
                            <template v-else>{{ $t('user') }}</template>
                          </td>
                          <td>{{ session.start_date }}</td>
                          <td v-if="session.status == 1"><img src="https://api.promental.net/images/website/check.svg" alt=""
                                                              width="20"></td>
                          <td v-if="session.status == 0"><img src="https://api.promental.net/images/website/uncheck.svg" alt=""
                                                              width="20"></td>
                        </tr>
                      </table>
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
      title: 'sessions',
    };
  },
  middleware: 'doctorSuspend',
  layout: 'DoctorHeaderD',
  components: {DoctorSide, doctorNotifications},
  data() {
    return {
      sessions: {},
      name:'',
      isLoaded : false
    }
  },
  mounted() {
    this.getSessions()
  },
  methods: {
    getSessions() {
      this.$axios.$get('/doctors/sessions/getAllSessions')
        .then(response => {
          this.sessions = response.data;
          this.isLoaded = true
          console.log(this.sessions)
        })
    }
  },
  computed: {
    current_lang() {
      return this.$i18n.locale
    },
    filter_sessions(){
      if (this.isLoaded == true) {
        return this.sessions.filter(session => {
          return (session.user.first_name +' '+session.user.last_name).match(this.name)
        })
      }
    }
  }
}
</script>

<style scoped>
*:not(i) {
  font-family: 'Montserrat', 'Cairo', serif, Arial;
}

tr {
  text-align: center;
  vertical-align: inherit;
  border-bottom: 1px #2c3e50 solid;
}

th {
 text-align: center;
}

td {
  padding: 8px;
}
</style>
