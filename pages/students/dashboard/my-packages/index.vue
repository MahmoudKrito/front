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
                    <table class="table  table-bordered text-center" v-for="my_package in my_packages">
                      <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col"> {{ $t('sessions_number') }}</th>
                        <th scope="col">{{ $t('price') }}</th>
                        <th scope="col">{{ $t('date') }}</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="pac in my_package.student_packages">
                        <th scope="row">#</th>
                        <td>{{ pac.sessions_number }}</td>
                        <td>{{ pac.session_price }}</td>
                        <td>{{ pac.created_at | formatDateByDay }} {{ pac.created_at | formatDateByMonth }}
                          {{ pac.created_at | formatDateByYear }}
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
      my_packages: {},
    }
  },
  mounted() {
    this.getPackages()
  },
  methods: {
    getPackages() {
      this.$axios.get('student/my-packages')
        .then(response => {
          this.my_packages = response.data.data
          console.log(response)
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
