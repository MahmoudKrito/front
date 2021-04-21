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
                  <form action="">
                    <div class="alert alert-danger" v-if="formErrors.length > 0">
                      <p v-for="(error,index) in formErrors">{{ error }}</p>
                    </div>
                    <div class="complaint-sections">
                      <div class="complaint-title">
                        <img src="https://api.promental.net/images/website/icon-complaint.svg" alt="">
                        {{ $t('complaint') }}
                      </div>

                      <div class="form-group">
                        <select class="form-control" name="" v-model="section_id">
                          <option value="" selected disabled>{{ $t('sections') }}</option>
                          <option :value="section.id" v-for="(section,index) in sections"
                                  :key="section.id">
                            {{current_lang == 'ar' ? section.name_ar : section.name_en}}
                          </option>
                        </select>
                      </div>
                    </div>
                  </form>
                  <div class="form-group">
                                <textarea class="form-control" name="" rows="10"
                                          :placeholder="$t('leave_your_text_here')" v-model="body"></textarea>
                  </div>

                  <div class="section-footer">
                    <div class="text-right">
                      <a href="" class="btn btn-primary" @click.prevent="addComplaint">{{ $t('add') }}</a>
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
      title: 'complaint-add',
    };
  },
  layout: 'DoctorHeaderD',
  components: {DoctorSide, doctorNotifications},
  middleware: 'doctorSuspend',
  data() {
    return {
      auth2: {},
      sections: {},
      section_id: '',
      body: '',
      complaint: {},
      formErrors: []
    }
  },
  mounted() {
    this.getComplaintSections();
  },
  methods: {
    getComplaintSections() {
      this.$axios.$get('/doctors/complaint/getSections')
        .then(response => {
          this.sections = response.data
        })
    },
    addComplaint(e) {
      this.formErrors = [];
      if (!this.section_id) {
        if (this.current_lang == 'en') {
          this.formErrors.push('complaint section required')
        } else if (this.current_lang == 'ar') {
          this.formErrors.push(' اضف قسم الشكوي ')
        }

      }
      if (!this.body) {
        if (this.current_lang == 'en') {
          this.formErrors.push('body is required')
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('ادخل الشكوي')
        }

      }
      if (this.formErrors.length == 0) {
        this.$axios.$post('/doctors/complaint/addComplaint', {
          complaint_section_id: this.section_id,
          body: this.body,
        })
          .then(response => {
            this.complaint = response.data;
            this.$router.push(this.localePath('/doctors/dashboard/complaint-add/' + response.data.number))

          })
      }
      e.preventDefault();
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

.btn {
  text-align: center !important;
  float: right !important;
}

</style>
