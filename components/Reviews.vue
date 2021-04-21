<template>
  <section class="testimonial-wrapper">
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-3">
          <div class="testimonials-title">
            <img src="https://api.promental.net/images/website/testimonial.svg" alt="" v-if="current_lang == 'ar'">
            <img src="https://api.promental.net/images/website/testimonial_en.png" alt="" v-if="current_lang == 'en'">
          </div>
        </div>

        <div class="col-xs-12 col-md-9">
          <VueSlickCarousel v-bind="slider_options" ref="slick" v-if="reviews_ready && reviews.length > 0">
            <div v-for="(review,index) in reviews" :key="index">
              <div>
                <div class="testimonial-item">
                  <div class="testimonial-name" v-if="review.user">
                    <img :src="review.user.avatar" alt="">

                  </div>
                  <div class="testimonial-content">
                    {{ review.body }}
                  </div>
                </div>
              </div>
            </div>
          </VueSlickCarousel>

          <VueSlickCarousel v-bind="slider_options" ref="slick" v-if="reviews.length == 0">
            <div v-for="i in 10">
              <div>
                <div class="testimonial-item">
                  <div class="testimonial-name">
                    <img src="https://api.promental.net/images/website/Rectangle418.png" alt="">
                  </div>
                  <div class="testimonial-content">
                    انشطة الفعّالة اللي بيتم فيها علاج مشاكل صعوبات التعلم، و بناء شخصية الطُلاب. و بنقدم جلسات فردية لأي فرد خارج الأسرة المدرسية , و بتتم عن طريق اختيارك لأحد الأخصائيين او الدكاترة النفسيين الموجودين على الويب سايت. برومنتال تهدف إلى تقدیم كل الطرق و الحلول للوصول لطالب مُعافى نفسیًا واثق من نفسه، فـتزید انتاجیة الشخص و یكون له دور فعّال و مؤثر في المجتمع.
                  </div>
                </div>
              </div>
            </div>
          </VueSlickCarousel>

        </div>

      </div>
    </div>
  </section>
</template>

<script>
  // components: {Carousel, Slide},

  export default {
    data() {
      return {
        slider_options: {
          'centerMode': true,
          'arrows': false,
          'centerPadding': '150',
          'focusOnSelect': true,
          'infinite': true,
          'slidesToShow': 1,
          'autoplay': true,
          'autoplaySpeed': 2000,
          'speed': 1000,
          'slidesToScroll': 1,
          'touchThreshold': 5,
          "vertical": true,
          "verticalSwiping": true,
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

        reviews: {},
        reviews_ready: false,
        slide: 0,
        sliding: null
      }
    },
    mounted() {
      this.getReviews();
    },
    methods: {
      getReviews() {
        this.$axios.get('/website/getReviews')
          .then(response => {
            this.reviews = response.data.data;
            console.log(this.reviews.length)
            if (response.data.data.length > 0) {
              this.reviews_ready = true;
            }
          })
      }
    },
    computed:{
      current_lang(){
        return this.$i18n.locale
      }
    }
  }
</script>
