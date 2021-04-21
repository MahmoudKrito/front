<template>
  <div :class="{rtl : current_lang === 'ar'}">
    <div class="container" style="padding-top:70px">
      <div class="profile-wrapper">
        <div class="profile-side">
          <div class="user-wrapper">
            <div class="user-img">
              <img src="~/assets/images/Group1699.svg" alt="">
            </div>
            <div class="user-details">
              <div class="user-name">{{ this.user.name }} {{ this.user.last_name }}</div>
              <div class="user-phone">{{ this.user.phone }}</div>
              <div class="user-email">{{ this.user.email }}</div>
            </div>
          </div>
        </div>
        <div class="profile-content">
          <div class="profile-header"></div>
          <div class="profile-body">
            <div class="col-xs-12 text-center">
              <div class="margin-bottom-50">
                <img src="~/assets/images/history.svg" alt="" width="100">
              </div>

              <p class="margin-20 font-size-18" v-if="error_message2">
                {{ error_message2 }}
                <br>
              </p>

              <p class="margin-20 font-size-18" v-if="error_message">
                {{ error_message }}
                <br>
              </p>

              <!--              /////////////////when session time is not coming yet-->
              <p class="margin-20 font-size-18" v-if="message">
                {{ message }}
                <br>
              </p>

              <div v-else>
                <p class="margin-20 font-size-18">
                  {{ message1 }}
                  <br>
                  {{ message2 }}
                </p>

                <p class="margin-20 font-size-18">
                  {{ message3 }}
                  <br>
                  {{ message4 }}
                </p>


                <AgoraVideoCall
                  :videoProfile="videoProfile"
                  :channel="channel"
                  :transcode="transcode"
                  :attendeeMode="attendeeMode"
                  :baseMode="baseMode"
                  :appId="appId"
                  :uid="uid" v-if="isLoaded"></AgoraVideoCall>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AgoraVideoCall from "~/components/agora/AgoraVideoCall";
import {AGORA_APP_ID} from "~/components/agora/agora.config"

export default {
  layout: 'mainHeader',
  components: {AgoraVideoCall},
  middleware: 'user',
  head() {
    return {
      title: 'WaitSession',
    };
  },
  data() {
    return {
      general_settings: {},
      user: {},
      videoProfile: "480p_4",
      channel: this.$route.params.slug,
      transcode: "interop",
      attendeeMode: "video",
      baseMode: "avc",
      uid: undefined,
      message1: '',
      message2: '',
      message3: '',
      message4: '',
      isLoaded: false,
      session_slug: this.$route.params.slug,
      error_message: "",
      error_message2: '',
      message: '',
      status_id: 0
    }
  },
  created() {
    this.appId = AGORA_APP_ID
    if (!this.appId) {
      return alert('Get App ID first!')
    }
    if (!this.isLoaded) {
      setInterval(() => this.getSessionTime(), 60000);
    }
    setInterval(() => this.getSessionStatus(), 60000);
  },
  mounted() {
    this.storage();
    this.getSessionTime();
    this.getSessionStatus()
  },
  methods: {
    storage() {
      this.user = this.$auth.user.user;
    },
    getSessionStatus() {
      this.$axios.get('/doctors/sessions/' + this.session_slug + '/getStatus').then(response => {
        this.status_id = response.data.data
        if (this.status_id == 3) {
          this.$router.push(this.localePath('/User/sessions/'))
        }
      })
    },
    getGeneralSettings() {
      this.$axios.$get('/setting')
        .then(response => {
          this.general_settings = response.data;
        })
    },
    getSessionTime() {
      this.$axios.get('/user/' + this.session_slug + '/getSessionTime')
        .then(response => {
          console.log(response.data.status);

          if (response.data.status == '500') {
            if (response.data.error_message2) {
              if (this.current_lang == 'ar') {
                this.error_message2 = 'وقت الجلسه لم ياتي بعد';
                this.error_message = 'تاريخ الجلسه: '+response.data.data;
              } else if (this.current_lang == 'en') {
                this.error_message2 = 'session time is not coming yet';
                this.error_message = 'Session Date: '+response.data.data;
              }
            }
          }
          else if (response.data.status == 501) {
            console.log(response.data.status);
            if (response.data.error_message2) {
              if (this.current_lang == 'ar') {
                this.error_message2 = 'ناسف لك , لقد فاتك ميعاد الجلسه';
                this.error_message = 'تاريخ الجلسه: '+response.data.data;
              } else if (this.current_lang == 'en') {
                this.error_message2 = 'Sorry, Your session date is out';
                this.error_message = 'Session Date: '+response.data.data;
              }
            }
          }
          else if (response.data.status == '204') {
            console.log(response.data.message);
            this.error_message2 = '';
            this.error_message = '';
            if (this.current_lang == 'en') {
              this.message1 = ' Please wait for the session';
              this.message2 = 'The time remaining on the session time is' + ' ' + response.data.data;
              this.message3 = ' Please be at This page';
              this.message4 = ' Before the appointment to maintain your reservation';
            } else if (this.current_lang == 'ar') {
              this.message1 = 'برجاء الانتظار لحين موعد الجلسة ';
              this.message2 = 'متبقي من الوقت على موعد الجلسة ' + ' ' + response.data.data;
              this.message3 = ' برجاء التواجد في هذه الصفحة';
              this.message4 = ' قبل الموعد للحفاظ على الحجز الخاص بك';
            }
          }
          else if (response.data.status == 200) {
            this.error_message2 = '';
            this.error_message = '';
            this.message1 = '';
            this.message2 = '';
            this.message3 = '';
            this.message4 = '';
            this.isLoaded = true;
          }
          else if (response.data.status == '201') {
            this.error_message2 = '';
            this.error_message = '';
            if (this.current_lang == 'ar') {
              this.message = 'وقت الجلسه منتهي '
            } else if (this.current_lang == 'en') {
              this.message = 'session is time out'
            }
          }
        })
    }
  },
  computed: {
    current_lang() {
      return this.$i18n.locale
    }
  },
}
</script>

<style scoped>

#ag-canvas {
  height: 500px;
}

.ag-item :first-child {
  border-radius: 6px;
}

.ag-item {
  border-radius: 6px;
  border: 2px #00B6ED solid;
  background: url('../../../../assets/images/avatar.png') center no-repeat;
  height: 100%;
  width: 100%;
}

#ag-resize-container {
  background-image: none !important;
  background-color: black;
  display: flex;
  justify-content: center;
  /*height: center;*/
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
