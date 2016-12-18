// components
//import nutsSidebar from './nuts-vue-components/NutsSidebar.vue';
//import nutsYmSelector from './nuts-vue-components/NutsYmSelector.vue';
//import nutsToggleButton from './nuts-vue-components/NutsToggleButton.vue';
import nutsAlert from './nuts-vue-components/NutsAlert.vue';
import nutsModal from './nuts-vue-components/NutsModal.vue';

import fcHero from './components/FcHero.vue';
import fcCalendar from './components/FcCalendar.vue';
import fcMemberTabs from './components/FcMemberTabs.vue';

Vue.directive('focus', {
    update: function () {
        console.log('v-focus update!');
        var object = this.el;
        Vue.nextTick(function() {
            object.focus();
        });
    }
});

window.vm = new Vue({
    el: 'body',
    components: {
        'fc-hero': fcHero,
        'fc-calendar': fcCalendar,
//        'nuts-sidebar': nutsSidebar,
//        'nuts-sidebar-toggle-button': nutsToggleButton,
//        'nuts-table-mode-toggle-button': nutsToggleButton,
//        'nuts-ym-selector': nutsYmSelector,
        'nuts-alert': nutsAlert,
        'nuts-members-modal': nutsModal,
        'nuts-member-tabs': fcMemberTabs,
    },

    computed: {
        currentView: function() {
            return 'fc-calendar'
        },
    },

});
