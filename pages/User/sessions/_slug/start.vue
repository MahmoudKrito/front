<template>
  <div :class="{rtl : current_lang === 'ar'}">
    <div class="container" style="padding-top:70px">
      <div class="profile-wrapper">
        <div class="profile-side">
          <div class="user-wrapper">
            <div class="user-img">
              <img src="../../../../assets/images/Group1699.svg" alt="">
            </div>
            <div class="user-details">
              <div class="user-name">{{ this.user.first_name }} {{ this.user.last_name }}</div>
              <div class="user-phone">{{ this.user.phone }}</div>
              <div class="user-email">{{ this.user.email }}</div>
            </div>
          </div>
        </div>
        <div class="profile-content">
          <div class="profile-header"></div>
          <div class="profile-body">
            <div class="col-xs-12 text-center">
              <p class="margin-bottom-50 font-size-18">
                {{ $t('please_head_over_to_sessions_page_to_book_a_session') }}
              </p>
              <nuxt-link :to="localePath('/User/sessions/'+session_slug+'/wait')"
                         class="color-main font-size-20 btn-link">
                {{ $t('start_session') }}
              </nuxt-link>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>


export default {
  layout: 'mainHeader',
  head() {
    return {
      title: 'StartSession',
    };
  },
  middleware:'user',
  data() {
    return {
      general_settings: {},
      user: {},
      session_slug: this.$route.params.slug,
    }
  },
  mounted() {
    this.storage();
  },
  methods: {
    storage() {
      this.user = this.$auth.user.user;
    },
    getGeneralSettings() {
      this.$axios.$get('/setting')
        .then(response => {
          this.general_settings = response.data;
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
.profile-wrapper .profile-side:after {
  content: '';
  position: absolute;
  top: 150px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background: url(../../../../assets/images/Group1710.svg) center no-repeat;
  background-size: contain;
  width: 150px;
  height: 350px;
}
</style>
