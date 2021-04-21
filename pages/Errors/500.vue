<template>

  <div>
    <main-header></main-header>
    <div class="container">
      <div class="error-wrapper">
        <div class="error-img">
          <img src="../../assets/images/500.svg" alt="">
        </div>
        <div class="error-text">
          <div class="error-text-1">OOPS..</div>
          <div class="error-text-2">Page not found!</div>
          <div class="error-text-3">We can’t reach this page now, please try again later.</div>
          <div class="error-text-4">Error 500</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import MainHeader from "../../layouts/mainHeader";

  export default {
    head() {
      return {
        title: '500 Error',
        link: [
          {
            rel: "stylesheet",
            href: "/bootstrap.min.css"
          },
          {
            rel: "stylesheet",
            href: "/style.css"
          },
        ]
      };
    },
    components: {MainHeader}
  }
</script>

<style scoped>
  .container{
    margin-top: 70px;
  }
</style>
