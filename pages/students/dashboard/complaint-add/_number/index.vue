<template>
  <div class="dashboard">
    <div :clas="{rtl:current_lang === 'ar'}">
      <main class="main-wrapper">
        <StudentSide></StudentSide>
        <section class="content-wrapper">
          <!-- Content -->
          <div class="container-fluid">
            <div class="main-content">
              <div class="content-side">
                <!--  -->
                <div class="section-wrapper section-custom">
                  <div class="center-block text-center margin-50">
                    <img src="https://api.promental.net/images/website/check.svg" alt="" width="75">
                  </div>
                  <div class="center-block text-center margin-50">
                    <p v-if="current_lang == 'en'">
                      <img src="https://api.promental.net/images/website/icon-complaint-2.svg" alt="">
                      The complaint has been sent to number {{ complaint_number }} and
                      <br>
                      will be answered soon
                    </p>
                    <p v-if="current_lang == 'ar'">
                      <img src="https://api.promental.net/images/website/icon-complaint-2.svg" alt="">
                      تم اضافه الشكوي برقم {{ complaint_number }}
                      <br>
                      وسيتم الرد في اقرب وقت
                    </p>
                  </div>
                  <div class="center-block text-center margin-top-50">
                    <button type="submit" class="btn btn-primary" @click="confirm()">
                      {{ $t('done') }}
                    </button>
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
      complaint_number: '',
      user: this.$auth.user.user,
      school: this.$auth.user.school
    }
  },
  mounted() {
    this.storage();
  },
  methods: {
    storage() {
      this.complaint_number = this.$route.params.number;
    },
    confirm() {
      this.$router.push(this.localePath('/students/dashboard/complaints'))
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
