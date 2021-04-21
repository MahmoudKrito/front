<template>
  <div class="dashboard">
    <div :class="{rtl:current_lang === 'ar'}">
      <main class="main-wrapper">
        <SchoolSide></SchoolSide>
        <section class="content-wrapper">
          <!-- Content -->
          <div class="container-fluid">
            <div class="main-content">
              <div class="content-side">
                <!--  -->
                <div class="section-wrapper section-custom section-custom-2">
                  <div class="table-responsive" style="margin-top: 30px;">
                    <table class="table  table-bordered text-center">
                      <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col"> {{ $t('name') }}</th>
                        <th scope="col"> {{ $t('sessions_number') }}</th>
                        <th scope="col"> {{ $t('students_number') }}</th>
                        <th scope="col"> {{ $t('total_price') }}</th>
                        <th scope="col">{{ $t('edit') }}</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(school_package,index) in school_packages">
                        <th scope="row">{{ ++index }}</th>
                        <td>
                          {{ current_lang == 'ar' ? school_package.package.name_ar : school_package.package.name_en }}
                        </td>
                        <td>{{ school_package.package.total_sessions }}</td>
                        <td> {{ school_package.student_count }}</td>
                        <td>{{ school_package.package.price * school_package.package.total_sessions }}</td>
                        <td>
                          <nuxt-link :to="localePath('/schools/dashboard/packages/'+school_package.id)"
                                     class="student-edit"><i class="fa fa-gear"></i></nuxt-link>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <schoolNotifications></schoolNotifications>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>
<script>
import SchoolSide from "@/layouts/SchoolSideD";
import schoolNotifications from "@/components/schoolNotifications";

export default {
  head() {
    return {
      title: 'packages',
    };
  },
  layout: 'SchoolHeaderD',
  middleware: 'schoolSuspend',
  components: {SchoolSide, schoolNotifications},
  data() {
    return {
      school_packages: {}
    }
  },
  mounted() {
    this.getPackages()
  },
  methods: {
    getPackages() {
      this.$axios.get('/school/schoolPackages')
        .then(response => {
          this.school_packages = response.data.data
          console.log(this.school_packages);
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
.student-profile {
  text-align: center !important;
}
</style>

