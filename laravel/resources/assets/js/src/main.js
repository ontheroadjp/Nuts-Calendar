// vue
import Vue from 'vue';
Vue.config.silent = false;
Vue.config.productionTip = false;

Vue.config.errorHandler = function (err, vm, info) {
  // エラー処理
  // `info` は Vue 固有のエラー情報です（例： どのライフサイクルフックでエラーが起きたかなど）。
  // 2.2.0 以降で使用できます。
}

Vue.config.warnHandler = function (msg, vm, trace) {
  // `トレース`はコンポーネント階層のトレースです
}

Vue.config.performance = true;

// vue-router
import VueRouter from 'vue-router';
import { init, routes } from './router/vue-router-config.js';
const router = init(
    new VueRouter({
        routes,
        mode: 'history',
        scrollBehavior: function (to, from, savedPosition) {
            return savedPosition || { x: 0, y: 0 }
        }
    })
);
Vue.use(VueRouter);

// utils
import { utils } from './libs/utils.js';
window.u = utils;

// jwt-token
import { jwtToken } from './libs/jwt-token.js';
window.jwtToken = jwtToken;

// http
import { http } from './libs/http.js';
window.http = http;
http.init();

// event bus
import { eventBus } from './libs/event.js';
window.eventBus = eventBus;

// Application
import App from './app.vue';

new Vue({
    router,
    render(h) { return h(App) }
}).$mount('#app');
