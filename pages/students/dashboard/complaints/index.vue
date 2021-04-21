<template>
  <div class="dashboard">
    <div :class="{rtl:current_lang === 'ar'}">
      <!-- Content -->
      <main class="main-wrapper">
        <StudentSide></StudentSide>
        <section class="content-wrapper">
          <!-- Content -->
          <div class="container-fluid">
            <div class="main-content">
              <div class="content-side">
                <!--  -->
                <div class="section-wrapper section-custom">
                  <div class="complaint-sections">
                    <div class="complaint-title">
                        {{$t('all_complaints')}}
                    </div>

                    <form action="">
                      <select class="form-control" name="" v-model="selected_section"
                              @change="filterComplaints()">
                        <option value="" selected disabled>{{ $t('sections') }}</option>

                        <option :value="section.id" v-for="(section,index) in sections" :key="section.id">
                          {{ current_lang == 'en' ? section.name_en : section.name_ar  }}
                        </option>

                      </select>
                    </form>
                  </div>
                  <table class="table">
                    <thead>
                    <tr>
                      <th>{{$t('complaint_number')}}</th>
                      <th>{{ $t('date') }}</th>
                      <th>{{ $t('status') }}</th>
                    </tr>

                    </thead>
                    <tr v-for="complaint,index in complaints" :key="complaint.id">
                      <td><nuxt-link :to="localePath('/students/dashboard/complaints/' + complaint.id)">{{complaint.number }}</nuxt-link></td>
                      <td>{{ complaint.created_at | formatDateByDay }} {{complaint.created_at |formatDateByMonth}} {{ complaint.created_at | formatDateByYear }}
                      </td>
                      <td v-if="complaint.status==0">
                        <img src="https://api.promental.net/images/website/uncheck.svg"
                                                          alt=""
                                                          width="20"></td>
                      <td v-if="complaint.status==1"><img src="https://api.promental.net/images/website/check.svg" alt=""
                                                          width="20"></td>
                    </tr>
                  </table>
                  <div class="section-footer">
                    <div class="text-right">
                      <nuxt-link :to="localePath('/students/dashboard/complaint-add')"
                                 class="btn btn-complaint">
                        {{$t('add_complaint')}}
                      </nuxt-link>
                    </div>
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
import StudentSide from '../../../../layouts/StudentSideD'
import studentNotifications from "~/components/studentNotifications"

export default {
  layout: 'StudentHeaderD',
  components: {StudentSide, studentNotifications},
  head() {
    return {
      title: 'complaints',
    };
  },
  data() {
    return {
      sections: {},
      selected_section: '',
      complaints: {},
      school: {},
      user: {}
    }
  },
  mounted() {
    this.storage();
    this.getComplaints();
    this.getComplaintSections()
  },
  methods: {
    storage() {
      this.school = this.$auth.user.school;
      this.user = this.$auth.user.user;
    },
    getComplaintSections() {
      this.$axios.$get('/student/complaints/sections')
        .then(response => {
          this.sections = response.data
        })
    },
    getComplaints() {
      this.$axios.$get('/student/complaints')
        .then(response => {
          this.complaints = response.data
        })
    },
    filterComplaints() {
      this.$axios.$get('/student/complaints/' + this.selected_section + '/filterComplaints')
        .then(response => {
          this.complaints = response.data;
          console.log(this.complaints)
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

tr:first-of-type > td {
  padding-top: 30px !important;
}

td, th {
  padding: 8px !important;
  text-align: center;
}

a {
  color: #285E75 !important;
  text-decoration: none;
  transition: all 0.5s ease-in-out;
}

a:hover {
  color: #2BB788 !important;
}

.btn-complaint {
  color: #fff !important;
}

.btn-complaint:hover {
  color: #fff !important;
}
</style>
