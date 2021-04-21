const colors = require('vuetify/es5/util/colors').default
const dev = process.env.NODE_ENV !== 'production'
// const lang=process.env.VUE_APP_I18N_LOCALE


module.exports = {
  telemetry: false,
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: 'Promental',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.png'},
      {
        rel: 'stylesheet',
        href: '/icons.css'
      }
    ],
    script: [
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'},
      {src: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'},
      {src: 'https://www.gstatic.com/charts/loader.js'},
      {src: 'https://cdn.agora.io/sdk/web/AgoraRTCSDK-2.1.0.js'},
      {src: '/main.js'},
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/animate.css',
    '~/assets/css/font-awesome.min.css',
    '~/assets/css/magnific-popup.css',
    '~/assets/css/owl.carousel.min.css',
    '~/assets/css/owl.theme.default.min.css',
    '~/assets/css/jquery-ui.min.css',
    '~/assets/css/jquery-ui.theme.min.css',
    '~/assets/css/bootstrap.min.css',
    // '~/assets/css/bootstrap.rtl.css',
    '~/assets/css/theme.css',
    '~/assets/css/style.css',
    // '~/assets/css/style-rtl.css',
    '~/assets/css/custom.css',
    'vue-slick-carousel/dist/vue-slick-carousel.css',
    '@voerro/vue-tagsinput/dist/style.css'
  ],

  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~/plugins/plugins.js', mode: 'client'},
    {src: './plugins/vue-slick-carousel.js'},
    "~plugins/filters.js",
    {src: '~/plugins/vue-tags-input', ssr: false},
    {src: '~/plugins/vue-google-charts.js'},
    {src: '~/plugins/vue-date-time', ssr: false},
    {src: '~/plugins/vue-moment.js'},
    '~/plugins/vue-swal',
    {src: '~/plugins/i18n.js'},
    {src: '~/plugins/vue-moment-time_zone'},
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
    "@nuxtjs/svg"

  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    [
      'nuxt-i18n',
      {
        locales: ['en', 'ar'],
        defaultLocale: 'ar',
        vueI18n: {
          formatFallbackMessages: true,
          silentFallbackWarn: true,
          //fallbackLocale: 'en',
          messages: {
            en: {
              choose_subscription: 'Choose Subscription',
              account_info: 'Account Information',
              school_info: 'School Information',
              name_en: 'Name En',
              name_ar: 'Name Ar',
              school_name_en: 'School Name En',
              school_name_ar: 'School Name Ar',
              school_address_en: 'School Address En',
              school_address_ar: 'School Address ar',
              greeting: 'Hello world!',
              home: 'Home',
              schools: 'Schools',
              doctors: 'Doctors',
              students: 'Students',
              sessions: 'Sessions',
              articles: 'Articles',
              conditions: 'conditions',
              privacy: 'privacy',
              policy: 'policy',
              questions: 'questions',
              common: 'common',
              contact_us: 'contact us',
              get_social_with_us: 'GET SOCIAL WITH US',
              ask_doctor: 'Ask Doctor',
              log_in: 'Log In',
              new_account: 'New Account',
              join_request: 'Join Request',
              features_and_advantages: 'Features and Advantages',
              book: 'Book',
              session: 'Session',
              available: 'available',
              how_to_book_session: 'How to Book a Session',
              you_can_choose_right_doctor: 'you can choose right doctor',
              you_can_choose_your_doctor_form_through_many_specialists: 'you can choose your doctor form through many specialists',
              sections: 'sections',
              start: 'start',
              profile: 'profile',
              view: 'view',
              bookings: 'Bookings',
              logout: 'Log Out',
              subscribe: 'Subscribe',
              to: 'To',
              news: 'News',
              by_clicking_on_start_i_agree_to_the_terms_and_conditions: 'By clicking on start I agree to the terms and conditions',
              others: 'Others',
              write: 'Write',
              article: 'Article',
              general: 'General',
              reports: 'Reports',
              complaint: 'Complaint',
              search: 'Search',
              reservations: 'Reservations',
              consulting: 'Consulting',
              technical: 'Technical',
              support: 'Support',
              payments: 'Payments',
              list: 'List',
              subscription: 'Subscription',
              login: 'Log in',
              payment_history: 'Payment History',
              packages: 'packages',
              management: 'Management',
              subscriptions: 'subscriptions',
              history: 'history',
              installs: 'installs',
              start_date: 'start date  ',
              end_date: 'end date',
              name: 'name',
              total: 'total',
              details: 'details',
              re_password: 're password',
              age: 'age',
              password: 'password',
              phone: 'phone',
              classroom: 'classroom',
              area: 'area',
              hobbies: 'hobbies',
              new: 'new',
              siblings: 'siblings',
              count: 'count',
              user_id: 'User Id',
              my_packages: 'my packages',
              school_address: 'School Address',
              school_name: 'School Name',
              students_number: 'Students Number',
              school_number: 'School Number',
              manager_name: 'Manager Name',
              last_name: 'Last Name',
              phone_number: 'Phone Number',
              email: 'Email',
              subscription_information: 'Subscription Information',
              most_viewed: 'Most Viewed',
              other_articles: 'Other Articles',
              choose_disease: 'Choose Disease',
              write_article: 'Write Article',
              disease: 'Disease',
              title: 'Title',
              cover_photo: 'Cover Photo',
              browse: 'Browse',
              subject: 'Subject',
              send: 'Send',
              visit: 'Visit',
              our_partners_in_success_are_doctors: 'Our Partners in Success are Doctors',
              available_packages: 'Available Packages',
              it_will_be_package: 'It Will be a Package',
              custom_to_students: 'Custom to Students',
              subscribe_now: 'Subscribe Now',
              how_to_benefit_as_doctor: 'How to benefit ad a doctor',
              join_us: 'Join Us',
              doctor_name: 'Doctor Name',
              specialities: 'Specialities',
              first_name: 'First Name',
              the_clinic_address: 'Clinic address',
              speciality: 'Speciality',
              choose_speciality: 'Choose Speciality',
              certificates: ' Certificates',
              description: 'Description',
              account_data: ' Account data',
              password_confirmation: 'Password Confirmation',
              subscription_data: 'Subscription data',
              subscription_type: 'Subscription Type',
              session_price: 'Session price ',
              session_time: 'Session time ',
              book_now: 'Book Now',
              data: 'Data',
              reviews: 'Reviews',
              evaluate_doctor: 'evaluate doctor',
              minute: 'Minute',
              le: 'LE',
              submit: 'Submit',
              close: 'Close',
              our_partners_in_success_from_schools: 'our Partners in success from schools',
              how_to_benefit_schools: 'How to benefit  Schools',
              subscribe_with_us: 'Subscribe with us',
              you_can_choose_your_doctor_from_through_many_specialists: 'You can choose your doctor from through many specialities',
              register_and_book_an_appointment: 'Register and book an appointment',
              then_register_and_choose_an_appointment_the_appropriate_session: 'Then register and choose an appointment the appropriate session',
              then_speak_to_the_specialist_directly: 'Then speak to the specialist directly',
              speak: 'Speak',
              siblings_age: 'Siblings age',
              siblings_count: 'Siblings count',
              student_data: 'Student data',
              please_change_your_password_and_complete_your_data: 'Please change your password and complete your data',
              register: 'Register',
              please_head_over_to_sessions_page_to_book_a_session: 'Please head over to sessions page to book a session',
              start_session: 'start session',
              forget_password: 'Forget Password',
              new_register: 'New Register',
              back: 'back',
              answer_the_question: 'Answer the question',
              show_answer: 'Show answer',
              not_answered_yet: 'not answered yet',
              next: 'next',
              how_to_benefit_students: 'How to benefits students',
              login_first: 'Login first',
              payment_methods: 'Payment methods',
              choose_payment_method: 'Choose Payment methods',
              leave_your_text_here: 'Leave your text here',
              technical_support: 'Technical support',
              add: 'Add',
              all_complaints: 'All Complaints',
              complaint_number: 'Complaint number',
              date: 'date',
              status: 'status',
              add_complaint: 'Add Complaint',
              leave_your_reply_here: 'Leave your reply here',
              done: 'Done',
              send_request: 'Send Request',
              accrued_earnings: 'Accrues Earnings',
              withDrawl_earnings: 'withDrawl Earnings',
              pending_earnings: 'Pending Earnings',
              available_earnings: 'Available Earnings',
              update_your_payment_data_first: 'Update your payment data first.choose at least one payment method',
              sessions_number: 'Sessions number',
              choose_date: 'Choose Date',
              earning: 'Earning',
              payment_data: 'Payment data',
              edit: 'Edit',
              withDrawl_earning: 'withDrawl earning',
              remaining: 'remaining',
              waiting: 'waiting',
              last_session: 'last session',
              next_session: 'next session',
              name_and_school: 'name and school',
              date_of_birth: 'date of birth',
              brother_and_sisters_number: 'brother and sisters number',
              last_session_details: 'last session details',
              add_note: 'add note',
              new_sessions: 'new sessions',
              start_video_calling: 'start video calling',
              the_session_time_is_over: 'the session time is over',
              end_video_calling: 'end video calling',
              this_account_has_been: 'this account has been',
              suspended: 'suspended',
              all_questions: 'all questions',
              answered: 'answered ',
              unanswered: 'un answered',
              delete_account: 'Delete account',
              earnings: 'Earnings',
              pending_earning: 'pending earning',
              accrued_earning: 'accrued earning',
              filter_sessions: 'filter sessions',
              add_consultancy: 'Add Consultancy',
              your_question_will_be_answered_soon: 'Your Question will be published soon',
              all_questions_that_are_posted_publicly_to_all_website_visitors: 'All questions that are posted publicly to all website visitors',
              answered_by: 'answered br',
              is_this_content_useful_for_you: 'Is this content useful for you?',
              related_consultancies: 'Related consultancies',
              session_details: 'Session details',
              write_your_consultant: 'Write your consultant',
              profile_data: 'Profile data',
              available_time: 'Available time',
              choose_day: 'choose day',
              choose_time: 'choose time',
              more: 'more',
              most_discussed_consulting: 'most discussed consulting',
              most_read: 'most read',
              you_can_choose_doctor_from_through_many_specialists: 'you can choose doctor from through many specialists',
              profile_picture: 'Profile Picture',
              this_account_has_been_suspended: 'this account has been suspended',
              total_sessions: 'total sessions',
              sessions_done: 'sessions done',
              subscription_end_date: 'subscription end date',
              subscription_plan: 'subscription plan',
              subscription_start_date: 'subscription start date',
              no_subscription_yet: 'no subscription yet',
              subscription_status: 'subscription status',
              not_enabled: 'not enabled',
              activated: 'activated',
              total_price: 'total price',
              choose_package: 'choose package',
              number_of_sessions: "number of sessions",
              primary: 'primary',
              request_to_view_reports_and_medical_history: 'request to view reports and medical history',
              list_subscription: 'list subscription',
              management_packages: 'management packages',
              subscriptions_history: 'subscriptions history',
              packages_details: 'packages details',
              session_status: 'session status',
              subscription_statuses: 'subscription statuses',
              avatar: 'avatar',
              school_needs_to_view_your_reports_and_your_medical_history: 'school needs to view your reports and your medical history',
              see_all_sessions: 'see all sessions',
              last_sessions: 'last sessions',
              session_management: 'session management',
              remain: 'remain',
              your_reply: 'your reply',
              price: 'price',
              add_doctor: 'add doctor',
              appointment_time: 'appointment time',
              select: 'select',
              type: 'type',
              notes: 'notes',
              complains: 'complains',
              session_start_date: 'session start date',
              patient_name: 'patient name',
              patient_type: 'patient type',
              l_e: 'L E',
              account_has_been_suspended_as_your_school_is_suspended: 'account has been suspended as your school is suspended',
              brothers: 'brothers',
              sisters: 'sisters',
              subscription_details: 'subscription details',
              receive_date: 'receive date',
              not_paid: 'not paid',
              paid: 'paid',
              technical_support_reply: 'technical support reply',
              save: 'save',
              register_as_doctor: 'Register as doctor',
              common_questions: 'common questions',
              dashboard: 'dashboard',
              appointment: 'appointment',
              choose_type: 'choose type',
              yes: 'yes',
              no: 'no',
              add_contact: 'add contact',
              the_clinic_address_arabic: 'the clinic address arabic',
              the_clinic_address_english: 'the clinic address english',
              certificates_arabic: 'certificates arabic',
              certificates_english: 'certificates english',
              description_english: 'description english',
              description_arabic: 'description arabic',
              last_name_arabic: 'last name arabic',
              last_name_english: 'last name english',
              first_name_arabic: 'first name arabic',
              first_name_english: 'first name english',
              all_rights_reserved_to: 'All rights reserved to',
              saturday: 'Saturday',
              sunday: 'Sunday',
              monday: 'Monday',
              tuesday: 'Tuesday',
              wednesday: 'Wednesday',
              thursday: 'Thursday',
              friday: 'Friday',
              search_student_or_user_name:'search student or user name',
              this_account_has_been_suspended_as_your_school_is_suspended:'this account has been suspended as your school is suspended',
              search_student_name:'search student name',
              search_student_phone:'search student phone',
              search_student_user_id:'search student user id',
              search_student_email:'search student name',
              choose_doctor:'choose doctor',
              start_new_session:'start new session',
              enter_password:'enter password',
              the_session_is_over:'the session is over',
              doctor:'doctor'

            },
            ar: {
              choose_subscription: 'اختر اشتراك',
              account_info: 'معلومات الحساب',
              school_info: 'معلومات المدرسه',
              name_en: 'الاسم بالانجليزيه',
              name_ar: 'الاسم بالعربيه',
              school_name_en: 'اسم المدرسة بالنجليزية',
              school_name_ar: 'اسم المدرسة بالعربية',
              school_address_en: 'عنوان المدرسه بالانجليزيه',
              school_address_ar: 'عنوان المدرسه بالعر بية',
              greeting: 'صباح الخير!',
              home: 'الرئيسيه',
              schools: 'المدارس',
              doctors: 'الاطباء',
              students: 'الطلاب',
              sessions: 'الجلسات',
              conditions: 'الشروط',
              articles: 'المقالات',
              privacy: 'الاحكام',
              policy: 'سياسه',
              questions: 'الاسئله',
              common: 'الشائعه',
              view: 'تفاصيل',
              contact_us: 'تواصل معنا',
              get_social_with_us: 'تواصل معنا',
              ask_doctor: 'اسال معالج',
              log_in: 'تسجيل دخول',
              new_account: 'حساب جديد',
              join_request: 'طلب انضمام',
              how_to_benefit_schools: 'طيفيه الاستفاده للمدارس',
              features_and_advantages: 'المزايا والخصائص',
              book: 'حجز',
              session: 'جلسه',
              available: 'متاحه',
              how_to_book_session: 'كيفيه الحجز',
              you_can_choose_right_doctor: 'اختار المعالج المناسب',
              you_can_choose_your_doctor_form_through_many_specialists: 'يمكنك اختيار طبيبك المعالج من  خلال العديد من المتخصصين',
              sections: 'اقسام',
              start: 'بدا',
              profile: 'بروفايل',
              bookings: 'حجوزاتي',
              logout: 'تسجيل خروج',
              subscribe: 'اشترك',
              subscriptions: 'الاشتراكات',
              to: 'في',
              news: 'الاخبار',
              others: 'اخري',
              write: 'اكتب',
              article: 'مقال',
              general: 'عام',
              reports: 'تقارير',
              complaint: 'شكوي',
              search: 'بحث',
              reservations: 'الحجوزات',
              consulting: 'الاستشارات',
              technical: 'فني',
              support: 'دعم',
              payments: 'مدفوعات',
              list: 'قائمه',
              subscription: 'اشتراكات',
              login: 'تسجيل دخول',
              payment_history: 'الدفعات',
              packages: 'الباكدجات',
              management: 'اداره',
              history: 'تاريخ',
              installs: 'عدد الدفعات',
              start_date: 'تاريخ البدايه ',
              end_date: 'تاريخ الانتهاء',
              name: 'الاسم',
              total: 'السعر الكلي',
              details: 'تفاصيل',
              re_password: 'اعاده ادخال كلمه السر',
              age: 'سن',
              password: 'كلمه السر',
              phone: 'رقم التليفون',
              classroom: 'الفصل الدراسي',
              area: 'المدينه',
              hobbies: 'الهوايات',
              new: 'الجديده',
              siblings: 'الاخوات',
              count: 'عدد',
              user_id: 'رقم المستخدم',
              my_packages: 'اشتراكاتي',
              school_address: ' عنوان المدرسه',
              school_name: 'اسم المدرسه',
              students_number: ' عدد الطلاب',
              school_number: 'رقم المدرسه',
              manager_name: 'اسم المدير',
              last_name: 'اسم اخير',
              phone_number: 'رقم التليفون',
              email: 'البريد الاليكتروني',
              by_clicking_on_start_i_agree_to_the_terms_and_conditions: 'بالنقر على البدء أوافق على الشروط والأحكام',
              subscription_information: 'معلومات الاشتراك',
              most_viewed: 'الاكثر مشاهده',
              other_articles: 'مقالات اخرى',
              choose_disease: 'اختار تخصص',
              write_article: 'اكتب مقال',
              disease: 'تخصص',
              title: 'العنوان',
              cover_photo: 'صوره الغلاف',
              browse: 'رفع',
              subject: 'الموضوع',
              send: 'ارسال',
              visit: 'زياره',
              our_partners_in_success_are_doctors: 'شركائنا في النجاح من الاطباء',
              available_packages: 'انظمه الاشتراك',
              it_will_be_package: 'ويكون الاشتراك',
              custom_to_students: 'مخصص لطلاب المدارس',
              subscribe_now: 'أشترك الأن',
              how_to_benefit_as_doctor: 'كيف تستفيد كمعالج',
              join_us: 'اشترك معنا',
              doctor_name: 'اسم المعالج',
              specialities: 'التخصصات',
              first_name: 'اسم اول',
              the_clinic_address: 'عنوان العياده',
              speciality: 'التخصص',
              choose_speciality: 'اختار تخصص',
              certificates: 'الشهادات العلميه',
              description: 'الوصف',
              account_data: 'بيانات الحساب',
              subscription_data: 'بيانات الاشتراك',
              subscription_type: 'نوع الاشتراك',
              session_price: 'سعر الجلسه',
              session_time: 'وقت الجلسه',
              book_now: 'احجز الان',
              data: 'البيانات',
              reviews: 'التقييمات',
              evaluate_doctor: 'تقييم المعالج',
              minute: 'دقيقه',
              le: 'جنيه',
              submit: 'ارسال',
              close: 'اغلاق',
              our_partners_in_success_from_schools: 'شركائنا في النجاح من المدارس',
              subscribe_with_us: 'اشترك معنا',
              you_can_choose_your_doctor_from_through_many_specialists: 'يمكنك اختيار طبيبك المعالج من خلال العديد من المتخصصين',
              register_and_book_an_appointment: ' سجل وقم بحجز المعاد',
              then_register_and_choose_an_appointment_the_appropriate_session: 'ثم قم بتسجيل الدخول واختيار معاد الجلسه المناسب',
              then_speak_to_the_specialist_directly: 'ثم تحدث الي المختص مباشره',
              speak: 'التحدث',
              siblings_age: ' اعمار الاخوات',
              siblings_count: 'عدد الاخوات',
              student_data: 'بيانات الطالب',
              please_change_your_password_and_complete_your_data: 'رجاء تغيير كلمه السر واستكمال البيانات',
              register: 'تسجيل',
              please_head_over_to_sessions_page_to_book_a_session: 'برجاء التوجه لصفحه الجلسات لحجز جلسه',
              start_session: 'بدا جلسه',
              forget_password: 'نسيت كلمه السر',
              new_register: 'تسجيل جديد',
              back: 'الرجوع',
              answer_the_question: 'اجب علي الاستشاره',
              show_answer: 'الاجابه ',
              next: 'التالي',
              how_to_benefit_students: 'كيفيه الاستفاده للطلاب',
              login_first: 'سجل  الدخول اولا',
              payment_methods: 'طرق الدفع',
              choose_payment_method: 'اختر طرق الدفع',
              leave_your_text_here: 'اترك رسالتك هنا',
              technical_support: 'الدعم الفني',
              add: 'اضافه',
              all_complaints: 'كل الشكاوى ',
              complaint_number: 'رقم الشكوى ',
              date: 'التاريخ',
              status: 'الحاله',
              add_complaint: 'اضافه شكوى ',
              leave_your_reply_here: 'اترك ردك هنا',
              done: 'تم',
              send_request: 'ارسال طلب',
              accrued_earnings: 'الرصيد الكلي ',
              withDrawl_earnings: 'الرصيد المسحوب',
              pending_earnings: 'الرصيد المعلق',
              available_earnings: 'الرصيد المتاح',
              update_your_payment_data_first: 'حدث بيانات الدفع اولا . اختار طريقه دفع واحده علي الاقل',
              sessions_number: 'عدد الجلسات',
              choose_date: 'أختار تاريخ ',
              earning: 'الدخل',
              payment_data: 'بيانات الدفع',
              edit: 'تعديل',
              withDrawl_earning: 'الرصيد المسحوب',
              remaining: 'الباقي',
              waiting: 'انتظار',
              last_session: 'أخر جلسه ',
              next_session: 'الجلسه التاليه ',
              name_and_school: 'الاسم والمدرسه',
              date_of_birth: 'تاريخ الميلاد',
              brother_and_sisters_number: 'عدد الاخوات',
              last_session_details: 'تفاصيل اخر جلسه',
              add_note: 'اضافه ملاحظه',
              new_sessions: 'جلسات جديده',
              start_video_calling: 'بدا مكالمه مرئيه',
              the_session_time_is_over: 'وقت الجلسه انتهى',
              end_video_calling: 'انهاء مكالمه الفيديو',
              this_account_has_been: ' هذا الحساب تم',
              suspended: 'ايقافه',
              all_questions: 'كل الاسئله',
              answered: 'تم الاجابه',
              unanswered: 'لم يتم الاجابه',
              delete_account: 'حذف الحساب',
              earnings: 'الدخل',
              pending_earning: 'الرصيد المعلق',
              accrued_earning: 'الرصيد الكلي ',
              filter_sessions: 'تصفيه الجلسات',
              add_consultancy: 'اضف استشاره',
              your_question_will_be_answered_soon: 'سيتم نشر سؤالك في اقرب وقت',
              all_questions_that_are_posted_publicly_to_all_website_visitors: 'تظهر الاسئله التي يتم نشرها بشكل عام لجميع زوار الموقع',
              answered_by: 'تم اجابته',
              not_answered_yet: 'لم بتم اجابته',
              is_this_content_useful_for_you: 'هل وجدت هذا المحتوي مفيد؟',
              related_consultancies: 'استشارات ذات صله',
              session_details: 'تفاصيل الجلسه',
              write_your_consultant: 'اكتب استشارتك هنا',
              profile_data: 'بيانات الاكونت',
              available_time: 'الوقت المتاح',
              choose_day: 'اختار اليوم',
              choose_time: 'اختار الوقت',
              more: 'المزيد',
              most_discussed_consulting: 'الاكثر تداولا',
              most_read: 'الاكثر قراءه',
              you_can_choose_doctor_from_through_many_specialists: 'يمكنك الاختيار من بين العديد من المتخصصين',
              profile_picture: 'صوره شخصيه',
              this_account_has_been_suspended: 'هذا الحساب تم ايقافه',
              total_sessions: 'كل الجلسات',
              sessions_done: 'جلسات منتهيه',
              subscription_end_date: 'تاريخ نهايه الاشتراك',
              subscription_plan: 'معلومات الاشتراك',
              subscription_start_date: ' تاريخ بدايه الاشتراك ',
              no_subscription_yet: 'لا يوجد اشتراكات',
              subscription_status: 'حاله الاشتراك',
              not_enabled: 'غير نشط ',
              activated: 'نشط',
              total_price: ' السعر الكلي',
              choose_package: 'اختار فئه',
              number_of_sessions: 'عدد الجلسات',
              primary: 'الصف',
              request_to_view_reports_and_medical_history: 'ارسال طلب للاطلاع علي التقارير والتاريخ الطبي',
              list_subscription: 'ٌقائمه الاشتراكات',
              management_packages: ' اداره الباكدجات',
              subscriptions_history: 'تاريخ الاشتراكات',
              packages_details: 'تفاصيل الباكدجات',
              session_status: 'حاله الجلسه',
              subscription_statuses: 'حالات الاشتراك',
              avatar: 'صوره تعريفيه',
              school_needs_to_view_your_reports_and_your_medical_history: 'تحتاج المدرسه الي روْيه تقاريرك و تاريخك المرضي',
              see_all_sessions: 'جميع الجلسات',
              last_sessions: 'اخر جلسات',
              session_management: 'اداره الجلسات',
              remain: 'الباقي',
              your_reply: 'ردك',
              price: 'السعر',
              add_doctor: 'اختار معالج',
              appointment_time: 'وقت الجلسه',
              select: 'اختار',
              type: 'النوع',
              notes: 'ملاحظات',
              complains: 'شكاوي',
              session_start_date: 'تاريخ بدايه الجلسه',
              patient_name: ' اسم المريض',
              patient_type: 'نوع المريض',
              l_e: 'جنيه',
              account_has_been_suspended_as_your_school_is_suspended: 'هذا الحساب تم ايقافه لايقاف المدرسه',
              brothers: 'اخ',
              sisters: 'اخت',
              subscription_details: 'معلومات الاشتراك',
              receive_date: 'تاريخ الاستلام ',
              not_paid: 'غير مدفوع',
              paid: 'مدفوع',
              technical_support_reply: 'رد الدعم الفني',
              save: 'حفظ',
              register_as_doctor: 'اشترك منا كمعالج',
              common_questions: 'الاسئله الشائعه',
              dashboard: 'لوحه التحكم',
              appointment: 'المعاد',
              choose_type: 'اختار نوع',
              yes: 'نعم',
              no: 'لا',
              add_contact: 'اضف رساله',
              the_clinic_address_arabic: 'عنوان العياده بالعربيه',
              the_clinic_address_english: 'عنوان العياده بالانجليزيه',
              certificates_arabic: 'الشهادات العلميه بالعربيه',
              certificates_english: 'الشهادات العلميه بالانجليزيه',
              description_english: 'الوصف بالعربيه',
              description_arabic: 'الوصف بالانجليزيه',
              last_name_arabic: 'اسم اخير بالعربيه',
              last_name_english: 'اسم اخير بالانجليزيه',
              first_name_arabic: 'اسم اول بالعربيه',
              first_name_english: 'اسم اول بالانجليزيه',
              all_rights_reserved_to: 'جميع الحقوق محفوظه من ',
              saturday: 'السبت',
              sunday: 'الاحد',
              monday: 'الاثنين',
              tuesday: 'الثلاثاء',
              wednesday: 'الاربعاء',
              thursday: 'الخميس',
              friday: 'الجمعه',
              search_student_or_user_name:'ابحث باسم الطالب او المستخدم',
              this_account_has_been_suspended_as_your_school_is_suspended:'هذا الحساب تم ايقافه لان حساب المدرسه تم ايقافه',
              search_student_name:'بحث باسم الطالب',
              search_student_phone:'بحث بتليفون الطالب',
              search_student_user_id:'بحث برقم المستخدم',
              search_student_email:'بحث ببريد المستخدم',
              choose_doctor:'اختار معالج',
              start_new_session:'ابدا جلسه جديده',
              enter_password:'ادخل كلمه السر',
              password_confirmation:'تاكيد كلمه السر',
              the_session_is_over:'الجلسه انتهت',
              doctor:'المعالج'
            }
          }
        },
      }
    ],
    'cookie-universal-nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    'vue-sweetalert2/nuxt',
    '@nuxtjs/device',
    '@nuxtjs/toast',
    ['@nuxtjs/laravel-echo', {
      authEndpoint: dev ? 'http://127.0.0.1:8000/broadcasting/auth' : 'https://api.promental.dev-krito.com/broadcasting/auth',
      auth: {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'en-US,en;q=0.9',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Headers': '*',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
      },
      authHost: dev ? 'http://127.0.0.1:8000' : 'https://api.promental.net/',
      authModule: true,
      broadcaster: 'pusher',
      key: '599871ac7a807111bc50',
      encrypted: true,
      cluster: 'eu',
    }]
  ],
  toast: {
    position: 'top-center',
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },

  /*
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: dev ? process.env.BASE_URL || "http://127.0.0.1:8000/api/" : process.env.BASE_URL || "https://api.promental.net/api/",
  },
  env: {
    baseUrl: process.env.BASE_URL || 'https://api.promental.net/api/',
    StorageUrl: process.env.StorageUrl || 'https://api.promental.net/assets'
  },
  auth: {
    redirect: false,
    strategies: {
      user: {
        _scheme: 'local',
        endpoints: {
          login: {url: '/auth/user', method: 'post', propertyName: 'token'},
          logout: {url: '/auth/logout', method: 'get'},
          user: {url: '/user', method: 'get', propertyName: 'data'}
        },
      },
    },
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    // rtl: true,
    icons: {
      iconfont: 'fas',
    },
    theme: {

      light: true,
      dark: false,
      themes: {
        light: {
          primary: '#3f51b5',
          secondary: '#b0bec5',
          anchor: '#8c9eff',
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: ['@nuxtjs/auth'],
    /*
    ** You can extends webpack config here
    */
    extend(config, ctx) {
    }
  }
}