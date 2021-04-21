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
              {{ notification.created_at | formatDateByDay }} {{ notification.created_at | formatDateByMonth }}
              {{ notification.created_at | formatDateByYear }}
            </div>
          </div>
        </a>
      </li>
      <li>
        <hr>
      </li>
    </ul>
    <div class="student-details">
      <div class="student-name">
        <span>{{ school.name }} </span>
        {{ user.first_name }} {{ user.last_name }}
      </div>
      <div class="school-name" v-if="lang == 'en'">
        {{ school.name }} School
      </div>
      <div class="school-name" v-if="lang == 'ar'">
        {{ school.name }} مدرسه
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notifications: {},
      user: this.$auth.user.user,
      school: this.$auth.user.school
    }
  },
  mounted() {
    this.getNotifications()
  },
  methods: {
    getNotifications() {
      this.$axios.$get('/student/notifications')
        .then(response => {
          this.notifications = response.data;
        })
    },
  },
  computed: {
    lang() {
      let str = this.$route.path;
      let n = str.includes("/ar");
      if (n) {
        return 'ar'
      } else {
        return 'en'
      }
    }
  }
}
</script>
