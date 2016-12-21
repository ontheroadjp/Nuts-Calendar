// core lib
import nutsHub from './NutsHub.js';
window.nutsHub = nutsHub;

// vuex
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
});
