<template>
  <div :class="{rtl : current_lang === 'ar'}">
    <nuxt/>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    current_lang() {
      return this.$i18n.locale
    }
  },
}
</script>

