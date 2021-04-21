<template>
  <div>
    <!-- Content -->
    <div class="container">
      <div class="page-name">
        <img src="https://api.promental.net/images/website/magazine.svg" alt="">
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-8 col-lg-9">
          <!--  Article  -->
          <div class="article-item article-single">
            <div class="article-title">
            {{ current_lang == 'ar' ? article.title : article.title_en }}
            </div>
            <div class="article-img">
              <img :src="article.cover" alt="">
            </div>
            <div class="article-details">

              <div>
                <span class="article-date">{{ article.created_at | formatDateByDay }} {{
                    article.created_at | formatDateByMonth
                  }} {{ article.created_at | formatDateByYear }}</span>
                <span class="article-visits">{{ article.views }} {{ $t('visit') }}</span>
              </div>
            </div>
            <!--  Author  -->
            <div class="media author-wrapper">
              <div class="media-left">
                <img class="media-object" :src="article.cover" alt="...">
              </div>
              <div class="media-body media-middle">

              </div>
            </div>

            <div class="article-text">
              <p>
            {{ current_lang == 'ar' ? article.body : article.body_en }}
              </p>
            </div>
          </div>

        </div>

        <div class="hidden-xs hidden-sm col-md-4 col-lg-3">
          <!--  Section title  -->
          <div class="articles-section-title articles-side">
                        <span>
                              {{ $t('most_viewed') }}
                        </span>
          </div>
          <!--  Articles  -->
          <div class="row">
            <div class="col-xs-12" v-for="(most_viewed_article , index) in most_viewed_articles"
                 v-if="index < 2" :key="most_viewed_article.id">
              <a href="" class="article-side"
                 @click.prevent="singleArticle($event,most_viewed_article.slug)">
                <div class="article-img">
                  <img :src="most_viewed_article.cover" alt="">
                </div>
                <div class="article-text">
                {{ (current_lang == 'ar' ? most_viewed_article.body: most_viewed_article.body_en) | subBody }}
                </div>
              </a>

            </div>
          </div>

          <!--  Section title  -->
          <div class="articles-section-title articles-side">
            <span> {{ $t('other_articles') }}</span>
          </div>
          <!--  Articles  -->
          <div class="row">
<!--            <div class="col-xs-12" v-for="(other_article,index) in other_articles" v-if="index < 2"-->
<!--                 :key="other_article.id">-->

<!--              <a href="" class="article-side" @click.prevent="singleArticle($event,other_article.slug)">-->
<!--                <div class="article-img">-->
<!--                  <img :src="other_article.cover" alt="">-->
<!--                </div>-->
<!--                <div class="article-text">-->
<!--                  {{ other_article.body | subBody }}-->
<!--                </div>-->
<!--              </a>-->

<!--            </div>-->
          </div>
        </div>

        <div class="col-xs-12">
          <!--  Comments  -->
          <div class="comments-wrapper">
            <!--  Ad 160 * 600  -->
<!--            <div class="ad-160-600 visible-lg">-->
<!--              <img src="../../../assets/images/8897615623091846003.png" alt="">-->
<!--            </div>-->
            <!--  Comments  -->
            <div class="fb-comments"
                 data-href="https://developers.facebook.com/docs/plugins/comments#configurator"
                 data-width="" data-numposts="5"></div>
            <!--  Ad 160 * 600  -->
<!--            <div class="ad-160-600 visible-lg">-->
<!--              <img src="../../../assets/images/8897615623091846003.png" alt="">-->
<!--            </div>-->
          </div>
          <!--  Section title  -->
          <div class="articles-section-title articles-side">
            <span>{{ $t('most_viewed') }}</span>
          </div>
          <!--  Articles  -->
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-4"
                 v-for="(most_viewed_article,index) in most_viewed_articles" :key="most_viewed_article.id">

              <a href="" class="article-side"
                 @click.prevent="singleArticle($event,most_viewed_article.slug)">
                <div class="article-img">
                  <img :src="most_viewed_article.cover" alt="">
                </div>
                <div class="article-text">
                    {{ (current_lang == 'ar' ? most_viewed_article.body : most_viewed_article.body_en) | subBody }}
                </div>
              </a>

            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ArticleHeader from '~/layouts/ArticleHeader'

export default {
  layout: 'ArticleHeader',
  head() {
    return {
      title: 'Single-Article',
    };
  },
  components: {ArticleHeader},
  asyncData() {
    return {
      article: {},
      doctor: {},
      speciality: {},
      most_viewed_articles: {},
      other_articles: {},
      article_slug: '',
      disease: {},
      diseases: {}
    }
  },
  mounted() {
    this.storage();
    this.showArticle();
    this.getMostViewedArticles();
    this.getArticles();
    this.getDiseases()
  },
  methods: {
    storage() {
      this.article_slug = this.$route.params.slug;
    },
    showArticle() {
      this.$axios.$get('/website/articles/' + this.article_slug + '/showArticle')
        .then(response => {
          console.log(response);
          this.article = response.article;
          this.doctor = response.doctor;
          this.speciality = response.speciality
          this.disease = response.disease
        });
    },
    getMostViewedArticles() {
      this.$axios.get('/website/articles/mostViewed')
        .then(response => {
          this.most_viewed_articles = response.data.data;
        })
    },
    getArticles() {
      this.$axios.$get('/website/articles')
        .then(response => {
          this.other_articles = response.data;
        })
    },
    singleArticle(e, slug) {
      this.article_slug = slug;
      this.showArticle();
      e.preventDefault();
    },
    getDiseases() {
      this.$axios.$get('/website/articles/diseases')
        .then(response => {
          this.diseases = response.data;
          console.log('dddddd',this.diseases)
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
.container {
  padding-top: 70px
}
</style>
