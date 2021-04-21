<template>

    <div :class="{rtl:current_lang === 'ar'}">
        <!-- Content -->
        <section class="container" style="padding-top: 70px">
            <!--  consulting -->
            <div class="row">
                <div class="col-xs-12 col-md-8 col-lg-9">
                    <div class="consulting-wrapper">

                        <div class="consulting-title">
                            <span class="color-main">{{ general_settings.site_name_en }}</span>
                            {{ general_settings.description_en | subBody }}
                        </div>
                        <div class="consulting-description">
                            {{ forum.question }}
                        </div>
                        <div class="consulting-date">
                            {{ forum.created_at | formatDateByDay }} {{ forum.created_at | formatDateByMonth }}
                            {{ forum.created_at | formatDateByYear }}
                        </div>
                    </div>

                    <div class="consulting-wrapper" v-if="forum.answer">
                        <!--  Doctor  -->
                        <div class="media author-wrapper">
                            <div class="media-left">
                                <img class="media-object" src="https://api.promental.net/images/website/article-2.png"
                                     alt="...">
                            </div>
                            <div class="media-body media-middle">
                                <div class="author-name">
                                    {{ current_lang == 'ar' ? forum.answer_by.type.name_ar : forum.answer_by.type.name_en + '. '}}
                                    {{ current_lang == 'ar' ? forum.answer_by.last_name : forum.answer_by.last_name_en +
                                    ' '}} {{ current_lang == 'ar' ? forum.answer_by.first_name :
                                    forum.answer_by.first_name_en }}
                                </div>
                                <div class="author-title"> {{ current_lang == 'ar' ?
                                    forum.answer_by.speciality_name.name_ar : forum.answer_by.speciality_name.name_en }}
                                </div>
                            </div>

                            <div class="media-body consulting-answer">
                                <div class="consulting-answer-yes">{{ $t('answered_by') }}</div>
                                <div class="consulting-answer-date">{{ forum.updated_at | formatDateByDay }}
                                    {{ forum.updated_at | formatDateByMonth }} {{ forum.updated_at | formatDateByYear }}
                                </div>
                            </div>
                            <div class="media-
              body consulting-answer">
                                <a href="" class="btn btn-main" @click="getSingleDoctor($event,doctor.slug)">{{
                                    $t('book_now') }}</a>
                            </div>
                        </div>
                        <div class="consulting-title">
                            <span class="color-main"></span>
                            {{ current_lang == 'en' ? general_settings.site_name_en : general_settings.site_name_ar }}
                            {{ forum.question }}
                        </div>
                        <div class="consulting-description">
                            <p>
                                {{ forum.answer }}
                            </p>
                        </div>
                    </div>

                    <div class="consulting-wrapper" v-else>

                        <div class="no-answer">
                            <img src="https://api.promental.net/images/website/no-answer.svg" alt="">
                            {{ $t('not_answered_yet') }}
                        </div>

                    </div>

                    <!--   -->
                    <div class="row">
                        <div class="col-xs-12 col-sm-8 col-sm-push-2">
                            <div class="useful-content">
                                <div class="useful-content-title">
                                    {{ $t('is_this_content_useful_for_you') }}
                                </div>
                                <div class="useful-content-actions">
                                    <button type="button" class="btn btn-yes" @click="addDiscussed(1)">{{ $t('yes') }}
                                    </button>
                                    <button type="button" class="btn btn-no" @click="addDiscussed(0)"> {{ $t('no') }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Page -->
                    <div class="about-wrapper style-3">
                        <div class="articles-section-title articles-side">
                            <span>{{ $t('related_consultancies') }}</span>

                        </div>
                        <!--  related-consulting  -->
                        <div class="row">
                            <div class="col-xs-12 col-lg-6 d-flex"
                                 v-for="relatedConsultancy,index in relatedConsultancies"
                                 :key="relatedConsultancy.id">
                                <div class="consulting-wrapper related-consulting">
                                    <!--  Doctor  -->
                                    <div class="media author-wrapper">
                                        <div class="media-left">
                                            <img class="media-object"
                                                 :src="relatedConsultancy.answer_by.avatar ? relatedConsultancy.answer_by.avatar : 'https://api.promental.net/images/website/article-2.png'"
                                                 alt="...">
                                        </div>
                                        <div class="media-body media-middle">
                                            <div class="author-name">
                                                {{ current_lang == 'ar' ? relatedConsultancy.answer_by.type.name_ar :
                                                relatedConsultancy.answer_by.type.name_en + '. ' }}
                                                {{ current_lang == 'ar' ? relatedConsultancy.answer_by.last_name :
                                                relatedConsultancy.answer_by.last_name_en + ' '}} {{ current_lang ==
                                                'ar' ? relatedConsultancy.answer_by.first_name :
                                                relatedConsultancy.answer_by.first_name_en }}
                                            </div>
                                            <div class="author-title"> {{ current_lang == 'ar' ?
                                                forum.answer_by.speciality_name.name_ar :
                                                forum.answer_by.speciality_name.name_en }}
                                            </div>
                                        </div>
                                        <div class="media-body consulting-answer">
                                            <div class="consulting-answer-yes">{{ $t('answered_by') }}</div>
                                            <div class="consulting-answer-date">{{ relatedConsultancy.question | subBody
                                                }}
                                            </div>
                                        </div>
                                        <div class="media-body consulting-answer">
                                            <a href="" class="btn btn-consulting"
                                               @click="getSingleDoctor($event,relatedConsultancy.answer_by.slug)">
                                                {{ $t('book_now') }}
                                            </a>
                                        </div>
                                    </div>
                                    <div class="consulting-title">
                                        {{ relatedConsultancy.answer | subBody }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-md-4 col-lg-3">
                    <!-- Page -->
                    <div class="about-wrapper style-3 style-4">
                        <div class="about-title">
                            <img src="https://api.promental.net/images/website/quick-consulting.svg" alt="">
                            <div class="arrow-animation"></div>
                        </div>
                    </div>

                    <button id="show-modal" class="btn leave-consulting" @click="showModal">{{ $t('add_consultancy')
                        }}
                    </button>

                    <div class="consulting-wrapper">
                        <div class="trend-consulting-title">
                            {{ $t('most_discussed_consulting') }}
                        </div>
                        <div class="trend-consulting-item" v-for="(consulting,index) in most_discussed_consultings">
                            <div class="consulting-title">
                                <span class="color-main">    {{current_lang == 'en' ? general_settings.site_name_en : general_settings.site_name_ar }}</span>
                            </div>
                            <div class="consulting-description">
                                {{consulting.question }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <v-row justify="center">
            <v-dialog v-model="isModalVisible" width="600px">
                <v-card>
                    <v-card-text>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                                @click="closeModal()"><span
                                aria-hidden="true">&times;</span></button>

                        <div class="container-fluid">
                            <div class="consult-content-1" :style="isModal ? 'display:block' : 'display:none'">
                                <div class="about-wrapper style-3 style-4">
                                    <div class="about-title">
                                        <img src="https://api.promental.net/images/website/quick-consulting.svg" alt="">
                                        <div class="arrow-animation"></div>
                                    </div>
                                </div>

                                <div class="alert alert-danger" role="alert" v-if="formErrors.length > 0">
                                    <p v-for="error,index in formErrors">{{ error }}</p>
                                </div>

                                <h4 class="text-center margin-10"> {{ $t('write_your_consultant') }} </h4>
                                <form action="">
                                    <div class="explain-consult-wrapper">
                                        <div class="col-md-10 col-md-push-1">
                                            <div class="explain-consult-title" v-if="current_lang == 'en'">
                                                Explain your symptoms so that the doctor can provide advice
                                                Suitable for you
                                            </div>
                                            <div class="explain-consult-title" v-if="current_lang == 'ar'">
                                                اشرح الأعراض الخاصة بك حتى يتمكن الطبيب من تقديم المشورة
                                                المناسبه لك
                                            </div>
                                        </div>
                                        <div class="form-group">
        <textarea class="form-control" v-model="consult_content"
                  rows="4"></textarea>
                                        </div>
                                        <div class="form-group">
                                            <div class="checkbox">
                                                <label>
                                                    <input type="checkbox">
                                                    {{
                                                    $t('all_questions_that_are_posted_publicly_to_all_website_visitors')
                                                    }}
                                                </label>

                                            </div>
                                        </div>
                                        <div class="form-group text-center">
                                            <button type="button" class="btn btn-send-consult" @click="validateForm">
                                                {{ $t('send') }}
                                            </button>
                                        </div>
                                    </div>

                                </form>
                            </div>

                            <div class="consult-content-2" :style="isModal2 ? 'display:block' : 'display:none'">
                                <div class="col-md-10 col-md-push-1">
                                    <div class="consult-confirm-title">
                                        {{ $t('all_questions_that_are_posted_publicly_to_all_website_visitors') }}
                                    </div>

                                    <div class="consult-confirm-wrapper">
                                        <button type="button" class="btn btn-confirm-yes" @click="addConsultancy">
                                            {{ $t('yes') }}
                                        </button>
                                        <button type="button" class="btn btn-confirm-no" @click="removeConsultancy">
                                            {{ $t('no') }}
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <div class="consult-content-3" :style="isModal3 ? 'display:block' : 'display:none'">
                                <div class="consult-confirmation">
                                    <img src="https://api.promental.net/images/website/confirmation.png" alt="">
                                    {{ $t('your_question_will_be_answered_soon') }}
                                </div>
                            </div>

                            <div class="consult-content-4" :style="isModal4 ? 'display:block' : 'display:none'">
                                <div class="col-md-10 col-md-push-1">
                                    <div class="consult-confirm-title">
                                        {{ $t('login_first') }}
                                    </div>

                                    <div class="consult-confirm-wrapper">
                                        <nuxt-link :to="localePath('/Login')" class="btn btn-confirm-yes">
                                            {{ $t('login') }}
                                        </nuxt-link>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </v-card-text>
                </v-card>

            </v-dialog>

        </v-row>

    </div>

</template>

<script>

    export default {
        head() {
            return {
                title: 'singleConsultancy',
            };
        },
        layout: 'mainHeader',
        data() {
            return {
                forum_slug: this.$route.params.slug,
                forum: {},
                doctor: {},
                speciality: {},
                isModal2: false,
                isModal3: false,
                isModal: true,
                isModal4: false,
                relatedConsultancies: {},
                general_settings: {},
                consult_content: '',
                formErrors: '',
                is_private: false,
                isModalVisible: false,
                most_consultings: {},
                most_discussed_consultings: {}
            }
        },
        mounted() {
            this.getConsultancy();
            this.getGeneralSettings()
            this.addViews()
            this.getMostRead()
        },
        methods: {
            getMostDiscussed() {
                this.$axios.get('/forums/most-discussed/Consulting').then(response => {
                    this.most_discussed_consultings = response.data.data
                })
            },
            getMostRead() {
                this.$axios.get('/forums/most-read/Consulting').then(response => {
                    this.most_consultings = response.data.data
                })
            },
            addViews() {
                this.$axios.get('/forums/' + this.$route.params.slug + '/addViews')
                    .then(response => {
                        console.log(response)
                    })
            },
            validateForm(e) {
                this.formErrors = [];
                if (!this.consult_content) {
                    this.formErrors.push('no consult added')
                }
                if (this.formErrors.length == 0) {
                    this.isModal = false;
                    this.isModal2 = true
                }
                e.preventDefault();
            },
            removeConsultancy() {
                this.closeModal();
                this.isModal = true;
                this.isModal2 = false;
                this.isModal3 = false;
                this.isModal4 = false;
            },
            addConsultancy(e) {
                if (this.$auth.loggedIn) {
                    this.$axios.$post('/forums/user/addForum', {
                        question: this.consult_content,
                        is_private: this.is_private
                    })
                        .then(response => {
                            if (response.status == '200') {
                                this.isModal = false;
                                this.isModal2 = false;
                                this.isModal3 = true
                            }
                        })
                } else {
                    this.isModal = false;
                    this.isModal2 = false;
                    this.isModal3 = false;
                    this.isModal4 = true
                }
                e.preventDefault();
            },
            showModal() {
                this.isModalVisible = true;
                this.isModal = true;
                this.isModal2 = false;
                this.isModal3 = false;
                this.isModal4 = false;
                this.opacity = .8;
            },
            closeModal() {
                this.isModalVisible = false;
            },
            getSingleDoctor(e, slug) {
                e.preventDefault();
                this.$router.push(this.localePath('/doctors/' + slug))

            },
            getGeneralSettings() {
                this.$axios.$get('/setting')
                    .then(response => {
                        this.general_settings = response.data;
                        console.log(this.general_settings)
                    })
            },
            getConsultancy() {
                this.$axios.$get('/forums/' + this.forum_slug)
                    .then(response => {
                        this.forum = response.data
                        // this.speciality = response.speciality;
                        if (response.related_consultancies) {
                            this.relatedConsultancies = response.related_consultancies;
                        }
                    })
            },
            addDiscussed(val) {
                this.$axios.get('/forums/' + this.$route.params.slug + '/addDiscussed?val=' + val)
                    .then(response => {
                        console.log(response)
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
    .container {
        padding-top: 70px;
    }

    /*.about-wrapper.style-2 .about-title:before, .about-wrapper.style-3 .about-title:before {*/
    /*  content: '';*/
    /*  position: absolute;*/
    /*  top: 0;*/
    /*  right: 0;*/
    /*  left: 0;*/
    /*  margin: 0 auto;*/
    /*  background: url(../../assets/images/RepeatGrid1.svg) center no-repeat;*/
    /*  background-size: contain;*/
    /*  transform: rotateY(180deg);*/
    /*  width: 100%;*/
    /*  height: 100%;*/
    /*  z-index: -1;*/
    /*}*/

    .v-card {
        color: #fff !important;
        background: #37878F !important;
        box-shadow: none !important;
        border: none !important;
    }

    .v-card .close {
        color: #fff !important;
        text-shadow: 0 1px 0 #000 !important;
        filter: alpha(opacity=50) !important;
        opacity: .5 !important;
        transition: all 0.3s ease-in-out !important;
    }

    .v-card .close:hover {
        filter: alpha(opacity=100) !important;
        opacity: 1 !important !important;
    }

    .v-card .about-wrapper.style-3.style-4 .about-title {
        margin: 0 auto !important;
    }

    .v-card .explain-consult-wrapper {
        position: relative !important;
        display: inline-block !important;
        color: #828282 !important;
        background: #fff !important;
        border-radius: 8px !important;
        margin: 10px auto !important;
        padding: 20px !important;
    }

    .v-card .explain-consult-wrapper .explain-consult-title {
        margin-bottom: 20px !important;
        text-align: center !important;
        font-size: 18px !important;
        color: #028458 !important;

    }

    .v-card .explain-consult-wrapper .form-control {
        background: #fff !important;
        border: 1px solid #F1F1F1 !important;
        border-radius: 13px !important;

    }

    .v-card .about-wrapper.style-2 .about-title:before,
    .v-card .about-wrapper.style-3 .about-title:before {
        display: none;
    }

    .about-wrapper.style-2 .about-title:before, .about-wrapper.style-3 .about-title:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        margin: 0 auto;
        background: url(../../../assets/images/RepeatGrid1.svg) center no-repeat;
        background-size: contain;
        transform: rotateY(180deg);
        width: 100%;
        height: 100%;
        z-index: -1;

    }
</style>
