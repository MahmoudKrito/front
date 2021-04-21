<template>
  <div>
    <!-- Content -->
    <div class="container">
      <div class="page-name">
        <img src="https://api.promental.net/images/website/magazine.svg" alt="">
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-8 col-lg-9">

          <VueSlickCarousel v-bind="slider_options" v-if="mostViewedArticles.length>0 && articles_ready">
            <div v-for="(article,index) in mostViewedArticles" :key="article.id">
              <div class="item">
                <a href="#" class="article-slider-item">
                  <div class="article-slider-img">
                    <img :src="article.cover" alt="">
                  </div>
                  <div class="article-slider-content">
                    <div class="article-slider-title">
                      {{ article.title }}
                    </div>
                    <div class="article-slider-text">
                      {{ article.body | subBody }}
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </VueSlickCarousel>

          <VueSlickCarousel v-bind="slider_options" v-else>

            <div class="item active">
              <a href="#" class="article-slider-item">
                <div class="article-slider-img">
                  <img src="https://api.promental.net/images/website/article-1.png" alt="">
                </div>
                <div class="article-slider-content">
                  <div class="article-slider-title">
                    <!--                      {{ article.title }}-->
                  </div>
                  <div class="article-slider-text">
                    <!--                      {{ article.body | subBody }}-->
                  </div>
                </div>
              </a>
            </div>

            <div class="item">
              <a href="#" class="article-slider-item">
                <div class="article-slider-img">
                  <img src="https://api.promental.net/images/website/article-2.png" alt="">
                </div>
                <div class="article-slider-content">
                  <div class="article-slider-title">
                    <!--                      {{ article.title }}-->
                  </div>
                  <div class="article-slider-text">
                    <!--                      {{ article.body | subBody }}-->
                  </div>
                </div>
              </a>
            </div>
            <div class="item active">
              <a href="#" class="article-slider-item">
                <div class="article-slider-img">
                  <img src="https://api.promental.net/images/website/article-1.png" alt="">
                </div>
                <div class="article-slider-content">
                  <div class="article-slider-title">
                    <!--                      {{ article.title }}-->
                  </div>
                  <div class="article-slider-text">
                    <!--                      {{ article.body | subBody }}-->
                  </div>
                </div>
              </a>
            </div>

            <div class="item">
              <a href="#" class="article-slider-item">
                <div class="article-slider-img">
                  <img src="https://api.promental.net/images/website/article-2.png" alt="">
                </div>
                <div class="article-slider-content">
                  <div class="article-slider-title">
                    <!--                      {{ article.title }}-->
                  </div>
                  <div class="article-slider-text">
                    <!--                      {{ article.body | subBody }}-->
                  </div>
                </div>
              </a>
            </div>

          </VueSlickCarousel>



          <div class="row">
            <div class="col-xs-12 col-sm-6 wow fadeInUp" data-wow-delay="0.4s"
                 v-for="(article,index) in articles" :key="article.id">
              <nuxt-link :to="localePath('/articles/'+article.slug)" class="article-item">
                <div class="article-img">
                  <img :src="article.cover" alt="">
                </div>
                <div class="article-details">
                  <div class="article-category"> {{ current_lang == 'en' ? disease.name_en : disease.name_ar }}</div>
                  <div>
                    <span class="article-visits">{{ article.views }} {{ $t('visit') }}</span>
                    <span class="article-date"> {{article.created_at | formatDateByDay}} {{ article.created_at | formatDateByMonth }} {{article.created_at | formatDateByYear }}</span>
                  </div>
                </div>
                <div class="article-title">
                  {{ article.title }}
                </div>
                <div class="article-text">
                  {{ article.body }}
                </div>
              </nuxt-link>
            </div>
          </div>



        </div>

        <div class="col-xs-12 col-md-4 col-lg-3">
          <!--  Section title  -->
          <div class="articles-section-title articles-side">
            <span>
              {{ $t('most_viewed') }}
            </span>
          </div>
          <!--  Articles  -->
          <div class="row">
            <div class="col-xs-12" v-for="(mostViewedArticle,index) in mostViewedArticles" v-if="index < 2"
                 :key="mostViewedArticle.id">

              <nuxt-link :to="localePath('/articles/'+mostViewedArticle.slug)"
                         class="article-side">
                <div class="article-img">
                  <img :src="mostViewedArticle.cover" alt="">
                </div>
                <div class="article-text">
                  {{ mostViewedArticle.body | subBody }}
                </div>
              </nuxt-link>

            </div>
          </div>
          <!--  Ad 300 * 250  -->
          <div class="ad-300-250">

          </div>

          <!--  Section title  -->
          <div class="articles-section-title articles-side">
                <span>
                     {{ $t('other_articles') }}
                </span>
          </div>
          <!--  Articles  -->
          <div class="row">
            <div class="col-xs-12" v-for="(article,index) in other_articles" v-if="index < 2" :key="article.id">

              <a href="" class="article-side">
                <div class="article-img">
                  <img :src="article.cover" alt="">
                </div>
                <div class="article-text">
                  {{ article.body | subBody }}
                </div>
              </a>

            </div>
          </div>
          <!--  Ad 300 * 250  -->
          <div class="ad-300-250">
          </div>
        </div>
      </div>
    </div>


  </div>

