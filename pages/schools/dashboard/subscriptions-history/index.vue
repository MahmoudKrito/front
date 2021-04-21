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
                    <table class="table  table-bordered text-center">
                      <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col"> {{ $t('name') }}</th>
                        <th scope="col"> {{ $t('start_date') }}</th>
                        <th scope="col"> {{ $t('end_date') }}</th>
                        <th scope="col"> {{ $t('installs') }}</th>
                        <th scope="col">{{ $t('total') }}</th>
                        <th scope="col">{{ $t('view') }}</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(school_subscription,index) in school_subscriptions">
                        <th scope="row">{{ ++index }}</th>
                        <td>{{
                            current_lang == 'en' ? school_subscription.subscription.name_en : school_subscription.subscription.name_ar
                          }}
                        </td>
                        <td>{{ school_subscription.from | formatDateByDay }}
                          {{ school_subscription.from | formatDateByMonth }}
                          {{ school_subscription.from | formatDateByYear }}
                        </td>
                        <td>{{ school_subscription.to | formatDateByDay }}
                          {{ school_subscription.to | formatDateByMonth }}
                          {{ school_subscription.to | formatDateByYear }}
                        </td>
                        <td>{{ school_subscription.payment.installs }}</td>
                        <td>{{ school_subscription.payment.total }}</td>
                        <td>
                          <nuxt-link :to="'/schools/dashboard/subscriptions-history/'+school_subscription.id"><i
                            class="fa fa-eye" style="font-size:15px"></i></nuxt-link>
                        </td>
                      </tr>
                      </tbody>
                    </table>
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
      title: 'school-subscriptions',
    };
  },
  layout: 'SchoolHeaderD',
  middleware: 'schoolSuspend',
  components: {SchoolSide, schoolNotifications},
  data() {
    return {
      school_subscriptions: {}
    }
  },
  mounted() {
    this.getSubscriptions()
  },
  methods: {
    getSubscriptions() {
      this.$axios.get('/school/subscription-history')
        .then(response => {
          this.school_subscriptions = response.data.data
        })
    }

  },
  computed: {
    current_lang() {
      return this.$i18n.locale
    }
  },
}
</script>

<style scoped>
.main-wrapper{
  padding-top:100px;
}
</style>

