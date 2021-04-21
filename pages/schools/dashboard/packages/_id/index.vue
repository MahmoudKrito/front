<template>
  <div class="dashboard">
    <div :class="{rtl:current_lang === 'ar'}">
      <main class="main-wrapper">
        <SchoolSide></SchoolSide>
        <section class="content-wrapper">
          <!-- Content -->
          <div class="container-fluid">
            <div class="main-content">
              <div class="content-side">
                <!--  -->
                <div class="section-wrapper section-custom section-custom-2">
                  <div class="table-responsive" style="margin-top: 30px;">
                    <table class="table  table-bordered text-center">
                      <thead>
                      <tr>
                        <th scope="col"> {{ $t('name') }}</th>
                        <th scope="col"> {{ $t('sessions_number') }}</th>
                        <th scope="col"> {{ $t('student_count') }}</th>
                        <th scope="col"> {{ $t('total_price') }}</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>{{ current_lang == 'ar' ? package_category.name_ar : package_category.name_en }}</td>
                        <td>{{ package_category.total_sessions }}</td>
                        <td>{{ school_package.student_count }}</td>
                        <td>{{ package_category.price * package_category.total_sessions }}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>

                  <div class="alert alert-danger" v-if="error_message">{{ error_message }}</div>


                  <div class="row">
                    <div class="col-4">
                      <input type="text" class="form-control" :placeholder="$t('search_student_name')" v-model="name">
                    </div>
                    <div class="col-4">
                      <input type="number" class="form-control" :placeholder="$t('search_student_phone')"
                             v-model="phone">
                    </div>
                    <div class="col-4">
                      <input type="text" class="form-control" :placeholder="$t('search_student_email')" v-model="email">
                    </div>
                  </div>


                  <div class="table-responsive" style="margin-top: 30px;">
                    <table class="table  table-bordered text-center">
                      <thead>
                      <tr>
                        <th scope="col"><p> {{ $t('select') }} </p></th>
                        <th scope="col"> {{ $t('name') }}</th>
                        <th scope="col"> {{ $t('phone') }}</th>
                        <th scope="col"> {{ $t('user_id') }}</th>
                        <th scope="col"> {{ $t('age') }}</th>
                        <th scope="col"> {{ $t('classroom') }}</th>
                      </tr>
                      </thead>
                      <tbody>

                      <tr v-for="(student,index) in filteredStudents3">
                        <th scope="col">
                          <input type="checkbox" :value="student.id" v-model="students_id" v-if="flag==2">
                          <span v-else>{{ ++index }}</span>
                        </th>
                        <th scope="col" v-if="student.user">{{ student.user.first_name }} {{
                            student.user.last_name
                          }}
                        </th>
                        <th scope="col" v-if="student.user">{{ student.user.phone }}</th>
                        <th scope="col" v-if="student.user">{{ student.user.email }}</th>
                        <th scope="col" v-if="student.user">{{ student.age }}</th>
                        <th scope="col" v-if="student.user">{{ student.classroom }}</th>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <nav aria-label="Page navigation" class="text-center center-block">
                        <ul class="pagination">
                          <li :class="prev ? 'disabled' : ''">
                            <a href="" aria-label="Previous" @click="prevStep">
                              <span aria-hidden="true">&laquo;</span>
                            </a>
                          </li>

                          <li :class="current_page == c ? 'active' : ''" v-for="c in count2">
                            <a href="" @click.prevent="getPackage(c)">{{ c }}</a>
                          </li>
                          <li :class="next ? 'disabled' : ''">
                            <a href="" aria-label="Next" @click="nextStep">
                              <span aria-hidden="true">&raquo;</span>
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>

                    <div class="col-6">
                      <button class="btn btn-main" type="button" style="margin-top:20px"
                              @click.prevent="updateStudentPackage()" v-if="flag==2">done
                      </button>
                    </div>

                  </div>

                </div>


              </div>

              <schoolNotifications></schoolNotifications>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
import SchoolSide from "@/layouts/SchoolSideD";
import schoolNotifications from "@/components/schoolNotifications";


