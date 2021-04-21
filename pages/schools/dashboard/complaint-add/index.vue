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
                  <form action="">
                    <div class="alert alert-danger" v-if="formErrors.length > 0">
                      <p v-for="error,index in formErrors">{{ error }}</p>
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
                                  :key="section.id">{{ current_lang == 'en' ? section.name_en : section.name_ar }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </form>
                  <div class="form-group">
                                <textarea class="form-control" name="" rows="10" v-model="body"
                                          :placeholder="current_lang == 'en' ? 'Leave your text here...' : 'اترك رسالتك هنا...'"></textarea>
                  </div>

                  <div class="section-footer">
                    <div class="text-right">
                      <a href="" @click.prevent="addComplaint" class="btn btn-primary">
                        {{$t('add')}}
                      </a>
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
import SchoolSide from '~/layouts/SchoolSideD'
import schoolNotifications from '~/components/schoolNotifications'

export default {
  head() {
    return {
      title: 'complaints',
    };
  },
  middleware: 'schoolSuspend',
  layout: 'SchoolHeaderD',
  components: {SchoolSide, schoolNotifications},
  data() {
    return {
      sections: {},
      formErrors: [],
      auth2: {},
      complaint: {},
      section_id: '',
      body: ''
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
          this.formErrors.push(' قسم الشكوي مطلوب')
        }

      }
      if (!this.body) {
        if (this.current_lang == 'en') {
          this.formErrors.push('body is required')
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('محتوي الشكوي مطلوب')
        }

      }
      if (this.formErrors.length == 0) {
        this.$axios.$post('/school/complaints/store', {
          complaint_section_id: this.section_id,
          body: this.body,
          user_id: this.$auth.user.user.id
        })
          .then(response => {
            this.complaint = response.data;
            this.$router.push(this.localePath('/schools/dashboard/complaint-add/' + response.data.number))

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
.main-wrapper{
  padding-top:100px;
}

*:not(i) {

  font-family: 'Montserrat', 'Cairo', serif, Arial;
}

.btn {
  text-align: center !important;
  float: right !important;
}

</style>
