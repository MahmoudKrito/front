<template>
  <iframe width="100%" height="600px" style="margin:20px"
          :src="'https://accept.paymobsolutions.com/api/acceptance/iframes/30564?payment_token='+token"></iframe>
</template>

<script>
export default {
  layout: 'mainHeader',
  data() {
    return {
      session_slug: this.$route.params.slug,
      token: ''
    }
  },
  mounted() {
    this.getToken()
  },
  methods: {
    async getToken() {
      this.$axios.get('/website/reservations/' + this.session_slug + '/getPaymentToken')
        .then(response => {
          if(response.data.status == 200){
            this.token = response.data.data
          }else{
            if (this.current_lang == 'en') {
              this.$swal('This session is expired, we will removed this session, please try again!');
            } else if (this.current_lang == 'ar') {
              this.$swal('هذه الجلسه لم تعد متاحه , من فضلك حاول مره اخرى');
            }
            this.$router.push(this.localePath('/User/sessions'));
          }
          console.log(response)
        })
    },
    getPaymentStatus() {
      this.$axios.get('/accept-card')
        .then(response => {
          console.log(response)
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
