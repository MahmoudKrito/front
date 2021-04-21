<template>
  <div :class="{rtl:current_lang === 'ar'}">
    <div v-if="loading" class="loading-page">
      <div class="loading"></div>
    </div>
    <div class="container">
      <div class="page-name">
        <img src="https://api.promental.net/images/website/magazine.svg" alt="">
      </div>
      <div class="row">

        <div class="col-xs-12 col-md-8 col-lg-9">
          <div class="alert alert-danger" role="alert" v-if="formErrors.length > 0">
            <ul>
              <li v-for="(error,index) in formErrors" :key="error.id">{{ error }}</li>
            </ul>
          </div>

          <div class="alert alert-danger" v-if="message">
            {{ message }}
          </div>

          <div class="row">
            <div class="col-xs-12 col-md-10">
              <div class="login-form">
                <div class="login-title write-withUs">
                  {{ $t('write_article') }}
                </div>
                <form enctype="multipart/form-data">
                  <div class="form-group">
                    <div class="input-group">
                      <span class="input-group-addon">
                          <i class="fa fa-circle"></i>
                         {{ $t('disease') }}
                      </span>
                      <select class="form-control" v-model="disease_id">
                        <option value="0"> {{ $t('choose_disease') }}</option>
                        <option :value="disease.id" v-for="(disease,index) in diseases">
                          {{ current_lang == 'en' ? disease.name_en : disease.name_ar }}
                        </option>

                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                                            <span class="input-group-addon">
                                        <i class="fa fa-circle"></i>
                                        {{ $t('title') }}
                                    </span>

                      <input type="text" class="form-control" v-model="title" placeholder="">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                                            <span class="input-group-addon">
                                        <i class="fa fa-circle"></i>
                                        {{ $t('title_en') }}
                                    </span>

                      <input type="text" class="form-control" v-model="title_en" placeholder="">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <span class="input-group-addon">
                        <i class="fa fa-circle"></i>
                         {{ $t('subject') }}
                      </span>
                      <textarea class="form-control" v-model="body" rows="15"></textarea>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                                            <span class="input-group-addon">
                                            <i class="fa fa-circle"></i>
                                             {{ $t('subject_en') }}
                                        </span>

                      <textarea class="form-control" v-model="body_en" rows="15"></textarea>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <span class="input-group-addon">
                          <i class="fa fa-circle"></i>
                         {{ $t('cover_photo') }}
                      </span>
                      <div class="file-upload">
                        <input type="file" id="file" ref="file" @change="onFileChange"
                               class="upload"/>
                        <input type="text" class="form-control" id="fileuploadurl" readonly
                               placeholder="">
                        <span><i class="fa fa-file-image-o" style="font-size: 24px;color: #2bb788;"></i></span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group text-right margin-top-20">
                    <button @click="formValidate" class="btn btn-main btn-send" :disabled="loading"
                            v-text="$t('send')">
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
        <div class="col-xs-12 col-md-4 col-lg-3">
          <!--  Section title  -->
          <div class="articles-section-title articles-side">
            <span>{{ $t('most_viewed') }}</span>
          </div>
          <!--  Articles  -->
          <div class="row">
            <div class="col-xs-12" v-for="(most_viewed_article,index) in most_viewed_articles"
                 v-if="index < 2"
                 :key="most_viewed_article.id">
              <nuxt-link
                :to="localePath('/articles/'+most_viewed_article.id)"
                class="article-side">
                <div class="article-img">
                  <img src="https://api.promental.net/images/website/article-1.png" alt="">
                </div>
                <div class="article-text">
                  <!--                  {{ most_viewed_article.body | subBody }}-->
                  {{ (current_lang == 'ar' ? most_viewed_article.body : most_viewed_article.body_en) | subBody }}
                </div>
              </nuxt-link>
            </div>
          </div>

          <!--  Section title  -->
          <div class="articles-section-title articles-side">
            <span>{{ $t('other_articles') }}</span>
          </div>
          <!--  Articles  -->
          <div class="row">
            <div class="col-xs-12" v-for="(other_article,index) in other_articles" :key="other_article.id"
                 v-if="index < 2">
              <nuxt-link
                :to="localePath('/articles/'+other_article.id)"
                class="article-side">
                <div class="article-img">
                  <img src="https://api.promental.net/images/website/article-1.png" alt="">
                </div>
                <div class="article-text">
                  <!--                  {{ other_article.body | subBody }}-->
                  {{ (current_lang == 'ar' ? other_article.body : other_article.body_en) | subBody }}
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>

        <div class="col-xs-12">
          <!--  Section title  -->
          <div class="articles-section-title articles-side">
            <span>{{ $t('most_viewed') }}</span>
          </div>
          <!--  Articles  -->
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-4"
                 v-for="(most_viewed_article,index) in most_viewed_articles"
                 :key="most_viewed_article.id">
              <nuxt-link
                :to="localePath('/articles/'+most_viewed_article.id)"
                class="article-side">
                <div class="article-img">
                  <img src="https://api.promental.net/images/website/article-1.png" alt="">
                </div>
                <div class="article-text">
                  <!--                  {{ most_viewed_article.body | subBody }}-->
                  {{ (current_lang == 'ar' ? most_viewed_article.body : most_viewed_article.body_en) | subBody }}
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleHeader from '../../layouts/ArticleHeader'

