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
                <div class="alert alert-danger" role="alert" v-if="formErrors.length>0">
                  <p v-for="error,index in formErrors">{{ error }}</p>
                </div>
                <!--  -->
                <div class="section-wrapper section-custom">
                  <form action="">
                    <div class="complaint-sections">
                      <div class="complaint-title">
                        <img src="https://api.promental.net/images/website/icon-complaint.svg" alt="">
                        {{ $t('complaint') }}
                      </div>
                      <div class="form-group">
                        <select class="form-control" name="" v-model="complaint_section_id">
                          <option value="" selected disabled>{{ $t('sections') }}
                          </option>

                          <option :value="section.id" v-for="section,index in sections"
                                  :key="section.id">{{ current_lang == 'ar' ? section.name_ar : section.name_en }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </form>
                  <div class="form-group">
                                <textarea class="form-control" name="" rows="10"
                                          :placeholder="$t('leave_your_text_here')"
                                          v-model="body"></textarea>
                  </div>

                  <div class="section-footer">
                    <div class="text-right">
                      <button class="btn btn-primary" @click="validateForm" style="color: #ffffff !important;">
                        {{ $t('add') }}
                      </button>
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
import StudentSide from '~/layouts/StudentSideD';
import studentNotifications from "~/components/studentNotifications"

export default {
  layout: 'StudentHeaderD',
  components: {StudentSide, studentNotifications},
  head() {
    return {
      title: 'single-complaint',
    };
  },
  data() {
    return {
      sections: {},
      formErrors: [],
      complaint_section_id: '',
      body: '',
      user: this.$auth.user.user,
      school: this.$auth.user.school
    }
  },
  mounted() {
    this.getComplaintSections();
  },
  methods: {
    getComplaintSections() {
      this.$axios.$get('/student/complaints/sections')
        .then(response => {
          this.sections = response.data;
          console.log(response.data)
        })
    },
    validateForm(e) {
      this.formErrors = [];
      if (!this.complaint_section_id) {
        if (this.current_lang == 'en') {
          this.formErrors.push('choose section');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('اختار قسم ');
        }

      }
      if (!this.body) {
        if (this.current_lang == 'en') {
          this.formErrors.push('enter complaint body');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('ادخل محتوي الشكوي');
        }
      }
      if (this.formErrors.length == 0) {
        this.addComplaint()
      }
      e.preventDefault();
    },
    addComplaint() {
      this.$axios.$post('/student/complaints/store', {
        user_id: this.user.id,
        title: 'شكوي طالب',
        body: this.body,
        complaint_section_id: this.complaint_section_id
      })
        .then(response => {
          this.$router.push(this.localePath('/students/dashboard/complaint-add/' + response.data.number))
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

