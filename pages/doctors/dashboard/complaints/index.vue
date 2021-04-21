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
                <div class="section-wrapper section-custom section-custom-2">
                  <div class="complaint-sections">
                    <div class="complaint-title">
                      {{ $t('all_complaints') }}
                    </div>

                    <form action="">
                      <select class="form-control" name="" v-model="selected_section"
                              @change="filterComplaints()">
                        <option value="" selected disabled>
                          {{ $t('sections') }}
                        </option>
                        <option :value="section.id" v-for="(section,index) in sections" :key="section.id">
                          {{ current_lang == 'ar' ? section.name_ar : section.name_en }}
                        </option>
                      </select>
                    </form>
                  </div>
                  <div class="alert alert-danger" role="alert" v-if="message">
                    {{ message }}
                  </div>
                  <table class="table" v-if="complaints.length > 0">
                    <thead>
                    <tr>
                      <th> {{ $t('complaint_number') }}</th>
                      <th>{{ $t('date') }}</th>
                      <th>{{ $t('status') }}</th>
                    </tr>

                    </thead>
                    <tr v-for="(complaint,index) in complaints" :key="complaint.id">
                      <td>
                        <nuxt-link :to="localePath('/doctors/dashboard/complaints/'+complaint.id)">
                          {{ complaint.number }}
                        </nuxt-link>
                      </td>
                      <td>{{ complaint.created_at | formatDateByDay }} {{ complaint.created_at | formatDateByMonth }}
                        {{ complaint.created_at | formatDateByYear }}
                      </td>
                      <td v-if="complaint.status == 1"><img src="https://api.promental.net/images/website/check.svg"
                                                            alt=""
                                                            width="20"></td>
                      <td v-if="complaint.status == 0"><img src="https://api.promental.net/images/website/uncheck.svg"
                                                            alt="" width="20"></td>
                    </tr>
                  </table>
                  <div class="section-footer">
                    <div class="text-right">
                      <nuxt-link :to="localePath('/doctors/dashboard/complaint-add')"
                                 class="btn btn-complaint">
                        {{ $t('add_complaint') }}

                      </nuxt-link>
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
      title: 'complaints',
    };
  },
  layout: 'DoctorHeaderD',
  components: {DoctorSide, doctorNotifications},
  middleware: 'doctorSuspend',
  data() {
    return {
      sections: {},
      complaints: {},
      message: '',
      selected_section: ''
    }
  },
  mounted() {
    this.getComplaintSections();
    this.getComplaints();
  },
  methods: {
    getComplaintSections() {
      this.$axios.$get('/doctors/complaint/getSections')
        .then(response => {
          this.sections = response.data
        })
    },
    getComplaints() {
      this.$axios.$get('/doctors/complaint/getComplaints')
        .then(response => {
          if (response.status == '200') {
            this.complaints = response.data;
            console.log(this.complaints)
          } else if (response.status == '204') {
            this.message = response.message
          }

        })
    },
    filterComplaints() {
      this.$axios.$get('/doctors/complaint/' + this.selected_section + '/filterComplaints')
        .then(response => {
          if (response.status == '204') {
            this.complaints = {}
            if (this.current_lang == 'en') {
              this.message = 'no complaints available'
            } else if (this.current_lang == 'ar') {
              this.message = 'لا يوجد شكاوي متاحه'
            }
          } else if (response.status == '200') {
            this.complaints = response.data
          }
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
*:not(i) {
  font-family: 'Montserrat', 'Cairo', serif, Arial;
}

tr:first-of-type > td {
  padding-top: 30px !important;
}

td, th {
  padding: 8px !important;
  text-align: center !important;
}

a {
  text-decoration: none;
  transition: all 0.5s ease-in-out;
}

</style>

