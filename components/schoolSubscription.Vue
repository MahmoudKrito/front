<template>
  <div>
    <div class="subscription-wrapper">
      <div class="subscription-title">
        {{ $t('subscription_end_date') }}
      </div>

      <div class="subscription-info">
        {{ end_date | formatDateByDay }} {{ end_date | formatDateByMonth }} {{ end_date | formatDateByYear }}
      </div>
    </div>

    <div class="subscription-wrapper">
      <div class="subscription-title">
        {{ $t('subscription_start_date') }}
      </div>

      <div class="subscription-info" v-if="subscription">
        {{ subscription.from  | formatDateByDay }} {{ subscription.from  | formatDateByMonth }}
        {{ subscription.from  | formatDateByYear }}
      </div>
      <div class="subscription-info" v-else>
        {{ $t('no_subscription_yet') }}
      </div>
    </div>

    <!-- -->
    <div class="subscription-wrapper">
      <div class="subscription-title">
        {{ $t('subscription_plan') }}
      </div>

      <div class="subscription-info" v-if="subscription">
        {{ current_lang == 'en' ? subscription_data.name_en : subscription_data.name_ar }}
      </div>
      <div class="subscription-info" v-else>
        {{ message }}
      </div>

    </div>
    <!-- -->
    <div class="subscription-wrapper">
      <div class="subscription-title">
        {{ $t('subscription_status') }}
      </div>

      <div class="subscription-info" v-if="school.payment_suspend == 0">
        <img src="https://api.promental.net/images/website/uncheck.svg" alt="" width="20">
        {{ $t('not_enabled') }}
      </div>

      <div class="subscription-info" v-if="school.payment_suspend == 1">
        <img src="https://api.promental.net/images/website/check.svg" alt="" width="20">
        {{ $t('activated') }}
      </div>

    </div>
  </div>

</template>

<script>
export default {

  data() {
    return {
      subscription: {},
      end_date: '',
      packages: {},
      message: "",
      school: this.$auth.user.school,
      subscription_data: {}
    }
  },
  mounted() {
    this.getCurrentSubscription()
  },
  methods: {
    getCurrentSubscription() {
      this.$axios.get('/school/getCurrentSubscription')
        .then(response => {
          console.log(response)
          if (response.status == '200') {
            this.subscription = response.data.data;
            this.subscription_data = response.data.data.subscription;
            this.end_date = response.data.end_date
            console.log(this.subscription_data );
          } else if (response.status == '500') {
            if (this.current_lang == 'en') {
              this.message = 'no subscription till now'
            } else if (this.current_lang == 'ar') {
              this.message = 'لا يوجد اشتراك حتي الان'
            }

          }

        })
    },
    getSchoolPackageCategories() {
      this.$axios.$get('/website/schools/getPackageCategories')
        .then(response => {
          this.packages = response.data;
        })
    },
  },
  computed: {
    current_lang() {
      return this.$i18n.locale
    }
  },
}
</script>

<style scoped>
.subscription-wrapper {
  position: relative;
  display: inline-block;
  background: #fff;
  border-radius: 10px;
  width: 100%;
  margin: 10px auto;
  padding: 15px;
}

.tabs-wrapper .subscription-wrapper {
  padding: 15px 20px;
}

.dark-mode .subscription-wrapper {
  background: #122A38;
}

.tabs-wrapper .subscription-wrapper {
  background: #ededed;
}

.dark-mode .tabs-wrapper .subscription-wrapper {
  background: #285E75;
}

.subscription-wrapper .subscription-title {
  position: relative;
  display: inline-block;
  width: 100%;
  color: #285E75;
  font-size: 12px;
}

.dark-mode .subscription-wrapper .subscription-title {
  color: #285E75;
}

.tabs-wrapper .subscription-wrapper .subscription-title {
  color: #102331 !important;
}

.tabs-wrapper .subscription-wrapper hr {
  border-top: 1px solid #ccc;
}

.dark-mode .tabs-wrapper .subscription-wrapper hr {
  border-top: 1px solid #82BDD1;
}

.subscription-wrapper .subscription-info {
  position: relative;
  display: inline-block;
  width: 100%;
  margin-top: 5px;
  color: #000;
  font-size: 20px;
  font-weight: bold;
  text-align: right;
  vertical-align: middle;
}

.dark-mode .subscription-wrapper .subscription-info {
  color: #fff;
}


</style>
