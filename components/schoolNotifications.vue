<template>
  <div class="notification-side student-notifications">
    <ul class="">
      <li v-for="(notification,index) in notifications">
        <a href="">
          <div class="notification">
            <div class="notification-details">
              {{ notification.body }}
            </div>
            <div class="notification-time">
              {{
                notification.created_at |
                  formatDateByDay
              }} {{ notification.created_at | formatDateByMonth }}
              {{ notification.created_at | formatDateByYear }}
            </div>
          </div>
        </a>
      </li>
      <li>
        <hr>
      </li>
    </ul>
    <div class="arrow-icon">
      <img src="https://api.promental.net/images/website/Group471.svg" alt="">
    </div>
    <!-- -->
    <schoolSubscription></schoolSubscription>
  </div>
</template>
<script>
import schoolSubscription from './schoolSubscription.Vue'
export default {
  components: {
    schoolSubscription
  },
  data() {
    return {
      notifications: {}
    }
  },
  mounted() {
    this.getNotifications()
  },
  methods: {
    getNotifications() {
      this.$axios.$get('/school/notifications')
        .then(response => {
          this.notifications = response.data;
        })
    },
  }
}

</script>
