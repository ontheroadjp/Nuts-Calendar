// vue
import Vue from 'vue';
//Vue.config.debug = true;
//Vue.config.silent = true;

// vue-router
import VueRouter from 'vue-router';
import { configRouter } from './router/vue-router-config.js'
Vue.use(VueRouter);

// axios
import axios from 'axios';
axios.defaults.timeout = 2500;

// core lib
import nutsHub from './NutsHub.js';
window.nutsHub = nutsHub;

// Application
import App from './App.vue';

const router = new VueRouter({
    history: true,
    saveScrollPosition: true
});

// vue-router settings
configRouter(router);

router.start(App, '#app');