export default {
  layout: 'ArticleHeader',
  middleware: 'doctor',
  head() {
    return {
      title: 'ArticleAdd',
    };
  },

  data() {

    return {
      most_viewed_articles: {},
      other_articles: {},
      formErrors: [],
      title: '',
      title_en: '',
      body: '',
      body_en: '',
      cover: '',
      general_settings: {},
      email: '',
      message: '',
      diseases: {},
      disease_id: 0,
      loading: false
    }
  },
  mounted() {
    this.getMostViewedArticles();
    this.getArticles();
    this.getGeneralSettings();
    this.getDiseases();
  },
  methods: {
    getDiseases() {
      this.$axios.$get('/website/articles/diseases')
        .then(response => {
          this.diseases = response.data;
        })
    },
    getMostViewedArticles() {
      this.$axios.$get('/website/articles/mostViewed')
        .then(response => {
          this.most_viewed_articles = response.data
        })
    },
    getArticles() {
      this.$axios.$get('/website/articles')
        .then(response => {
          this.other_articles = response.data
        })
    },
    addArticle() {
      this.$axios.$post('/doctors/addArticle', {
        title: this.title,
        title_en: this.title_en,
        body: this.body,
        body_en: this.body_en,
        cover: this.cover,
        disease_id: this.disease_id
      })
        .then(response => {
          this.loading = true
          if (response.status == '500') {
            this.loading = false
            if (this.current_lang == 'en') {
              this.formErrors.push('auth required')
            } else if (this.current_lang == 'ar') {
              this.formErrors.push('يرجي تسجيل الدخول  ')
            }

          } else if (response.status == '204') {
            this.loading = false
            if (this.current_lang == 'en') {
              this.formErrors.push('allowed only for doctors')
            } else if (this.current_lang == 'ar') {
              this.formErrors.push(' متاح للمعالجين فقط ')
            }
          } else if (response.status == '200') {
            this.formErrors = [];
            this.$router.push(this.localePath('/articles'))
          }

        })
    }
    ,
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return
      }
      this.createImage(files[0])
    }
    ,
    createImage(file) {
      var cover = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.cover = e.target.result
      };
      reader.readAsDataURL(file)
    }
    ,
    getGeneralSettings() {
      this.$axios.$get('/setting')
        .then(response => {
          this.general_settings = response.data;
        })
    }
    ,
    formValidate(e) {
      this.formErrors = [];
      if (!this.title) {
        if (this.current_lang == 'en') {
          this.formErrors.push('title can not be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('العنوان مطلوب');
        }
      }
      if (!this.title_en) {
        if (this.current_lang == 'en') {
          this.formErrors.push('title en can not be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('العنوان بالانجليزيه مطلوب');
        }
      }
      if (this.title && this.title.length < 3) {
        if (this.current_lang == 'en') {
          this.formErrors.push('title can not be less than 3 letters');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('العنوان اقل من 3 حروف');
        }
      }

      if (this.title_en && this.title_en.length < 3) {
        if (this.current_lang == 'en') {
          this.formErrors.push('title en can not be less than 3 letters');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('العنوان بالانجليزيه اقل من 3 حروف');
        }
      }
      if (!this.body) {
        if (this.current_lang == 'en') {
          this.formErrors.push('body cannot be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push(' المحتوي فارغ ');
        }
      }
      if (!this.body_en) {
        if (this.current_lang == 'en') {
          this.formErrors.push('body en cannot be empty');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push(' المحتوي بالانجليزيه فارغ ');
        }
      }
      if (this.body && this.body.length < 10) {
        if (this.current_lang == 'en') {
          this.formErrors.push('body too short');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push(' المحتوي قصير جدا ');
        }
      }
      if (this.body_en && this.body_en.length < 10) {
        if (this.current_lang == 'en') {
          this.formErrors.push('body en too short');
        } else if (this.current_lang == 'ar') {
          this.formErrors.push(' المحتوي بالانجليزيه قصير جدا ');
        }
      }
      if (!this.cover) {
        if (this.current_lang == 'en') {
          this.formErrors.push('cover required');
        } else {
          this.formErrors.push(' الغلاف فارغ ');
        }
      } else {
        this.addArticle();
      }
      e.preventDefault();
    }
  }
  ,
  computed: {
    current_lang() {
      return this.$i18n.locale
    }
  }
  ,
}
</script>

<style scoped>
.container {
  padding-top: 70px
}
</style>

