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
                <div class="section-wrapper section-custom">
                  <div class="account-suspended">
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
import DoctorSide from '~/layouts/DoctorSide';

export default {
  layout: 'DoctorHeaderD',
  head() {
    return {
      title: 'Account-suspended',
    };
  },
  components: {DoctorSide},
  data() {
    return {
      user: this.$auth.user.user,
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

.student-profile {
  text-align: center !important;
}

.account-suspended {
  text-align: center !important;
}

.account-suspended > div {
  text-align: center !important;
}
</style>

