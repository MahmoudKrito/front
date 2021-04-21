// plugins/filters.js
import Vue from 'vue';
import moment from 'moment';

Vue.filter('sliceText', function (value, index, length) {
  if (value) {
    return value.slice(index, length)
  }
});

Vue.filter('subBody', function (value) {
  if (value) {
    return value.substring(1, 100)
  }
});

Vue.filter('formatDateByMonth', function (value) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const d = new Date(value);
  return monthNames[d.getMonth()]
});

Vue.filter('formatDateByDay', function (value) {
  if (value) {
    return moment(String(value)).utc('+2').format('DD')
  }
});

Vue.filter('formatDateByYear', function (value) {
  if (value) {
    return moment(String(value)).utc().format('YYYY')
  }
})


Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).utc().format('MM/DD/YYYY')
  }
});

