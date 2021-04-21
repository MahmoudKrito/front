<template>
  <div :class="{rtl : current_lang === 'ar'}">
    <div v-if="loading" class="loading-page">
      <div class="loading"></div>
    </div>
    <!-- Content-->
    <div class="login-wrapper">
      <div class="login-form">
        <div class="container-fluid">
          <div class="col-xs-12 col-sm-10 col-sm-push-1">
            <br><br><br><br><br><br><br><br><br>
            <div class="alert alert-danger" v-if="message">
              {{ message }}
            </div>
            <form>
              <div class="form-group">
                <div class="input-group">
                                    <span class="input-group-addon">
                                <i class="fa fa-circle"></i>
                                {{ $t('email') }}
                            </span>
                  <input type="text" class="form-control" v-model="email" placeholder="person@mail.com">
                </div>
                <div class="text-right">
                                    <span class="forget-password">
                                <nuxt-link :to="localePath('/Login')">  {{ $t('login') }}</nuxt-link>
                            </span>

                </div>
              </div>

              <div class="form-group text-center margin-top-40">
                <button type="button" class="btn btn-main btn-lg"
                        @click.prevent="checkEmail" :disabled="loading"> {{ $t('submit') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="login-side">
        <div class="login-side-logo">
          <img :src="logo" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'RegisterLayout',
  head() {
    return {
      title: 'Login',
    };
  },
  data() {
    return {
      email: '',
      formErrors: [],
      logo:"",
      loading:false,
      message:''
    }
  },
  mounted() {
    this.getGeneralSettings()
  },
  methods: {
   checkEmail(e){
     e.preventDefault()
     if(!this.email){
       if(this.current_lang == 'en'){
         this.message = 'enter email'
       }else{
         this.message = 'اكتب البريد الاليكتروني'
       }
     }else{
       this.loading=true
       this.$axios.post('/website/check-email',{
         email:this.email
       }).then(response => {
         console.log(response.status)
         if(response.status == '200'){
           console.log('fine')
           this.$store.state.forget_email = response.data.data.email
           console.log(this.$store.state.forget_email)
           this.$router.push(this.localePath('/Change-password'))
         }else if(response.status == '500'){
           if(this.current_lang == 'en'){
             this.message='wrong email'
           }else{
             this.message='البريد غير صحيح'
           }

         }
       })
     }

    },
    getGeneralSettings() {
      this.$axios.$get('/setting')
        .then(response => {
          this.logo = response.data.footer_logo;
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


