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
                <!--  -->
                <div class="section-wrapper">
                  <div class="section-title">
                    {{ $t('sessions') }}
                  </div>

                  <div class="alert alert-danger" role="alert" v-if="message">
                    {{ message }}
                  </div>
                  <table class="table">
                    <tr>
                      <th></th>
                      <th>{{$t('date')}}</th>
                      <th>{{$t('doctor')}}</th>
                      <th>{{$t('details')}}</th>
                    </tr>
                    <tr v-for="(session,index) in sessions" :key="session.id">
                      <td>{{ ++index }}</td>
                      <td>{{ session.date }}</td>
                      <td>{{ current_lang == 'en' ? session.doctor.type.name_en : session.doctor.type.name_ar }}.{{ current_lang == 'ar' ? session.doctor.name_ar : session.doctor.name_en }}</td>
                      <td>
                        <nuxt-link :to="localePath('/students/dashboard/sessions/'+ session.slug)"><i
                          class="fa fa-eye"></i></nuxt-link>
                      </td>
                    </tr>
                  </table>
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
  head() {
    return {
      title: 'Sessions',
    };
  },
  components: {StudentSide, studentNotifications},
  data() {
    return {
      sessions: {},
      message: '',
      school: this.$auth.user.school
    }
  },
  mounted() {
    this.getSessions()
  },
  methods: {
    getSessions() {
      this.$axios.$get('/student/sessions')
        .then(response => {
          if (response.status == 200) {
            this.sessions = response.data
          } else if (response.status == '204') {
            this.message = 'no associated sessions'
          }
          console.log(this.sessions)

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

*:not(i) {
  font-family: 'Montserrat', 'Cairo', serif, Arial;
}

td ,th {
  padding: 8px;
  text-align: center;
}

a {
  color: #285E75;
}

a:hover {
  color: #2BB788;
  transition: all 0.5s ease-in-out;
}
</style>