export default {
  head() {
    return {
      title: 'students',
    };
  },
  layout: 'SchoolHeaderD',
  components: {SchoolSide, schoolNotifications},
  middleware: 'schoolSuspend',
  data() {
    return {
      package_id: this.$route.params.id,
      school_package: {},
      package_category: {},
      students: {},
      last_page: '',
      count2: [],
      stepIndex: '',
      next: false,
      prev: false,
      current_page: '',
      students_id: [],
      error_message: '',
      name: '',
      phone: '',
      email: '',
      isLoaded: false,
      flag: 0
    }
  },
  mounted() {
    this.getPackage(1)
  },
  methods: {
    nextStep(e) {
      e.preventDefault();
      if (this.stepIndex < this.count2.length) {
        this.stepIndex++;
        this.getDoctors(this.stepIndex)
      }
      if (this.stepIndex == this.count2.length) {
        this.next = true
      }
    },
    prevStep(e) {
      e.preventDefault();
      if (this.stepIndex > 1) {
        this.stepIndex--;
        this.getDoctors(this.stepIndex)
      }
      if (this.stepIndex == 1) {
        this.prev = true
      }
    },
    getPackage(page) {
      this.stepIndex = page;
      this.$axios.get('/school/schoolPackages/' + this.package_id + '/show?page=' + page)
        .then(response => {
          this.isLoaded = true
          this.school_package = response.data.data
          this.package_category = response.data.package_category
          this.students = response.data.students.data
          this.last_page = response.data.students.last_page;
          this.current_page = response.data.students.current_page;
          this.flag = response.data.flag
          if (this.count2.length == 0) {
            for (var i = 1; i <= this.last_page; i++) {
              this.count2.push(i)
            }

          }
        })
    },

    updateStudentPackage() {
      if (this.students_id.length != this.school_package.student_count) {
        // if (this.students_id.length != 10) {
        if (this.current_lang == 'en') {
          this.error_message = 'count of students is not equivalent to : ' + this.school_package.student_count
        } else if (this.current_lang == 'ar') {
          this.error_message = 'عدد الطلاب لا يساوي  : ' + this.school_package.student_count
        }

      } else {
        this.error_message = ''
        this.$axios.post('/school/schoolPackages/updateStudentsPackages', {
          student_id: this.students_id,
          package_category_id: this.package_category.id,
          school_id: this.$auth.user.school.id
        })
          .then(response => {
            this.$router.push(this.localePath('/schools/dashboard/packages'))
          })
      }

    }
  },
  computed: {
    current_lang() {
      return this.$i18n.locale
    },
    // filteredStudents: function () {
    //   if (this.isLoaded == true && this.name) {
    //     return this.students.filter(student => {
    //       return (student.user.first_name +' '+ student.user.last_name).match(this.name)
    //     })
    //   }
    // },
    //
    // filteredStudents2: function () {
    //   if (this.isLoaded == true && this.phone) {
    //     // return this.filteredStudents.filter(student => {
    //     //   return student.user.phone.match(this.phone)
    //     // })
    //     return this.students.filter(student => {
    //       return (student.user.phone).match(this.phone)
    //     })
    //   }
    // },
    filteredStudents3: function () {
      if (this.isLoaded == true && this.name) {
        return this.students.filter(student => {
          return (student.user.first_name && student.user.last_name) ?
            (student.user.first_name + ' ' + student.user.last_name).match(this.name) :
            ''
        })
      }
      if (this.isLoaded == true && this.phone) {
        return this.students.filter(student => {
          return student.user.phone ? (student.user.phone).match(this.phone) : ''
        })
      }
      if (this.isLoaded == true && this.email) {
        return this.students.filter(student => {
          return student.user.email ? (student.user.email).match(this.email) : ''
        })
      }
      return this.students;
    },
  },
}
</script>

<style scoped>
.main-wrapper {
  padding-top: 100px;
}

*:not(i) {
  font-family: 'Montserrat', 'Cairo', serif, Arial;
}

.student-profile {
  text-align: center !important;
}

</style>
