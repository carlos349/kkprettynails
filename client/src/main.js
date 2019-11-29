// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRedo, faUserCheck, faTrash, faEdit, faCopy, faTimes, faSearch, faAngleLeft, faAngleRight, faCreditCard, faDollarSign, faCloudUploadAlt, faUsers, faUserLock, faPlus, faClipboardCheck, faTasks, faPollH, faUserTag, faBoxOpen, faSearchDollar, faChartLine, faCashRegister, faCaretDown, faCaretUp, faBoxes, faCheckSquare, faTags, faPlusSquare, faUserPlus, faAddressBook, faCalendarAlt, faSortUp, faSort, faSortDown} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
import {ServerTable, ClientTable, Event} from 'vue-tables-2'



require("../node_modules/bootstrap/dist/css/bootstrap.css")

library.add(faRedo, faUserCheck, faTrash,faEdit,faCopy,faTimes,faSearch, faAngleRight, faAngleLeft, faCreditCard, faDollarSign, faCloudUploadAlt, faUsers, faUserLock, faPlus, faClipboardCheck, faTasks, faPollH, faUserTag, faBoxOpen, faSearchDollar, faChartLine, faCashRegister, faCaretDown, faCaretUp, faBoxes, faCheckSquare, faTags, faPlusSquare, faUserPlus, faAddressBook, faCalendarAlt, faSortUp, faSort, faSortDown )

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(VueSweetalert2);
Vue.use(Autocomplete)
Vue.use(ClientTable);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
