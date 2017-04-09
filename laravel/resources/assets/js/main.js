// vue
import Vue from 'vue';
//Vue.config.debug = true;
//Vue.config.silent = true;

// vue-router
import VueRouter from 'vue-router';
import { init } from './router/vue-router-config.js';
//Vue.use(VueRouter);

const router = init( 
    new VueRouter({
        history: true,
        saveScrollPosition: true
    })
);

// utilities
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
router.start(App, '#app');
