<template>
    <div :class="{rtl:current_lang === 'ar'}"  style="padding-top:70px">
        <div v-if="loading" class="loading-page" style="margin-top:100px;">
            <div class="loading"></div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-md-9 col-lg-9" style="margin-right: auto;margin-left: auto">
                    <div class="alert alert-danger" role="alert" v-if="formErrors.length > 0">
                        <ul>
                            <li v-for="(error,index) in formErrors" :key="error.id">{{ error }}</li>
                        </ul>
                    </div>

                    <div class="alert alert-danger" v-if="message">
                        {{ message }}
                    </div>

                    <div class="row">
                        <div class="col-xs-12 col-md-10">
                            <div class="login-form">

                                <div class="login-title write-withUs">
                                    {{ $t('add_contact') }}
                                </div>

                                <form enctype="multipart/form-data">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="fa fa-circle"></i>
                                               {{ $t('name') }}
                                            </span>
                                            <input type="text" class="form-control" v-model="name" placeholder="person">

                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                        <i class="fa fa-circle"></i>
                                        {{ $t('email') }}
                                    </span>

                                            <input type="email" class="form-control" v-model="email"
                                                   placeholder="example@mail.com">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="input-group">
                                                              <span class="input-group-addon">
                                                          <i class="fa fa-circle"></i>
                                                          {{ $t('phone') }}
                                                      </span>

                                            <input type="number" class="form-control" v-model="phone"
                                                   placeholder="02209292929">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                            <i class="fa fa-circle"></i>
                                             {{ $t('message') }}
                                        </span>

                                            <textarea class="form-control" v-model="body" rows="15"></textarea>
                                        </div>
                                    </div>

                                    <div class="form-group text-right margin-top-20">
                                        <button @click="formValidate" class="btn btn-main btn-send" :disabled="loading"
                                                v-text="$t('send')">
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ArticleHeader from '../../layouts/ArticleHeader'

    export default {
        layout: 'mainHeader',
        head() {
            return {
                title: 'Contact-us',
            };
        },

        data() {
            return {
                formErrors: [],
                name: '',
                email: '',
                phone: '',
                general_settings: {},
                message: '',
                loading: false,
                body: ''
            }
        },
        mounted() {
            this.getGeneralSettings();
        },
        methods: {
            getGeneralSettings() {
                this.$axios.$get('/setting')
                    .then(response => {
                        this.general_settings = response.data;
                    })
            }
            ,
            formValidate(e) {
                this.formErrors = [];
                if (!this.name) {
                    if (this.current_lang == 'en') {
                        this.formErrors.push('name can not be empty');
                    } else if (this.current_lang == 'ar') {
                        this.formErrors.push('الاسم مطلوب');
                    }

                }
                if (this.name && this.name.length < 3) {
                    if (this.current_lang == 'en') {
                        this.formErrors.push('name can not be less than 3 letters');
                    } else if (this.current_lang == 'ar') {
                        this.formErrors.push('الاسم اقل من 3 حروف');
                    }
                }
                if (!this.phone) {
                    if (this.current_lang == 'en') {
                        this.formErrors.push('phone can not be empty');
                    } else if (this.current_lang == 'ar') {
                        this.formErrors.push('التليفون مطلوب');
                    }

                }
                if (this.phone && this.phone.length < 11) {
                    if (this.current_lang == 'en') {
                        this.formErrors.push('phone can not be less than 11');
                    } else if (this.current_lang == 'ar') {
                        this.formErrors.push('الرقم اقل من 11 ');
                    }
                }
                if (!this.email) {
                    if (this.current_lang == 'en') {
                        this.formErrors.push('email can not be empty');
                    } else if (this.current_lang == 'ar') {
                        this.formErrors.push('البريد  الاليكتروني مطلوب');
                    }

                }
                if (!this.body) {
                    if (this.current_lang == 'en') {
                        this.formErrors.push('body cannot be empty');
                    } else if (this.current_lang == 'ar') {
                        this.formErrors.push(' المحتوي فارغ ');
                    }
                }
                if (this.body && this.body.length < 10) {
                    if (this.current_lang == 'en') {
                        this.formErrors.push('body too short');
                    } else if (this.current_lang == 'ar') {
                        this.formErrors.push(' المحتوي قصير جدا ');
                    }
                }
                if(this.formErrors.length == 0){
                    this.loading=true
                    this.addContact();
                }else{
                    this.loading=false
                }
                e.preventDefault();
            },
            addContact() {
                this.$axios.post('/add-contact', {
                    name: this.name,
                    phone: this.phone,
                    body: this.body,
                    email: this.email
                }).then(response => {
                    console.log(response)
                    if(response.data.status == '200'){
                        this.loading=false
                        this.body=''
                        this.email=''
                        this.phone=''
                        this.name=''
                        if(this.current_lang == 'en'){
                            this.$swal('your contact send')
                        }else if(this.current_lang == 'ar'){
                            this.$swal('تم اراسال رسالتك')
                        }
                    }else if(response.data.status == '500'){
                        this.loading=false
                        this.formErrors.push(response.data[0].email[0])
                    }
                })
            }
        }
        ,
        computed: {
            current_lang() {
                return this.$i18n.locale
            }
        }
        ,
    }
</script>

<style scoped>
    .container {
        padding-top: 70px
    }
</style>

