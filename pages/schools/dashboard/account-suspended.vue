<template>
  <div class="dashboard">
    <div :clas="{rtl:current_lang === 'ar'}">
      <!-- Content -->
      <main class="main-wrapper">
        <SchoolSideD></SchoolSideD>

        <section class="content-wrapper">
          <!-- Content -->
          <div class="container-fluid">
            <div class="main-content">
              <div class="content-side">
                <!--  -->
                <div class="section-wrapper section-custom">
                  <div class="account-suspended" v-if="user.is_suspended == 0 || school_payment_suspend_status == 0">
                    <img src="https://api.promental.net/images/website/account-suspended.svg" alt="">
                    {{ $t('this_account_has_been') }}
                    <div>
                      {{ $t('suspended') }}
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>

</template>


<script>
import SchoolSideD from '~/layouts/SchoolSideD';

export default {
  layout: 'SchoolHeaderD',
  head() {
    return {
      title: 'Account-suspended',
    };
  },
  components: {SchoolSideD},
  data() {
    return {
      user: this.$auth.user.user,
      school_payment_suspend_status: this.$auth.user.school.payment_suspend,
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

.student-profile {
  text-align: center !important;
}

</style>