</template>

<script>
// import carousel from 'vue-owl-carousel';
import {UAnimateContainer, UAnimate} from 'vue-wow';

export default {
  layout: 'ArticleHeader',
  components: {UAnimateContainer, UAnimate},
  data() {
    return {
      articles_ready: false,
      slider_options: {
        'arrows': false,
        'focusOnSelect': true,
        'infinite': true,
        'autoplay': true,
        'autoplaySpeed': 1000,
        'speed': 1000,
        'touchThreshold': 1,
        "slidesToShow": 1,
        "slidesToScroll": 1,
        'responsive': [
          {
            'breakpoint': 1050,
            'settings': {
              'centerPadding': '100px',
              'slidesToShow': 1,
              'slidesToScroll': 1,
              'infinite': true,
            }
          },
          {
            'breakpoint': 850,
            'settings': {
              'centerPadding': '100px',
              'slidesToShow': 1,
              'slidesToScroll': 1,
              'infinite': true,
            }
          },
          {
            'breakpoint': 600,
            'settings': {
              'centerPadding': '100px',
              'slidesToShow': 1,
              'slidesToScroll': 1,
              'initialSlide': 1,
              'infinite': true,
            }
          },
          {
            'breakpoint': 480,
            'settings': {
              'centerPadding': '50px',
              'slidesToShow': 1,
              'slidesToScroll': 1,
              'infinite': true,
            }
          }
        ]
      },
      isNuxtReady: false,
      diseases: {},
      mostViewedArticles: {},
      general_settings: {},
      other_articles: {},
      disease_slug: this.$route.params.slug,
      disease: {},
      articles: {}
    }
  },
  head() {
    return {
      title: 'Disease-Articles',
    };
  },
  mounted() {
    this.getDisease();
    this.getMostViewedArticles();
    this.getGeneralSettings();
    this.getOtherArticles();
  }
  ,
  methods: {
    getDisease() {
      this.$axios.get('/website/articles/' + this.disease_slug)
        .then(response => {
          this.disease = response.data
          this.articles = response.data.articles
        })
    },
    getMostViewedArticles() {
      this.$axios.$get('/website/articles/mostViewed').then(response => {
        this.mostViewedArticles = response.data;
        this.articles_ready = true;
      })
    },
    getGeneralSettings() {
      this.$axios.$get('/setting')
        .then(response => {
          this.general_settings = response.data;
        })
    }
    ,
    getOtherArticles() {
      this.$axios.$get('/website/articles/otherArticles').then(response => {
        this.other_articles = response.data;
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


<style scoped>
.container {
  padding-top: 70px
}
</style>

