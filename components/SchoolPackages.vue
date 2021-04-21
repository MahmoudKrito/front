<template>
  <div class="form-group">
    <div class="input-group">
                            <span class="input-group-addon">
                                <button type="button" tabindex="0" class="" role="button" data-toggle="popover"
                                        data-trigger="focus"
                                        :data-content="data_content">
                                    <i class="fa fa-info-circle"></i>
                                </button>

                                <i class="fa fa-circle"></i>
                                {{ name }}
                            </span>
      <div class="row">
        <div class="col-xs-4">
          <select name="" class="form-control" v-model="selected">
            <option value="" selected disabled>عدد الجلسات</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div class="col-xs-4">
          <input type="number" class="form-control" name="" :value="price">
        </div>
        <div class="col-xs-4">
          <input type="number" class="form-control" name="" placeholder="عدد الطلاب" v-model="students_number">
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'schoolPackages',
    props: ['data_content', 'name', 'price'],
    data() {
      return {
        selected: '',
        students_number: '',
        session_price: this.price,
      }
    },
    computed:{
      price_total(){
        return this.session_price*this.selected
      }
    },
  }
</script>
