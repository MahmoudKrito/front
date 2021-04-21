<template>
  <main class="main-wrapper">
    <SchoolSide></SchoolSide>
    <section class="content-wrapper">
      <!-- Content -->
      <div class="container-fluid">
        <div class="main-content">
          <div class="content-side">
            <!--  -->
            <div class="section-wrapper section-custom section-custom-2">
              <!-- Students -->
              <div class="student-row">
                <div class="student-wrapper" id="myDiv">
                  <table class="table">
                    <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">الاسم</th>
                      <th scope="col">الصف</th>
                      <th scope="col">رقم المستخدم</th>
                      <th scope="col">كلمه السر</th>
                      <th scope="col">عدد الجلسات</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(student,index) in students">
                      <th scope="col">{{ index }}</th>
                      <th scope="col" v-if="student.user">{{ student.user.first_name }} {{
                          student.user.last_name
                        }}
                      </th>
                      <th scope="col" v-else>no user</th>
                      <th scope="col">{{ student.classroom }}</th>
                      <th scope="col" v-if="student.user">{{ student.user.email }}</th>
                      <th scope="col" v-else>no user</th>
                      <th scope="col" v-if="student.user">{{ student.first_password }}</th>
                      <th scope="col" v-else>no user</th>
                      <th scope="col" v-else>{{ student.sessions.length }}</th>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <button class="btn btn-main" @click="printStudentsSheet()">print</button>
            </div>
          </div>
          <schoolNotifications></schoolNotifications>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import SchoolSide from "@/layouts/SchoolSideD";
import schoolNotifications from "@/components/schoolNotifications";
import $ from 'jquery'

export default {
  head() {
    return {
      title: 'students',
    };
  },
  layout: 'SchoolHeaderD',
  middleware: 'schoolSuspend',
  components: {SchoolSide, schoolNotifications},
  data() {
    return {
      students: {},
      page: this.$route.params.page
    }
  },
  mounted() {
    this.getStudents()
  },
  methods: {
    getStudents() {
      this.$axios.$get('/school/students')
        .then(response => {
          this.students = response.data;
          console.log(this.students)
        })
    },
    printStudentsSheet() {
      var printContents = document.getElementById('myDiv').innerHTML;
      var originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;

      window.print();

      document.body.innerHTML = originalContents;
    }
  }
}
</script>
<style scoped>
.main-wrapper{
  padding-top:100px;
}

*:not(i) {
  font-family: 'Montserrat', 'Cairo', serif, Arial;
}
</style>
