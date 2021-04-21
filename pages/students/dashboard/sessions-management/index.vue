<template>
  <div class="dashboard">
    <div :clas="{rtl:current_lang === 'ar'}">
      <main class="main-wrapper">
        <StudentSide></StudentSide>
        <section class="content-wrapper">
          <!-- Content -->
          <div class="container-fluid">
            <div class="main-content">
              <div class="content-side">

                <div class="section-wrapper">
                  <div class="table-responsive" style="margin-top: 30px;">
                    <table class="table  table-bordered text-center">
                      <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col"> {{ $t('type') }}</th>
                        <th scope="col">{{ $t('add_doctor') }}</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(session,index) in sessions">
                        <th scope="row">{{ ++index }}</th>
                        <td>{{ current_lang === 'en' ? session.package.name_en : session.package.name_ar }}</td>
                        <td>
                          <nuxt-link class="btn btn-main" :to="localePath('/students/dashboard/sessions-management/' + session.id)"
                                  v-if="!session.appointment_id"> {{ $t('add_doctor') }}
                          </nuxt-link>

                          <p v-else-if="session.appointment_id && session.status_id == 1">
                            {{ session.start_date }} {{ current_lang === 'en' ? session.doctor.name_en: session.doctor.name_ar}}
                            <nuxt-link :to="localePath('/students/dashboard/sessions-management/'+session.id+'/edit')"
                                       href="#" class="btn btn-link">
                              {{ $t('edit') }}
                            </nuxt-link>
                          </p>

                          <p v-else-if="session.appointment_id">
                            {{ session.start_date }} {{ current_lang === 'en' ? session.doctor.name_en: session.doctor.name_ar}}
                          </p>

                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <studentNotifications></studentNotifications>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
import StudentSide from '~/layouts/StudentSideD';
import studentNotifications from '~/components/studentNotifications';

export default {
  layout: 'StudentHeaderD',
  components: {StudentSide, studentNotifications},
  data() {
    return {
      sessions: {},
    }
  },
  mounted() {
    this.getStudentSessions();
  },
  methods: {
    getStudentSessions() {
      this.$axios.get('/student/sessions-management')
        .then(response => {
          this.sessions = response.data.data
          console.log('sessions',this.sessions);
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

<style scoped>
.main-wrapper{
  padding-top:100px;
}
</style>
