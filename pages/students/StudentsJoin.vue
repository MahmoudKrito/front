<template>
  <div :class="{rtl:current_lang === 'ar'}">
    <div v-if="loading" class="loading-page">
      <div class="loading"></div>
    </div>
    <section class="page-banner students-banner">
      <div class="container">
        <div class="page-banner-title">
          <img src="https://api.promental.net/images/website/students-white.png" alt="" v-if="current_lang == 'ar'">
          <img src="https://api.promental.net/images/website/students-white_en.png" alt="" v-if="current_lang == 'en'">
        </div>
      </div>
    </section>
    <!-- Content -->
    <section class="container">
      <!--  Page Icon  -->
      <div class="page-name">
        <img src="https://api.promental.net/images/website/students.svg" alt="" v-if="current_lang == 'ar'">
        <img src="https://api.promental.net/images/website/students_en.png" alt="" v-if="current_lang == 'en'">
      </div>
      <!--  Students  -->
      <div class="alert alert-danger" role="alert" v-if="formErrors.length > 0">
        <ul>
          <li v-for="error,index in formErrors">
            {{ error }}
          </li>
        </ul>
      </div>
      <div class="col-xs-12 col-md-8 col-md-push-2">
        <form class="form-student">
          <div class="form-student-title">{{ $t('student_data') }}</div>
          <div class="form-group">
            <input type="text" class="form-control" v-model="name"
                   :placeholder="$t('name')">
          </div>
          <div class="form-group">
            <input type="text" class="form-control" v-model="age"
                   :placeholder="$t('age')">
          </div>
          <div class="form-group">
            <input type="text" class="form-control" v-model="class_room"
                   :placeholder="$t('grade')">
          </div>

          <div class="row">
            <div class="form-group col-xs-12 col-md-6 ">
              <client-only>
                <tags-input element-id="tags" v-model="siblings_count" :typeahead="true"
                            :placeholder="$t('siblings_count')"
                            style="border-radius:20px;"></tags-input>
              </client-only>
            </div>
            <div class="form-group col-xs-12 col-md-6 ">
              <client-only>
                <tags-input element-id="tags" v-model="siblings_age" :typeahead="true"
                            :placeholder="$t('siblings_age')"
                            style="border-radius:20px;"></tags-input>
              </client-only>
            </div>
          </div>


          <div class="form-group">
            <input type="text" class="form-control" v-model="area"
                   :placeholder="$t('area')"
            >
          </div>
          <div class="form-group">
            <input type="text" class="form-control"
                   :placeholder="$t('school_name')" v-model="school_name">
          </div>

          <div class="form-group">
            <input type="text" class="form-control" v-model="teacher_name"
                   :placeholder="$t('basic_teacher_name')">
          </div>
          <div class="form-group">
            <client-only>
              <tags-input element-id="tags" v-model="hobbies" :typeahead="true"
                          :placeholder="$t('hobbies')"
                          style="border-radius:20px;"></tags-input>
            </client-only>
          </div>
          <br><br>
          <div class="form-group text-center">
            <button type="button" class="btn btn-main btn-lg"
                    @click.prevent="validateForm" :disabled="loading">
              {{ $t('join_request') }}
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
//import VoerroTagsInput from '@voerro/vue-tagsinput';
export default {
  layout: 'mainHeader',
  head() {
    return {
      title: 'StudentsJoin',

    };
  },
  data() {
    return {
      name: '',
      age: '',
      hobbies: [],
      siblings_count: [],
      siblings_age: [],
      class_room: '',
      area: '',
      teacher_name: '',
      general_settings: {},
      formErrors: [],
      school_name: '',
      loading:false
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
    },
    validateForm(e) {
      this.formErrors = [];
      console.log(this.formErrors);
      if (!this.name) {
        if (this.current_lang == 'en') {
          this.formErrors.push('name can not be empty')
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('الاسم فارغ ')
        }
      }
      if (!this.age) {
        if (this.current_lang == 'en') {
          this.formErrors.push('age can not be empty')
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('السن مطلوب  ')
        }

      }
      if (this.siblings_count.length == 0) {
        if (this.current_lang == 'en') {
          this.formErrors.push('add your siblings')
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('اضف الاخوات ')
        }

      }
      if (this.siblings_age.length == 0) {
        if (this.current_lang == 'en') {
          this.formErrors.push('add your siblings age')
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('اضف سن الاخوات')
        }
      }
      if (!this.class_room) {
        if (this.current_lang == 'en') {
          this.formErrors.push('class room can not be empty')
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('ادخل الفصل')
        }
      }
      if (!this.teacher_name) {
        if (this.current_lang == 'en') {
          this.formErrors.push('teacher name can not be empty')
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('اسم مدرس الفصل مطلوب')
        }
      }
      if (!this.area) {
        if (this.current_lang == 'en') {
          this.formErrors.push('area can not be empty')
        } else if (this.current_lang == 'ar') {
          this.formErrors.push(' اسم المنطقه مطلوب ')
        }
      }
      if (this.hobbies.length == 0) {
        if (this.current_lang == 'en') {
          this.formErrors.push('hobbies can not be empty')
        } else if (this.current_lang == 'ar') {
          this.formErrors.push('الهوايات مطلوبه')
        }
      }
      if (this.formErrors.length == 0) {
        this.studentJoin()
      }
      e.preventDefault();
    },
    studentJoin() {
      this.loading=true
      this.$axios.$post('/website/studentJoin', {
        'name': this.name,
        'age': this.age,
        'class_room': this.class_room,
        'siblings_count': this.siblings_count,
        'siblings_age': this.siblings_age,
        'area': this.area,
        'teacher_name': this.teacher_name,
        'hobbies': this.hobbies,
        'school_name': this.school_name
      })
        .then(response => {
          if (response.status == '200') {
            this.$swal('your data send');
            this.$router.push(this.localePath('/'))
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
.container {
  padding-top: 70px
}
</style>

