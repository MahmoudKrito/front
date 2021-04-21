<template>
  <div class="dashboard">
    <div :class="{rtl:current_lang === 'ar'}">
      <!-- Content -->
      <main class="main-wrapper">
        <DoctorSide></DoctorSide>
        <section class="content-wrapper">

          <!-- Content -->
          <div class="container-fluid">
            <div class="main-content">
              <div class="content-side">

                <!--  -->
                <div class="section-wrapper section-custom section-custom-2">
                  <form action="">
                    <div class="alert alert-danger" v-if="formErrors.length > 0">
                      <p v-for="(error,index) in formErrors">{{ error }}</p>
                    </div>
                    <div class="complaint-sections">
                      <div class="complaint-title">
                        <img src="~/assets/images/icon-complaint.svg" alt="">
                        {{ $t('payment_data') }}
                      </div>
                    </div>
                  </form>


                  <form>
                    <div class="form-group row">
                      <div class="col-6">
                        <label>active postal</label>
                      </div>
                      <div class="col-6">
                        <!--                    <input type="radio" name="postal_status" class="form-control">-->
                        <label class="switch-mode" style="border:1px solid gray;border-radius:40%">
                          <input type="checkbox" name="postal_status" v-model="postal_status"
                                 :checked="doctor.postal_status == 1 ? 'checked' : ''">
                          <span class="slider round"></span>
                        </label>
                      </div>

                    </div>
                    <div class="form-group row" style="margin-bottom:20px">
                      <input type="text" name="postal_client_name" placeholder="Postal User Name" class="form-control"
                             v-model="postal_client_name"  :disabled="posta_ind">
                    </div>
                    <div class="form-group row" style="margin-bottom:20px">
                      <input type="text" name="postal_national_id" placeholder="Postal National Id"
                             class="form-control" v-model="postal_national_id" :disabled="posta_ind">
                    </div>
                    <hr>
                    <div class="form-group row" style="margin-bottom:20px">
                      <div class="col-6">
                        <label>active Wallet</label>
                      </div>
                      <div class="col-6">
                        <label class="switch-mode" style="border:1px solid gray;border-radius:40%">
                          <input type="checkbox" name="vodafone_status" v-model="vodafone_status"
                                 :checked="doctor.vodafone_status == 1 ? 'checked' : ''">
                          <span class="slider round"></span>
                        </label>
                      </div>
                    </div>
                    <div class="form-group row" style="margin-bottom:20px">
                      <input type="text" name="vodafone_number" placeholder="Phone Number" class="form-control"
                             v-model="vodafone_number" :disabled="vodafone_ind">
                    </div>
                    <hr>

                    <div class="form-group row" style="margin-bottom:20px">
                      <div class="col-6">
                        <label>active Bank</label>
                      </div>
                      <div class="col-6">
                        <!--                    <input type="radio" name="postal_status" class="form-control">-->
                        <label class="switch-mode" style="border:1px solid gray;border-radius:40%">
                          <input type="checkbox" name="bank_account_status" v-model="bank_account_status"
                                 :checked="doctor.bank_account_status == 1 ? 'checked' : ''">
                          <span class="slider round"></span>
                        </label>
                      </div>
                    </div>

                    <div class="form-group row" style="margin-bottom:20px">
                      <input type="text" name="bank_account_username" v-model="bank_account_username"
                             placeholder="Bank Account UserName "
                             class="form-control" :disabled="bank_ind">
                    </div>

                    <div class="form-group row" style="margin-bottom:20px">
                      <input type="text" name="bank_account_number" v-model="bank_account_number"
                             placeholder="Bank Account Number " class="form-control" :disabled="bank_ind">
                    </div>


                    <div class="form-group row" style="margin-bottom:20px">
                      <!--                    <input type="text" name="bank_branch" placeholder="Bank Branch" class="form-control"-->
                      <!--                           v-model="bank_branch">-->
                      <input type="text" name="bank_branch" v-model="bank_branch"
                             placeholder="Bank Branch" class="form-control" :disabled="bank_ind">
                    </div>

                    <div class="section-footer">
                      <div class="text-right">
                        <a href="#" class="btn btn-primary"
                           @click.prevent="formValidate($event)">{{ $t('edit') }}</a>
                      </div>
                    </div>
                  </form>


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
import DoctorSide from '~/layouts/DoctorSide';
import doctorNotifications from "@/components/doctorNotifications";

