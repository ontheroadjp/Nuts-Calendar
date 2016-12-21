//import vue from 'vue';
//import vuex from 'vuex';

// core lib
import nutsHub from './NutsHub.js';
window.nutsHub = nutsHub;

import store from './store/index.js'

// components
import nutsAlert from './nuts-vue-components/NutsAlert.vue';
import fcHero from './components/FcHero.vue';
import fcCalendar from './components/FcCalendar.vue';
import fcSettings from './components/FcSettings.vue';

Vue.directive('focus', {
    update: function () {
        console.log('v-focus update!');
        var object = this.el;
        Vue.nextTick(function() {
            object.focus();
        });
    }
});


const vm = new Vue({

    el: 'body',

    store,

    components: {
        'nuts-alert': nutsAlert,
        'fc-hero': fcHero,
        'fc-calendar': fcCalendar,
        'fc-settings': fcSettings,
    },

//    data() {
//        return {
//            mainIndex: 0,
//        }
//    },

    computed: {

        mainIndex: function() {
            return this.$store.state.mainIndex;
        },

        currentView: function() {
            if(this.mainIndex == 0) return 'fc-calendar';
            if(this.mainIndex == 1) return 'fc-calendar';
            if(this.mainIndex == 99) return 'fc-settings';
        }

    },

    created() {
        let self = this;

        nutsHub.listen('main-menu-calendar', function() {
            self.$store.commit('setMainIndex',0);
        }, 'main.js');

        nutsHub.listen('main-menu-add-event', function() {
            self.$store.commit('setMainIndex',1);
        }, 'main.js');

        nutsHub.listen('main-menu-settings', function() {
            self.$store.commit('setMainIndex',99);
        }, 'main.js');

    },

});
