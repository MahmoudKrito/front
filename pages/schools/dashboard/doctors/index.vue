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
                <!-- Doctors -->
                <div class="row">
                  <div class="col-xs-12 col-lg-6" v-for="(doctor,index) in doctors" :key="doctor.id">
                    <div class="doctor-wrapper">
                      <div class="doctor-img">
                        <img :src="doctor.avatar" alt="">
                      </div>
                      <div class="doctor-details">
                        <div class="doctor-name">
                          {{ current_lang == 'ar' ? doctor.name_ar : doctor.name_en }}
                        </div>
                        <div class="doctor-title">
                          <div v-for="(special, index) in doctor.speciality">
                            {{ current_lang == 'ar' ? special.name_ar : special.name_en }},
                          </div>
                        </div>
                      </div>
                      <nuxt-link :to="localePath('/schools/dashboard/doctors/' + doctor.id)" class="view-doctor">
                        <i class="fa fa-eye"></i>
                      </nuxt-link>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            <schoolNotifications></schoolNotifications>
            <!--  Pagination  -->

          </div>
        </div>
      </section>
    </main>
  </div>
  <!-- Content -->
  </div>
</template>


<script>
import SchoolSide from '~/layouts/SchoolSideD';
import schoolNotifications from '~/components/schoolNotifications'


export default {
  head() {
    return {
      title: 'doctors',
    };
  },
  layout: 'SchoolHeaderD',
  middleware: 'schoolSuspend',
  components: {SchoolSide, schoolNotifications},
  data() {
    return {
      doctors: {},
    }
  },
  mounted() {
    this.storage();
    this.getDoctors();
    this.getDoctors(1);
  },
  methods: {
    storage() {
      // console.log(this.school_token)
    },
    getDoctors() {
      this.$axios.$get('/school/doctors').then(response => {
        this.doctors = response.data;
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
</style>


