import './assets/main.css';
import 'leaflet/dist/leaflet.css';
import { createApp } from 'vue';
import App from '@/App.vue';
import { createPinia } from 'pinia';
import Notifications from '@kyvg/vue3-notification';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

app.use(Notifications, { componentName: 'PopupNotifier' });

app.mount('#app');
