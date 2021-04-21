<template>
  <div class="dashboard">
    <div :clas="{rtl:current_lang === 'ar'}">
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
                    <p>{{ $t('subscription_data') }}</p>
                    <table class="table  table-bordered text-center">
                      <thead>
                      <tr>
                        <th scope="col"> {{ $t('name') }}</th>
                        <th scope="col"> {{ $t('start_date') }}</th>
                        <th scope="col"> {{ $t('end_date') }}</th>
                        <th scope="col"> {{ $t('installs') }}</th>
                        <th scope="col">{{ $t('total') }}</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>{{ current_lang == 'en' ? subscription.name_en : subscription.name_ar }}</td>
                        <td>{{ school_subscription.from | formatDateByDay }}
                          {{ school_subscription.from | formatDateByMonth }}
                          {{ school_subscription.from | formatDateByYear }}
                        </td>
                        <td>{{ school_subscription.to | formatDateByDay }}
                          {{ school_subscription.to | formatDateByMonth }}
                          {{ school_subscription.to | formatDateByYear }}
                        </td>
                        <td>{{ school_subscription.installs }}</td>
                        <td>{{ payment.total }}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>

                  <div class="table-responsive" style="margin-top: 30px;">
                    <p>{{ $t('packages_details') }}</p>
                    <table class="table  table-bordered text-center">
                      <thead>
                      <tr>
                        <th scope="col"> {{ $t('sessions_number') }}</th>
                        <th scope="col"> {{ $t('students_number') }}</th>
                        <th scope="col"> {{ $t('total_price') }}</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(school_package,index) in school_packages">
                        <td>{{ school_package.sessions_number }}</td>
                        <td>{{ school_package.students_number }}</td>
                        <td>{{ school_package.price }}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>

                  <div class="alert alert-danger" v-if="error_message">{{ error_message }}</div>
                  <div class="row">
                    <div class="col-3">
                      <input type="text" class="form-control" :placeholder="$t('search_student_name')" v-model="name">
                    </div>
                    <div class="col-3">
                      <input type="number" class="form-control" :placeholder="$t('search_student_phone')"
                             v-model="phone">
                    </div>
                    <div class="col-3">
                      <input type="text" class="form-control" :placeholder="$t('search_student_email')" v-model="email">
                    </div>
                    <div class="col-3">
                      <select class="form-control" v-model="school_package_id"
                              @change="filterStudentsWithSchoolPackage()">
                        <option value="0">{{ $t('choose_package') }}</option>
                        <option v-for="(school_package,index) in  school_packages" :value="school_package.id">
                          {{ school_package.package_category.name_en }}
                        </option>
                      </select>
                    </div>
                  </div>


                  <div class="table-responsive" style="margin-top: 30px;">
                    <table class="table  table-bordered text-center">
                      <thead>
                      <tr>
                        <th scope="col"><p>#</p></th>
                        <th scope="col"> {{ $t('name') }}</th>
                        <th scope="col"> {{ $t('phone') }}</th>
                        <th scope="col"> {{ $t('email') }}</th>
                        <th scope="col"> {{ $t('age') }}</th>
                        <th scope="col"> {{ $t('classroom') }}</th>
                      </tr>
                      </thead>
                      <tbody>

                      <tr v-for="(student,index) in  filteredStudents3">
                        <th scope="col">
                          <span>{{ ++index }}</span>
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

                          <li :class="current_page == c ? 'active' : ''" v-for="c in count2"><a href=""
                                                                                                @click.prevent="getSubscriptionDetails(c)">{{
                              c
                            }}</a></li>
                          <li :class="next ? 'disabled' : ''">
                            <a href="" aria-label="Next" @click="nextStep">
                              <span aria-hidden="true">&raquo;</span>
                            </a>
                          </li>
                        </ul>
                      </nav>
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
      title: 'subscriptions-history',
    };
  },
  layout: 'SchoolHeaderD',
  middleware: 'schoolSuspend',
  components: {SchoolSide, schoolNotifications},
  data() {
    return {
      school_subscription_id: this.$route.params.id,
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
      isLoaded: false,
      flag: 0,
      school_subscription: {},
      school_packages: {},
      subscription: {},
      payment: {},
      school_package_id: 0,
      email: ''
    }
  },
  mounted() {
    this.getSubscriptionDetails(1)
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
    getSubscriptionDetails(page) {
      this.stepIndex = page;
      this.$axios.get('/school/subscription-history/' + this.school_subscription_id + '/show?page=' + page)
        .then(response => {
          this.isLoaded = true
          this.school_subscription = response.data.school_subscription
          this.school_packages = response.data.school_packages
          this.last_page = response.data.students.last_page;
          this.current_page = response.data.students.current_page;
          this.subscription = response.data.subscription;
          this.payment = response.data.payment;
          this.students = response.data.students.data;
          if (this.count2.length == 0) {
            for (var i = 1; i <= this.last_page; i++) {
              this.count2.push(i)
            }

          }
        })
    },
    filterStudentsWithSchoolPackage() {
      this.$axios.post('/school/subscription-history/filterStudents', {
        school_package_id: this.school_package_id
      }).then(response => {
        if (response.data.status == '200') {
          this.students = response.data.data.data
        }

      })
    }
  },
  computed: {
    current_lang() {
      return this.$i18n.locale
    },
    // filteredStudents: function () {
    //   if (this.isLoaded == true) {
    //     return this.students.filter(student => {
    //       return student.user.first_name.match(this.name)
    //     })
    //   }
    // },
    //
    // filteredStudents2: function () {
    //   if (this.isLoaded == true) {
    //     return this.filteredStudents.filter(student => {
    //       return student.user.phone.match(this.phone)
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
</style>
