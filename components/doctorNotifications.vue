<template>
  <div class="notification-side student-notifications">
    <ul class="">
      <li v-for="(notification,index) in notifications" v-if="index<2">
        <a href="">
          <div class="notification">
            <div class="notification-details">
              {{ notification.body }}
            </div>
            <div class="notification-time">{{
                notification.created_at |
                  formatDateByDay
              }} {{ notification.created_at | formatDateByMonth }}
              {{ notification.created_at | formatDateByYear }}
            </div>
          </div>
        </a>
      </li>
    </ul>

    <div class="arrow-icon">
      <img src="https://api.promental.net/images/website/Group471.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
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
      this.$axios.$get('/doctors/notifications')
        .then(response => {
          this.notifications = response.data;
        })
    },
  }

}
</script>

