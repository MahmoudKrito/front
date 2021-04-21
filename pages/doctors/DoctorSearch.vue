<template>
  <div>
    <!-- Page Banner -->
    <section class="page-banner doctors-banner">
      <div class="container">
        <div class="page-banner-title">
          <img src="https://api.promental.net/images/website/doctors-white.png" alt="" v-if="current_lang=='ar'">
          <img src="https://api.promental.net/images/website/doctors-white_en.png" alt="" v-if="current_lang=='en'">
        </div>
      </div>
    </section>
    <!-- Doctors -->
    <section class="container">
      <form action="" class="filter-form">
        <div class="row">
          <div class="col-xs-12 col-sm-4 col-md-5">
            <div class="form-group">
<!--              <select v-model="selected_doctor" id="doctorName" class="form-control"-->
<!--                      @change="searchDoctorName()">-->
<!--                <option value="" selected> {{ $t('doctor_name') }}</option>-->
<!--                <option :value="doctor.first_name" v-for="(doctor,index) in doctors" :key="doctor.id">-->
<!--                  {{ doctor.first_name }}-->
<!--                </option>-->
<!--              </select>-->
              <input type="text" class="form-control" v-model="doctor_name">
            </div>
          </div>

          <div class="col-xs-12 col-sm-4 col-md-5">
            <div class="form-group">
              <select v-model="selected_speciality" class="form-control"
                      @change="searchDoctorSpeciality()">
                <option value="" selected> {{ $t('specialities') }}</option>
                <option :value="speciality.id" v-for="(speciality,index) in specialities"
                        :key="speciality.id">
                  {{ current_lang == 'en' ? speciality.name_en : speciality.name_ar }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-xs-12 col-sm-4 col-md-2">
<!--            <div class="form-group">-->
<!--              <button type="submit" class="btn btn-filter form-control"-->
<!--                      v-text="current_lang == 'en' ? 'search' : 'بحث'">-->
<!--              </button>-->
<!--            </div>-->
          </div>
        </div>
      </form>

      <div class="alert alert-danger" role="alert" v-if="message">
        {{ message }}
      </div>

      <div class="row">
        <div class="wow slideInUp col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="(doctor,index) in filterDoctors">
          <div class="doctor-filter">
            <div class="doctor-img">
              <img :src="doctor.avatar" alt="">
            </div>
            <div class="doctor-details">
              <div class="doctor-info">
                <div class="doctor-name">
                  {{ current_lang == 'ar' ? doctor.type.name_ar : doctor.type.name_en }}. {{ current_lang == 'ar' ? doctor.name_ar : doctor.name_en  }}
                </div>
                <div class="doctor-title">
                  <template v-for="(speciality,index) in doctor.speciality">{{ current_lang == 'ar' ? speciality.name_ar : speciality.name_en }} ,</template>
                </div>
              </div>
              <div class="doctor-actions">
                <div class="doctor-rating">
                  <i class="fa fa-star" :class="doctor.rating >= 1 ? 'active' : ''"></i>
                  <i class="fa fa-star" :class="doctor.rating >= 2 ? 'active' : ''"></i>
                  <i class="fa fa-star" :class="doctor.rating >= 3 ? 'active' : ''"></i>
                  <i class="fa fa-star" :class="doctor.rating >= 4 ? 'active' : ''"></i>
                  <i class="fa fa-star" :class="doctor.rating == 5 ? 'active' : ''"></i>
                </div>
                <div class="doctor-price">
                  {{ doctor.account.other_session_price}} {{$t('l_e')}}
                </div>
                <nuxt-link :to="localePath('/doctors/'+doctor.slug)" href="" class="btn btn-main"
                           @click="getSingleDoctor($event,doctor.slug)"
                           v-text="current_lang == 'en' ? 'book now' : 'احجز الان'"></nuxt-link>
              </div>
            </div>

          </div>
        </div>

      </div>

      <!--&lt;!&ndash;  Pagination  &ndash;&gt;-->
      <nav aria-label="Page navigation" class="text-center center-block">
        <ul class="pagination">
          <li :class="prev ? 'disabled' : ''">
            <a href="" aria-label="Previous" @click="prevStep">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          <li :class="current_page == c ? 'active' : ''" v-for="c in count"><a href="" @click.prevent="getDoctors(c)">{{
              c
            }}</a></li>
          <li :class="next ? 'disabled' : ''">
            <a href="" aria-label="Next" @click="nextStep">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
      <!--      <pagination-->
      <!--        :meta_data="meta_data"-->
      <!--        v-on:next="getDoctors()">-->
      <!--      </pagination>-->

    </section>
  </div>
</template>

<script>
// import Pagination from '../../components/Pagination';

if (process.browser) {
  var {WOW} = require('wowjs')
}

export default {
  layout: 'mainHeader',
  head() {
    return {
      title: 'DoctorSearch',
    };
  },
  components: {},
  data() {
    return {
      doctors: {},
      specialities: {},
      selected_speciality: '',
      selected_doctor: '',
      message: '',
      general_settings: {},
      doctor_id: '',
      last_page: '',
      count: [],
      stepIndex: '',
      next: false,
      prev: false,
      current_page: '',
      doctor_name:'',
      isLoaded: false
    }
  },
  mounted() {
    this.getDoctors(1);
    this.getSpecialities();
    this.getGeneralSettings();
    if (process.browser) {
      new WOW({
        live: true,
        offset: 10
      }).init()
    }
  },
  methods: {
    nextStep(e) {
      e.preventDefault();
      if (this.stepIndex < this.count.length) {
        this.stepIndex++;
        this.getDoctors(this.stepIndex)
      }
      if (this.stepIndex == this.count.length) {
        this.next = true
      }
    },
    prevStep(e) {
      e.preventDefault();
      if (this.stepIndex > 1) {
        this.stepIndex--;
        this.getDoctors(this.stepIndex)
      }
      if (this.stepIndex == 1) {
        this.prev = true
      }
    },
    getDoctors(page) {
      this.stepIndex = page;
      this.$axios.$get('website/doctors?page=' + page)
        .then(response => {
          this.isLoaded = true;
          this.doctors = response.data.data;
          this.last_page = response.data.pagination.last_page;
          this.current_page = response.data.pagination.current_page;
          // localStorage.setItem('count',response.data.data.pagination.last_page)
          if (this.count.length == 0) {
            for (var i = 1; i <= this.last_page; i++) {
              this.count.push(i)
            }
          }
        })
    },
    getSpecialities() {
      this.$axios.$get('website/specialities')
        .then(response => {
          this.specialities = response.data
        })
    },
    searchDoctorName() {
      this.$axios.$post('website/doctors/search/doctorName', {
        name: this.selected_doctor
      }, {crossdomain: true})
        .then(response => {
          if (response.status == '200') {
            this.doctors = response.data
            console.log(response.data)
          } else if (response.status = '204') {
            this.doctors = {};
            this.message = response.message;
          }
        })
    },
    searchDoctorSpeciality() {
      this.$axios.$post('website/doctors/search/doctorSpeciality', {
        speciality: this.selected_speciality
      }, {crossdomain: true})
        .then(response => {
          if (response.status == '200') {
            this.doctors = response.data;
            this.doctor = {};
          } else if (response.status == '204') {
            this.doctors = {};
            this.doctor = {};
            this.message = response.message;
          }
        })
    },
    getGeneralSettings() {
      this.$axios.$get('setting')
        .then(response => {
          this.general_settings = response.data;
        })
    },
  },
  computed: {
    current_lang() {
      return this.$i18n.locale
    },
    filterDoctors(){
      if (this.isLoaded == true) {
        return this.doctors.filter(doctor => {
          return (doctor.first_name || doctor.first_name_en +' '+doctor.last_name || doctor.last_name_en ).match(this.doctor_name)
        })
      }
    }
  },
}
</script>

<style scoped>
.doctors-banner {
  margin-top: 70px;
}

</style>
