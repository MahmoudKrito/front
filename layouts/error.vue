<template>
  <div class="container">
    <div class="error-wrapper">
      <div class="error-img" v-if="error.statusCode === 404">
        <img src="~/assets/images/404.svg" alt="">
      </div>
      <div class="error-img" v-else>
        <img src="~/assets/images/500.svg" alt="">
      </div>
      <div class="error-text" v-if="error.statusCode === 404">
        <div class="error-text-1">OOPS..</div>
        <div class="error-text-2">Page not found!</div>
        <div class="error-text-3">We can’t reach this page now, please try again later.</div>
        <div class="error-text-4">Error 404</div>
      </div>
      <div class="error-text" v-else>
        <div class="error-text-1">OOPS..</div>
        <div class="error-text-2">An error has been occured</div>
        <div class="error-text-4">Error 500</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    layout: 'mainHeader',
    props: {
      error: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        pageNotFound: 'هذه الصفحة غير موجودة',
        otherError: 'حدثت مشكلة بالموقع'
      }
    },
    head() {
      const title =
        this.error.statusCode === 404 ? this.pageNotFound : this.otherError
      return {
        title
      }
    }
  }
</script>
<style scoped>
  @import '../assets/css/style.css';
  .container {
    margin-top: 100px;
  }
  .error-wrapper .error-text:before{
    content: '';
    position: absolute;
    top: 0;
    right: -130px;
    background: url('../assets/images/RepeatGrid1.svg') center no-repeat !important;
    background-size: contain;
    width: 360px;
    height: 275px;
    z-index: -2;
  }
</style>
