import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VCalendar from 'v-calendar';
import VueToast from 'vue-toast-notification';
import VueSweetalert2 from 'vue-sweetalert2';
import VueCookie from 'vue-cookie';
import VueTheMask from 'vue-the-mask'

// Tell Vue to use the plugin
Vue.use(VueCookie);

Vue.use(VueTheMask)

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
};

Vue.use(VueSweetalert2, options);

Vue.use(Vuelidate)

// Use v-calendar & v-date-picker components
Vue.use(VCalendar);

Vue.use(VueToast, {
  // One of the options
  position: 'top'
});
