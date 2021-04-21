<template>
  <div :class="{rtl : current_lang === 'ar'}">
    <!-- Profile -->
    <div v-if="loading" class="loading-page">
      <div class="loading"></div>
    </div>
    <div class="container">
      <div class="profile-wrapper" style="padding-top: 70px">
        <div class="profile-side">
          <div class="user-wrapper">
            <div class="user-img">
              <img src="https://api.promental.net/images/website/Group1699.svg" alt="">
            </div>
            <div class="user-details">
              <div class="user-name">{{ user.first_name }}</div>
              <div class="user-phone">{{ user.phone }}</div>
              <div class="user-email">{{ user.email }}</div>
            </div>
          </div>
        </div>
        <div class="profile-content">
          <div class="profile-header"></div>
          <div class="profile-body">
            <div class="col-xs-12">
              <div class="login-form">
                <div class="login-title">
                  {{ $t('profile_data') }}
                </div>

                <form action="">
                  <div class="form-group">
                    <div class="input-group">
                                       <span class="input-group-addon">
                                        <i class="fa fa-circle"></i>
                                        {{ $t('name') }}
                                    </span>
                      <input type="text" class="form-control"
                             :value="user.first_name + user.last_name" readonly>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                                           <span class="input-group-addon">
                                        <i class="fa fa-circle"></i>
                                        {{ $t('email') }}
                                    </span>
                      <input type="text" class="form-control" :value="user.email" readonly>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                                           <span class="input-group-addon">
                                        <i class="fa fa-circle"></i>
                                        {{ $t('phone_number') }}
                                    </span>
                      <input type="text" class="form-control" :value="user.phone" readonly>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                                     <span class="input-group-addon">
                                        <i class="fa fa-circle"></i>
                                         {{ $t('password') }}
                                    </span>
                      <input type="password" class="form-control" readonly>
                    </div>
                  </div>
<!--                  <div class="form-group text-right margin-top-40">-->
<!--                    <button type="submit" class="btn btn-deleteAccount btn-lg"-->
<!--                            @click.prevent="deleteAccount()" :disabled="loading"> {{ $t('delete_account') }}-->
<!--                    </button>-->
<!--                  </div>-->
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  middleware: 'user',
  layout: 'mainHeader',
  head() {
    return {
      title: 'Profile',
    };
  },
  data() {
    return {
      user: {},
      token: '',
      general_settings: {},
      loading:false
    }
  },
  mounted() {
    this.storage();
  },
  methods: {
    storage() {
      this.user = this.$auth.user.user;
    },
    async deleteAccount() {
      this.loading=true
      await this.$axios.$delete('/website/softDelete')
        .then(response => {
          //console.log(response);
          this.$router.push('/login');
        })
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


