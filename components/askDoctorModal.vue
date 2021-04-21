<template>
  <!-- Modal -->

  <div class="modal fade" id="consultModal" tabindex="-1" role="dialog" aria-labelledby="consultModal" v-if="showModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">&times;</span></button>

          <div class="container-fluid">
            <div class="consult-content-1">
              <div class="about-wrapper style-3 style-4">
                <div class="about-title">
                  <img src="https://api.promental.net/images/website/quick-consulting.svg" alt="">
                  <div class="arrow-animation"></div>
                </div>
              </div>
              <h4 class="text-center margin-10">اترك استشارتك</h4>
              <form action="">
                <div class="explain-consult-wrapper">
                  <div class="col-md-10 col-md-push-1">
                    <div class="explain-consult-title">
                      اشرح الأعراض التي تعاني منها حتى يتمكن الطبيب من تقديم الاستشارة المناسبة لك
                    </div>
                  </div>
                  <div class="form-group">
                    <textarea class="form-control" name="" rows="4"></textarea>
                  </div>
                  <div class="form-group">
                    <div class="checkbox">
                      <label>
                        <input type="checkbox">
                        جميع الأسئلة التي ترسل تظهر بشكل عام لجميع زوار الموقع
                      </label>
                    </div>
                  </div>
                  <div class="form-group text-center">
                    <button type="button" class="btn btn-send-consult">ارسال</button>
                  </div>
                </div>

              </form>
            </div>
            <div class="consult-content-2">
              <div class="col-md-10 col-md-push-1">
                <div class="consult-confirm-title">
                  جميع الأسئلة التي ترسل تظهر بشكل عام لجميع زوار الموقع
                </div>
                <div class="consult-confirm-wrapper">
                  <button type="button" class="btn btn-confirm-yes">نعم</button>
                  <button type="button" class="btn btn-confirm-no">لا</button>
                </div>
              </div>

            </div>
            <div class="consult-content-3">
              <div class="consult-confirmation">
                <img src="https://api.promental.net/images/website/confirmation.png" alt="">
                سيتم نشر السوال الخاص بكم في أقرب وقت
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'AskDoctorModal',
    props: {
      showModal: Boolean
    }
  }
</script>
