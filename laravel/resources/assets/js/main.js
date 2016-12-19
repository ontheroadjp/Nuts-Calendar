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
    components: {
        'nuts-alert': nutsAlert,
        'fc-hero': fcHero,
        'fc-calendar': fcCalendar,
        'fc-settings': fcSettings,
    },

    data() {
        return {
            mainIndex: 0
        }
    },

    computed: {
        currentView: function() {
            if(this.mainIndex == 0) return 'fc-calendar';
            if(this.mainIndex == 1) return 'fc-calendar';
            if(this.mainIndex == 99) return 'fc-settings';
        }

    },

    created() {
        this.$root.$on('main-menu-calendar', function() {
            this.mainIndex = 0;
        });

        this.$root.$on('main-menu-add-event', function(index) {
            this.mainIndex = 1;
        });

        this.$root.$on('main-menu-settings', function(index) {
            this.mainIndex = 99;
        });
    }

});
