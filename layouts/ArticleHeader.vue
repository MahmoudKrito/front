<template>
  <div>
    <!-- Header -->
    <nav class="navbar navbar-fixed-top" :class="{rtl : current_lang == 'ar'}">
      <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <nuxt-link :to="localePath('/')" class="navbar-brand">
            <img :src="general_settings.logo" alt="">
          </nuxt-link>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav navbar-left">
            <li>
              <nuxt-link :to="localePath('/')">
                <img src="../assets/images/icon-home.svg" alt="">
                {{ $t('home') }}
              </nuxt-link>
            </li>

            <li>
              <nuxt-link :to="localePath('/articles')">{{ $t('general') }}</nuxt-link>
            </li>

            <li v-for="(disease,index) in diseases" :key="disease.id">
              <nuxt-link :to="localePath('/diseases/'+disease.slug)">
                {{ current_lang == 'ar' ? disease.name_ar : disease.name_en }}
              </nuxt-link>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li>
              <nuxt-link :to="localePath('/articles/ArticleAdd')" v-if="user_type_id == 2"> {{ $t('write_article') }}
              </nuxt-link>
            </li>
            <li class="lang-link">
              <nuxt-link :to="switchLocalePath('en')" v-if="current_lang == 'ar'">English</nuxt-link>
            </li>
            <li class="lang-link">
              <nuxt-link :to="switchLocalePath('ar')" v-if="current_lang == 'en'">Ar</nuxt-link>
            </li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>

    <!--<nuxt/>-->

    <footer-app></footer-app>

  </div>

</template>

<script>
import footerApp from '~/components/footer.vue'

export default {
  data() {
    return {
      general_settings: {},
      diseases: {},
      user_type_id: this.$auth.loggedIn ? this.$auth.user.user.user_type_id : ''
    }
  },
  components: {footerApp},
  head() {
    return {
      title: 'Article',
    };
  },
  mounted() {
    this.getGeneralSettings();
    this.getDiseases()
  },
  methods: {
    getGeneralSettings() {
      this.$axios.$get('/setting')
        .then(response => {
          this.general_settings = response.data;
        })
    },
    getDiseases() {
      this.$axios.$get('/website/articles/diseases')
        .then(response => {
          this.diseases = response.data;
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
