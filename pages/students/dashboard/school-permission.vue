<template>
  <div class="dashboard">
    <div :class="{rtl:current_lang === 'ar'}">
      <main class="main-wrapper">
        <Side></Side>
        <section class="content-wrapper">
          <!-- Header -->
          <Header></Header>
          <!-- Content -->
          <div class="container-fluid">
            <div class="main-content">
              <div class="content-side">
                <!--  -->
                <div class="section-wrapper section-custom">
                  <div class="row">
                    <div class="col-xs-12 col-lg-10 col-lg-push-1">
                      <div class="school-permission">
                                    <span>
                                      {{ $t('school_needs_to_view_your_reports_and_your_medical_history') }}
                                    </span>

                        <button class="btn btn-success">{{ $t('accept') }}</button>
                        <button class="btn btn-danger">{{ $t('decline') }}</button>
                      </div>
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
import Side from "../../../layouts/StudentSideD"
import Header from '../../../layouts/StudentHeaderD'
import studentNotifications from "~/components/studentNotifications"

export default {
  layout: 'StudentHeaderD',
  components: {Side, Header, studentNotifications},
  head() {
    return {
      title: 'School-permission',
    };
  },
  data() {
    return {
      user: this.$auth.user ? this.$auth.user.user : null,
      school: this.$auth.user ? this.$auth.user.school : null
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


