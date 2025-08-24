import './assets/main.css';

import { createApp } from 'vue';
import Notifications from '@kyvg/vue3-notification';
import App from '@/App.vue';

const app = createApp(App);

app.use(Notifications, { componentName: 'PopupNotifier' });

app.mount('#app');
