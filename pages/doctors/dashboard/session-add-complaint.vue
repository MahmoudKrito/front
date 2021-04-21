<template>
  <div class="dashboard">
    <div :class="{rtl:current_lang === 'ar'}">
      <!-- Content -->
      <main class="main-wrapper">

        <Side></Side>

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
                    <div class="">
                      <div class=" margin-50">
                        <p>
                          <img src="https://api.promental.net/images/website/icon-complaint.svg" alt="">
                          Complaint about <span class="bold">{{ first_name }} {{ last_name }}</span> .
                        </p>
                        <form action="" class="margin-20">
                          <div class="form-group">
                                                <textarea class="form-control" name="" id="" rows="6"
                                                          placeholder="Leave your text here..."
                                                          v-model="body"></textarea>
                            <small class="text-danger" v-if="message">{{ message }}</small>
                          </div>
                          <div class="text-right">
                            <a href="" class="btn btn-primary"
                               @click.prevent="addComplaint()">{{ $t('add') }}</a>
                          </div>
                        </form>
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
import Side from '../../../layouts/DoctorSide'

import doctorNotifications from "@/components/doctorNotifications";

export default {
  components: {Side, doctorNotifications},
  layout: 'DoctorHeaderD',
  middleware: 'doctorSuspend',
  data() {
    return {
      first_name: '',
      last_name: '',
      body: '',
      session_id: '',
      message: '',
    }
  },
  mounted() {
    this.get_data()
  },
  methods: {
    get_data() {
      if (process.client) {
        this.first_name = localStorage.getItem('first_name')
        this.last_name = localStorage.getItem('last_name')
        this.session_id = localStorage.getItem('session_id')
      }
    },
    addComplaint() {
      if (!this.body) {
        this.message = 'add your complaint'
      } else {
        this.message = '';
        this.$axios.$post('doctors/sessions/' + this.session_id + '/addComplaint', {
          body: this.body
        })
          .then(response => {
            this.$swal('complaint added');
            localStorage.setItem('complaint_number', response.data.data.number);
            this.$router.push('/dashboard-doctor-complaint-confirm')
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
  font-family: 'Montserrat', serif, Arial;
}

.btn {
  margin-top: 20px !important;
  margin-left: 80% !important;
  text-align: center !important;
}
</style>

