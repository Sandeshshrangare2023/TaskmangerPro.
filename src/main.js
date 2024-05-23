import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'


import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faStop } from '@fortawesome/free-solid-svg-icons'


library.add(faAngleUp, faAngleDown)

library.add(faUserSecret)
library.add(faPlay)
library.add(faStop)


import 'vue-toastification/dist/index.css';
import Toast from 'vue-toastification';

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon) 
  .use(router)
  .use(Toast, {
    position: 'top-center',
    timeout: 1600, // Set the duration for the toast notification
  })
  .mount('#app');
  

import 'bulma/css/bulma.min.css';

