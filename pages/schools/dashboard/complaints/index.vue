<template>
  <div class="dashboard">
    <div :class="{rtl:current_lang === 'ar'}">
      <!-- Content -->
      <main class="main-wrapper">
        <SchoolSide></SchoolSide>
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
                        <option value="" selected disabled>{{ $t('sections') }}</option>
                        <option :value="section.id" v-for="(section,index) in sections"
                                :key="section.id">{{ current_lang == 'en' ? section.name_en : section.name_ar }}
                        </option>
                      </select>
                    </form>
                  </div>
                  <div class="alert alert-danger" role="alert" v-if="message">
                    {{ message }}
                  </div>
                  <table class="table">
                    <thead>
                    <tr>
                      <th> {{ $t('complaint_number') }}</th>
                      <th>{{ $t('date') }}</th>
                      <th>{{ $t('status') }}</th>
                    </tr>

                    </thead>
                    <tr v-for="(complaint,index) in complaints" :key="complaint.id">
                      <td>
                        <nuxt-link :to="localePath('/schools/dashboard/complaints/' + complaint.id)">{{
                            complaint.number
                          }}
                        </nuxt-link>
                      </td>
                      <td>{{ complaint.created_at | formatDateByDay }} {{ complaint.created_at | formatDateByMonth }}
                        {{ complaint.created_at | formatDateByYear }}
                      </td>
                      <td v-if="complaint.status==0"><img src="https://api.promental.net/images/website/uncheck.svg"
                                                          alt=""
                                                          width="20"></td>
                      <td v-if="complaint.status==1"><img src="https://api.promental.net/images/website/check.svg"
                                                          alt=""
                                                          width="20"></td>
                    </tr>
                  </table>
                  <div class="section-footer">
                    <div class="text-right" style="float:left">
                      <nuxt-link :to="localePath('/schools/dashboard/complaint-add')"
                                 class="btn btn-complaint">
                        {{ $t('add_complaint') }}
                      </nuxt-link>

                    </div>
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
import SchoolSide from '~/layouts/SchoolSideD';
import schoolNotifications from '~/components/schoolNotifications'

export default {
  head() {
    return {
      title: 'complaints',
    };
  },
  components: {SchoolSide, schoolNotifications},
  middleware: 'schoolSuspend',
  layout: 'SchoolHeaderD',
  data() {
    return {
      complaints: {},
      sections: {},
      selected_section: '',
      message: ''
    }
  },
  mounted() {
    this.getComplaints();
    this.getComplaintSections()
  },
  methods: {
    getComplaints() {
      this.$axios.$get('/school/complaints')
        .then(response => {
          this.complaints = response.data;
          console.log(response.data)
        })
    },
    getComplaintSections() {
      this.$axios.$get('/school/complaints/sections')
        .then(response => {
          this.sections = response.data
        })
    },
    filterComplaints() {
      this.$axios.$get('/school/complaints/' + this.selected_section + '/filterComplaints')
        .then(response => {
          if (response.status == '204') {
            this.complaints = {};
            if (this.current_lang == 'en') {
              this.message = 'no complaints available'
            } else if (this.current_lang == 'ar') {
              this.message = ' لا يوجد شكاوي '
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
.main-wrapper {
  padding-top: 100px;
}

*:not(i) {
  font-family: 'Montserrat', 'Cairo', serif, Arial;
}

tr:first-of-type > td {
  padding-top: 30px !important;
}

td, th {
  padding: 8px !important;
  text-align: center;
}

.section-custom .section-footer {
  left: 80% !important;
}

a {
  text-decoration: none;
  transition: all 0.5s ease-in-out;
}

</style>


