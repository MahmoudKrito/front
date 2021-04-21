<template>
  <div class="dashboard">
    <div :class="{rtl:current_lang === 'ar'}">
      <main class="main-wrapper">
        <DoctorSide></DoctorSide>
        <section class="content-wrapper">

          <!-- Content -->
          <div class="container-fluid">
            <div class="main-content">
              <div class="content-side">
                <!--  -->
                <div class="section-wrapper">
                  <div class="section-title">
                    {{ $t('new_sessions') }}
                  </div>

                  <div class="doctors-block">
                    <div class="session-header">
                      <div class="student-name">
                        {{ user.first_name }} {{ user.last_name }}
                        <!--                      <a href="#" class="btn btn-primary">{{ $t('profile') }}</a>-->

                      </div>
                      <div class="session-time">
                        {{ session_time }}
                      </div>
                      <span class="text-right">
<!--                    <nuxt-link :to="localePath('/doctors/dashboard/sessions/'+session_slug+'/session-add-report')"-->
                        <!--                               class="btn end-session-btn">-->
                        <!--                      <a href="#" @click.prevent="captureWebcam" class="btn end-session-btn">-->
                        <!--                           <img src="~/assets/images/Group696.svg" alt="">-->
                        <!--                                           {{ $t('end_video_calling') }}-->
                        <!--                      </a>-->

                        <!--                      </nuxt-link>-->

                  </span>

                    </div>
                    <div class="row">
                      <div class="col-xs-12 col-lg-8">
                        <div class="section-wrapper">

                          <div class="text-right">
                            <div class="call-img" id="video">
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
                        </div>
                      </div>
                      <div class="col-xs-12 col-lg-4">
                        <div class="report-wrapper" v-for="note,index in notes">
                          {{ note }}
                        </div>
                        <div class="form-group">
                                            <textarea class="form-control" rows="5"
                                                      :placeholder="current_lang=='en' ? 'Add notes here' : 'اترك ملاحظتك هنا'"
                                                      v-model="body"></textarea>
                          <small class="text-danger" v-if="message">{{ message }}</small>
                        </div>
                        <div class="form-group text-right">
                          <button class="btn btn-main" @click.prevent="addNote()"
                                  style="color:#fff !important"> {{ $t('add') }}
                          </button>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <doctorNotifications></doctorNotifications>
            </div>
          </div>

        </section>
      </main>
    </div>
  </div>
</template>
<script>
import DoctorSide from '~/layouts/DoctorSide'
import AgoraVideoCall from "~/components/agora/AgoraVideoCall";
import {AGORA_APP_ID} from "~/components/agora/agora.config";
import doctorNotifications from "@/components/doctorNotifications";

export default {
  head() {
    return {
      title: 'session-ongoing',
    };
  },
  layout: 'DoctorHeaderD',
  components: {DoctorSide, AgoraVideoCall, doctorNotifications},
  middleware: 'doctorSuspend',
  data() {
    return {
      session_slug: this.$route.params.slug,
      user: {},
      body: '',
      notes: [],
      message: '',
      videoProfile: "480p_4",
      channel: this.$route.params.slug,
      transcode: "interop",
      attendeeMode: "video",
      baseMode: "avc",
      uid: undefined,
      session_time: '',
      status_id: 0
    }
  },
  mounted() {
    this.getNotes();
    this.getSessionTime()
    this.getSessionStatus()
  },
  created() {
    this.appId = AGORA_APP_ID
    if (!this.appId) {
      return alert('Get App ID first!')
    }
    setInterval(() => this.getSessionTime(), 60000);
    setInterval(() => this.getSessionStatus(), 60000);
  },
  methods: {
    getSessionStatus() {
      this.$axios.get('/doctors/sessions/' + this.session_slug + '/getStatus').then(response => {
        this.status_id = response.data.data

        // this.$store.state.status_id = this.status_id
        // console.log(this.$store.state.status_id)

        if (this.status_id == 3) {
          this.$router.push(this.localePath('/doctors/dashboard/sessions/' + this.session_slug + '/session-add-report'))
        }
      })
    },
    getSessionTime() {
      this.$axios.$get('/doctors/sessions/' + this.session_slug + '/getSessionTime')
        .then(response => {
          if (response.status == '200') {
            this.session_time = response.data;
            if (this.session_time == 0) {
              this.$axios.get('/doctors/sessions/' + this.session_slug + '/updateIsDoneStatus')
                .then(response => {
                  console.log(response)
                })
              this.$router.push(this.localePath('/doctors/dashboard/sessions/' + this.session_slug + '/session-add-report'));
            }
          } else if (response.status == '201') {
            this.$axios.get('/doctors/sessions/' + this.session_slug + '/updateIsDoneStatus')
              .then(response => {
                console.log(response)
              })
            this.$router.push(this.localePath('/doctors/dashboard/sessions/' + this.session_slug + '/session-add-report'));
          }

        })
    },
    getNotes() {
      this.$axios.$get('/doctors/sessions/' + this.session_slug + '/notes')
        .then(response => {
          if (response.data) {
            this.notes = JSON.parse(response.data)
          } else {
            this.notes = []
          }

        })
    },
    addNote() {
      if (!this.body) {
        if (this.current_lang == 'en') {
          this.message = 'enter your note'
        } else if (this.current_lang == 'ar') {
          this.message = ' ادخل ملاحظتك هنا'
        }

      } else {
        this.message = '';
        this.$axios.$post('/doctors/sessions/' + this.session_slug + '/addSessionNote', {
          body: this.body
        })
          .then(response => {
            this.notes.push(this.body);
            this.body = ''
          })
      }
    }
  },
  computed: {
    current_lang() {
      return this.$i18n.locale
    }
  }
}
</script>

<style scoped>
*:not(i) {
  font-family: 'Montserrat', 'Cairo', serif, Arial;
}

.btn-main {
  background: #2BB788 !important;
  margin-top: 20px !important;
}

.end-session-btn {
  min-width: 250px !important;
  border-radius: 0px !important;
  padding-left: 10px !important;
  padding-right: 10px !important;
}

#ag-canvas {
  height: 500px !important;
  width: 500px !important;
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
