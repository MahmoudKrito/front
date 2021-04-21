<template>
  <div class="dashboard">
    <!-- Content -->
    <div :class="{rtl:current_lang === 'ar'}">
      <main class="main-wrapper">
        <StudentSide></StudentSide>

        <section class="content-wrapper">
          <!-- Content -->
          <div class="container-fluid">
            <div class="main-content">
              <div class="content-side">
                <!--  -->
                <div class="section-wrapper section-custom" v-if="user.is_suspended == 0">
                  <div class="account-suspended">
                    <img src="~/assets/images/account-suspended.svg" alt="">
                       {{$t('this_account_has_been_suspended')}}
                  </div>
                </div>

                <div class="section-wrapper section-custom"
                     v-if="school_user.is_suspended == 0 || school.payment_suspend == 0">
                  <div class="account-suspended">
                    <img src="~/assets/images/account-suspended.svg" alt="">
                    {{ $t('this_account_has_been_suspended_as_your_school_is_suspended') }}
                  </div>
                </div>
              </div>
              <div class="notification-side student-notifications student-suspended">
                <div class="student-suspended-icon">
                  <img src="~/assets/images/account-suspended-2.svg" alt="">
                </div>
                <div class="student-details">
                  <div class="student-name">
                    <span>{{ school.school_name }} </span>
                    {{ user.first_name }} {{ user.last_name }}
                  </div>
                  <div class="school-name">
                    {{ school.school_name }} {{ $t('school') }}
                  </div>

                </div>
                <div class="footer-icon"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

  </div>

</template>


<script>
import StudentSide from '~/layouts/StudentSideD';

export default {
  layout: 'StudentHeaderD',
  head() {
    return {
      title: 'Account-suspended',
    };
  },
  components: {StudentSide},
  data() {
    return {
      user: this.$auth.user.user,
      school: this.$auth.user.school,
      school_user: this.$auth.user.school_user
    }
  },
  mounted() {
    this.getStatusAll()
  },
  methods: {
    getStatusAll() {
      if (this.user.is_suspeneded == 1 && this.school.payment_status == 1 && this.school_user.is_suspended == 1) {
        return true;
      } else {
        return false;
      }
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