export default {
  head() {
    return {
      title: 'payment-data',
    };
  },
  layout: 'DoctorHeaderD',
  components: {DoctorSide, doctorNotifications},
  middleware:'doctorSuspend',
  data() {
    return {
      formErrors: [],
      doctor: {},
      postal_national_id: '',
      postal_client_name: '',
      vodafone_number: '',
      bank_account_username: '',
      bank_account_number: '',
      bank_branch: '',
      bank_account_status: '',
      vodafone_status: '',
      postal_status: '',
      user_id: this.$auth.user.user.id,

    }
  },
  mounted() {
    this.getPaymentData()
  },
  methods: {
    getPaymentData() {
      this.$axios.get('/doctors/paymentMethods')
        .then(response => {
          console.log(response)
          this.doctor = response.data.data;
          this.postal_national_id = response.data.data.postal_national_id;
          this.vodafone_number = response.data.data.vodafone_number;
          this.bank_account_username = response.data.data.bank_account_username;
          this.bank_account_number = response.data.data.bank_account_number;
          this.bank_branch = response.data.data.bank_branch;
          this.bank_account_status = response.data.data.bank_account_status;
          this.postal_status = response.data.data.postal_status;
          this.vodafone_status = response.data.data.vodafone_status;
          this.postal_client_name = response.data.data.postal_client_name
        })
    },
    formValidate(e) {
      e.preventDefault()
      this.formErrors = [];
      if (!this.postal_status && !this.vodafone_status && !this.bank_account_status) {
        if (this.current_lang == 'en') {
          this.formErrors.push('activate one of methods at least')
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('اختار طريقه واحده للدفع علي الاقل')
        }

      }
      if (this.postal_status && !this.postal_national_id && !this.postal_client_name) {
        if (this.current_lang == 'en' && !this.postal_national_id) {
          this.formErrors.push('add your postal national id')
        } else if (this.current_lang == 'ar' && !this.postal_national_id) {
          this.formErrors.push('اضف الرقم البريدي ')
        }

        if (this.current_lang == 'en' && !this.postal_client_name) {
          this.formErrors.push('add your postal user name')
        } else if (this.current_lang == 'ar' && !this.postal_client_name) {
          this.formErrors.push('اضف الاسم البريدي  ')
        }
      }

      if (this.vodafone_status && !this.vodafone_number) {
        if (this.current_lang == 'en') {
          this.formErrors.push('add your vodafone number')
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('اضف رقم فودافون ')
        }

      }
      if (this.bank_account_status && !this.bank_account_username) {
        if (this.current_lang == 'en') {
          this.formErrors.push('enter bank account user name')
        } else if (this.current_lang == 'ar') {
          this.formErrors.push(' ادخل اسم المستخدم لحساب البنك ')
        }
      }
      if (this.bank_account_status && !this.bank_account_number) {
        if (this.current_lang == 'en') {
          this.formErrors.push('enter bank account number')
        } else if (this.current_lang == 'ar') {
          this.formErrors.push(' ادخل رقم حساب البنك   ')
        }
      }
      if (this.bank_account_status && !this.bank_branch) {
        if (this.current_lang == 'en') {
          this.formErrors.push('enter bank account branch')
        } else if (this.current_lang == 'ar') {
          this.formErrors.push(' ادخل اسم الفرع ')
        }
      } else if (this.formErrors.length == 0) {
        this.updatePaymentMethods()
      }

    },
    updatePaymentMethods() {
      this.$axios.post('/doctors/paymentMethods/update', {
        user_id: this.user_id,
        postal_status: this.postal_status,
        postal_national_id: this.postal_national_id,
        vodafone_status: this.vodafone_status,
        bank_account_status: this.bank_account_status,
        vodafone_number: this.vodafone_number,
        bank_account_username: this.bank_account_username,
        bank_account_number: this.bank_account_number,
        bank_branch: this.bank_branch,
        postal_client_name: this.postal_client_name
      })
        .then(response => {
          console.log(response)
          if (response.status == '200') {
            // this.$router.back()
            return true;
          } else if (response.status == '500') {
            if (this.current_lang == 'en') {
              this.formErrors.push('wrong data')
            } else if (this.current_lang == 'ar') {
              this.formErrors.push('معلومات خاطئه')
            }

          }
        })
    }

  },
  computed: {
    current_lang() {
      return this.$i18n.locale
    },
    vodafone_ind(){
      if(this.vodafone_status == 1){
        return false;
      }else{
        return true;
      }
    },
    bank_ind(){
      if(this.bank_account_status == 1){
        return false;
      }else{
        return true;
      }
    },
    posta_ind(){
      if(this.postal_status){
        return false;
      }else{
        return true;
      }
    }
  },
}
</script>

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
