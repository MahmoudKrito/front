<template>
  <div class="dashboard">
    <div :clas="{rtl:current_lang === 'ar'}">
      <!-- Content -->
      <main class="main-wrapper">
        <StudentSide></StudentSide>
        <section class="content-wrapper">
          <!-- Content -->
          <div class="container-fluid">
            <div class="main-content">
              <div class="content-side">
                <!--  -->
                <div class="section-wrapper section-custom">
                  <div class="media doctor-media">
                    <div class="media-left">
                      <img :src="doctor.avatar" alt="" class="media-object">
                    </div>
                    <div class="media-body media-middle">
                      <div class="media-heading">
                        {{ doctor.first_name }} {{ doctor.last_name }}
                      </div>
                    </div>
                  </div>

                  <div class="section-footer">
                    <div class="text-right">
                      <div class="call-img">
                        <AgoraVideoCall
                          :videoProfile="videoProfile"
                          :channel="channel"
                          :transcode="transcode"
                          :attendeeMode="attendeeMode"
                          :baseMode="baseMode"
                          :appId="appId"
                          :uid="uid"></AgoraVideoCall>
                      </div>
                    </div>
                    <div class="text-right">
<!--                      <nuxt-link :to="localePath('/students/dashboard/sessions/'+session_slug+'/report')"-->
<!--                                 class="btn end-session-btn">-->
<!--                        <img src="https://api.promental.net/images/website/Group696.svg" alt="">-->
<!--                        {{ $t('end_video_call') }}-->
<!--                      </nuxt-link>-->

                    </div>
                  </div>
                </div>
              </div>
              <studentNotifications></studentNotifications>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>


<script>
import StudentSide from '@/layouts/StudentSideD';
import AgoraVideoCall from "~/components/agora/AgoraVideoCall";
import {AGORA_APP_ID} from "~/components/agora/agora.config"
import studentNotifications from "~/components/studentNotifications"

export default {
  layout: 'StudentHeaderD',
  head() {
    return {
      title: 'Session-ongoing',
    };
  },
  components: {StudentSide, AgoraVideoCall, studentNotifications},
  data() {
    return {
      session_slug: this.$route.params.slug,
      user: this.$auth.user.user,
      school: this.$auth.user.school,
      videoProfile: "480p_4",
      channel: this.$route.params.slug,
      transcode: "interop",
      attendeeMode: "video",
      baseMode: "avc",
      uid: undefined,
      session:{},
      doctor:{}
    }
  },
  created() {
    this.appId = AGORA_APP_ID
    if (!this.appId) {
      return alert('Get App ID first!')
    }
    setInterval(() => this.getSessionTime(), 60000);
    setInterval(() => this.getSessionStatus(), 60000);
  },
  mounted(){
    this.getSession()
  },
  methods: {
    getSessionStatus() {
      this.$axios.get('/student/sessions/' + this.session_slug + '/getStatus').then(response => {
        this.status_id = response.data.data
        // this.$store.state.status_id = this.status_id
        // console.log(this.$store.state.status_id)
        if (this.status_id == 3) {
          this.$router.push(this.localePath('/students/dashboard/sessions/' + this.session_slug + '/report'))
        }
      })
    },
    getSession() {
      this.$axios.$get('/student/sessions/' + this.session_slug + '/show')
        .then(response => {
          this.session = response.data;
          this.doctor = response.doctor;
        })
    },
    getSessionTime() {
      this.$axios.$get('/student/sessions/' + this.session_slug + '/getSessionTime')
        .then(response => {
          if (response.status == '200') {
            this.session_time = response.data;
            if (this.session_time == 0) {
              this.$router.push(this.localePath('/students/dashboard/sessions/' + this.session_slug + '/report'));
            }
          } else if (response.status == '201') {
            this.$router.push(this.localePath('/students/dashboard/sessions/' + this.session_slug + '/report'));
          }

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

.main-wrapper{
  padding-top:100px;
}

*:not(i):not(.end-session-btn):not(.call-img) {
}

*:not(i) {
  font-family: 'Montserrat', 'Cairo', serif, Arial;
}

.end-session-btn {
  min-width: 230px !important;
  border-radius: 0px !important;
  text-align: center;
}

.text-right {
  text-align: right !important;
}

#ag-canvas {
  height: 500px !important;
}

.ag-item :first-child {
  border-radius: 6px;
}

.ag-item {
  border-radius: 6px;
  border: 2px #00B6ED solid;
  background: url('../../../../../assets/images/avatar.png') center no-repeat;
  height: 100%;
  width: 100%;
}

#ag-resize-container {
  background-image: none !important;
  background-color: black;
  display: flex;
  justify-content: center;
  height: center;
}

#ag-resize-container .ag-item {
  border: none !important;
}


/* button group */

.ag-btn-group {
  height: 70px;
  width: calc(100% - 60px);
  margin: 0 auto;
  position: absolute;
  bottom: 0;
  background: transparent;
  z-index: 11;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.ag-btn-group:hover,
.ag-btn-group.active {
  background: rgba(18, 74, 99, .8);
}

.ag-btn {
  z-index: 12;
  opacity: 0;
  color: white;
  /* width: 35px;
    height: 35px; */
  cursor: pointer;
  font-size: 60px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.ag-btn:hover {
  color: #00B6ED;
}

.ag-btn.disabled,
.ag-btn.disabled:hover {
  color: #637C8E;
  cursor: not-allowed;
}

.ag-btn-group:hover .ag-btn,
.ag-btn-group.active .ag-btn {
  opacity: 1;
}

.ag-btn.off.videoControlBtn .ag-icon-camera {
  display: none;
}

.ag-btn.videoControlBtn .ag-icon-camera-off {
  display: none;
}

.ag-btn.videoControlBtn .ag-icon-camera {
  display: inline-block;
}

.ag-btn.off.videoControlBtn .ag-icon-camera-off {
  display: inline-block;
}

.ag-btn.off.audioControlBtn .ag-icon-mic {
  display: none;
}

.ag-btn.audioControlBtn .ag-icon-mic-off {
  display: none;
}

.ag-btn.audioControlBtn .ag-icon-mic {
  display: inline-block;
}

.ag-btn.off.audioControlBtn .ag-icon-mic-off {
  display: inline-block;
}
</style>


<style>
body {
  background: #EDEDED !important;
  transition: all 0.5s ease-in-out !important;
  padding-top: 80px !important;
}

.dark-mode {
  color: #fff !important;
  background: #102331 !important;
}

</style>
