// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRedo, faUserCheck, faTrash, faEdit, faCopy, faTimes, faSearch, faAngleLeft, faAngleRight, faCreditCard, faDollarSign, faCloudUploadAlt, faUsers, faUserLock, faPlus, faClipboardCheck, faTasks, faPollH, faUserTag, faBoxOpen, faSearchDollar, faChartLine, faCashRegister, faCaretDown, faCaretUp, faBoxes, faCheckSquare, faTags, faPlusSquare, faUserPlus, faAddressBook, faCalendarAlt, faSortUp, faSort, faSortDown, faMoneyBillWave, faMoneyCheckAlt, faHandHoldingUsd, faSignOutAlt, faFolderPlus,faTag, faPercent, faArrowCircleDown, faArrowCircleUp, faLevelUpAlt,faLevelDownAlt, faFilter, faMailBulk, faTable, faArrowLeft,faClock, faWindowClose, faHistory, faCog, faCalendarCheck} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
import {ServerTable, ClientTable, Event} from 'vue-tables-2'
import CKEditor from '@ckeditor/ckeditor5-vue';
import VueCurrencyInput from 'vue-currency-input'
import VueAnimate from 'vue-animate-scroll'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import VTooltip from 'v-tooltip'
 import VueApexCharts from 'vue-apexcharts'
 
// import 'vue-croppa/dist/vue-croppa.css'
// import Croppa from 'vue-croppa'
require("../node_modules/bootstrap/dist/css/bootstrap.css")

library.add(faRedo, faUserCheck, faTrash,faEdit,faCopy,faTimes,faSearch, faAngleRight, faAngleLeft, faCreditCard, faDollarSign, faCloudUploadAlt, faUsers, faUserLock, faPlus, faClipboardCheck, faTasks, faPollH, faUserTag, faBoxOpen, faSearchDollar, faChartLine, faCashRegister, faCaretDown, faCaretUp, faBoxes, faCheckSquare, faTags, faPlusSquare, faUserPlus, faAddressBook, faCalendarAlt, faSortUp, faSort, faSortDown,faMoneyBillWave, faMoneyCheckAlt, faHandHoldingUsd, faSignOutAlt, faFolderPlus, faTag, faPercent, faArrowCircleDown, faArrowCircleUp,faLevelUpAlt,faLevelDownAlt,faFilter,faMailBulk,faTable,faArrowLeft,faClock,faWindowClose,faHistory, faCog, faCalendarCheck )

const pluginOptions = {
  
  globalOptions: { currency: {'prefix':'$ '},precision: 2, distractionFree:false, autoDecimalMode:true}
}

Vue.use(VueAnimate)
Vue.use(vueCustomScrollbar)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(VueCurrencyInput, pluginOptions)
Vue.use(VueSweetalert2);
Vue.use(Autocomplete)
Vue.use(ClientTable);
Vue.use(CKEditor);
Vue.use(VTooltip)
Vue.component('apexchart', VueApexCharts)
// Vue.use(Croppa)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  
})
