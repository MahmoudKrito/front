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
                <div class="section-title">
                  {{ $t('new_sessions') }}
                </div>

                <div class="doctors-block">
                  <div class="center-block text-center margin-50">
                    <img src="https://api.promental.net/images/website/check.svg" alt="" width="75">
                  </div>
                  <div class="center-block text-center margin-50">
                    <p>
                      <img src="https://api.promental.net/images/website/icon-complaint.svg" alt="">
                      {{ $t('the_session_time_is_over') }}
                    </p>

                  </div>

                  <div class="">
                    <div class="center-block text-center margin-top-50">
                      <div class="form-group">
                        <nuxt-link :to="localePath('/doctors/dashboard/complaint-add')"
                                   class="btn btn-add">
                          {{ $t('add_complaint') }}
                        </nuxt-link>

                      </div>
                      <div class="form-group">
                        <nuxt-link :to="localePath('/doctors/dashboard')" class="btn btn-primary">
                          {{ $t('done') }}
                        </nuxt-link>
                      </div>
                    </div>
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
      title: 'session-end-confirm',
    };
  },
  middleware:'doctorSuspend',
  layout: 'DoctorHeaderD',
  components: {DoctorSide, doctorNotifications},
  computed: {
    current_lang() {
      return this.$i18n.locale
    }
  }
}
</script>

<style scoped>

*:not(i) {
  font-family: 'Montserrat', 'Cairo', serif, Arial;
}

p {
  text-align: center !important;
}

.btn-add {
  margin-bottom: 20px !important;
}

.btn {
  text-align: center !important;
}


/*.btn-add:nth-child(2) {*/
/*  margin-bottom: 20px !important;*/
/*}*/

.btn-add {
  background: #fff !important;
  color: #2BB788 !important;
  border-radius: 0px !important;
}

.btn-add:hover {
  color: #000 !important;
}

/*.btn-primary {*/
/*  margin-left: 45%;*/
/*}*/
</style>

