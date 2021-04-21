<template>
  <div>
    <!-- Content -->
    <div class="container">
      <div class="page-name">
        <img src="https://api.promental.net/images/website/magazine.svg" alt="" v-if="current_lang == 'ar'">
        <img src="https://api.promental.net/images/website/magazine_en.png" alt="" v-if="current_lang == 'en'">
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-8 col-lg-9">

          <VueSlickCarousel v-bind="slider_options" v-if="mostViewedArticles.length>0 && articles_ready">
            <div v-for="(article,index) in mostViewedArticles" :key="article.id">
              <div class="item">
                <a href="#" class="article-slider-item"
                   @click.prevent="singleArticle($event,article.slug)">
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

          <!--  Author  -->
          <!--          <div class="media author-wrapper">-->
          <!--            <div class="media-left">-->
          <!--              <img class="media-object" src="../../assets/images/article-2.png" alt="...">-->
          <!--            </div>-->
          <!--            <div class="media-body media-middle">-->
          <!--              &lt;!&ndash;              <div class="author-name"> d.ahmed mohamed</div>&ndash;&gt;-->
          <!--              &lt;!&ndash;              <div class="author-title">depression speciality</div>&ndash;&gt;-->
          <!--            </div>-->
          <!--          </div>-->

          <template v-for="(disease,index) in diseases"
                    v-if="disease.articles.length > 0">
            <div class="articles-section-title">
                            <span>
                                {{ current_lang == 'en' ? disease.name_en : disease.name_ar }}
                            </span>
              <nuxt-link :to="localePath('/diseases/'+disease.slug)">{{ $t('more') }}</nuxt-link>
            </div>

            <div class="row">
              <div class="col-xs-12 col-sm-6 wow fadeInUp" data-wow-delay="0.4s"
                   v-for="(article,index) in disease.articles" :key="article.id" v-if="index<4">
                <a href="" @click.prevent="singleArticle($event,article.slug)" class="article-item">
                  <div class="article-img">
                    <img :src="article.cover" alt="">
                  </div>
                  <div class="article-details">
                    <div class="article-category"> {{ current_lang == 'en' ? disease.name_en : disease.name_ar }}</div>
                    <div>
                      <span class="article-visits">{{ article.views }} {{ $t('visit') }}</span>
                      <span class="article-date"> {{ article.created_at | formatDateByDay }} {{ article.created_at | formatDateByMonth }} {{ article.created_at | formatDateByYear }}</span>
                    </div>
                  </div>
                  <div class="article-title">
                    {{ current_lang == 'ar' ? article.title : article.title_en }}

<!--                    {{ article.title }}-->
                  </div>
                  <div class="article-text">
                    {{ current_lang == 'ar' ? article.body : article.body_en }}

<!--                    {{ article.body }}-->
                  </div>
                </a>
              </div>
            </div>
          </template>

          <!--  Ad 728 * 90  -->
          <!--          <div class="ad-728-90 visible-lg">-->
          <!--            <img src="~/assets/images/12339668779209334709.png" alt="">-->
          <!--          </div>-->
          <!--  Ad 728 * 90  -->
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

              <a href="" @click.prevent="singleArticle($event,mostViewedArticle.slug)"
                 class="article-side">
                <div class="article-img">
                  <img :src="mostViewedArticle.cover" alt="">
                </div>
                <div class="article-text">
<!--                  {{ mostViewedArticle.body | subBody }}-->
                  {{ (current_lang == 'ar' ? mostViewedArticle.body : mostViewedArticle.body_en) | subBody }}
                </div>
              </a>

            </div>
          </div>
          <!--  Ad 300 * 250  -->
          <div class="ad-300-250">
            <!--            <img src="../../assets/images/13020462563165376058.png" alt="">-->
          </div>

          <!--  Section title  -->
          <div class="articles-section-title articles-side">
                <span>
                     {{ $t('other_articles') }}
                </span>
          </div>
          <!--  Articles  -->
          <div class="row">
            <div class="col-xs-12" v-for="(article,index) in articles" v-if="index < 2" :key="article.id">

              <a href="" class="article-side">
                <div class="article-img">
                  <img :src="article.cover" alt="">
                </div>
                <div class="article-text">
                  {{ (current_lang == 'ar' ? article.body : article.body_en) | subBody }}

                </div>
              </a>

            </div>
          </div>
          <!--  Ad 300 * 250  -->
          <div class="ad-300-250">
            <!--            <img src="../../assets/images/13020462563165376058.png" alt="">-->
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
      article_id: '',
      articles: {}
    }
  },
  head() {
    return {
      title: 'Articles',
    };
  },
  mounted() {
    this.getArticles();
    this.getMostViewedArticles();
    this.getGeneralSettings();
    this.getOtherArticles();
  },
  methods: {
    singleArticle(e, slug) {
      e.preventDefault();
      this.$router.push(this.localePath('/articles/' + slug))
    },
    getArticles() {
      console.log('dddddd');
      this.$axios.$get('/website/articles').then(response => {
        this.diseases = response.data;
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
    },
    getOtherArticles() {
      this.$axios.$get('/website/articles/otherArticles').then(response => {
        this.articles = response.data;
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

