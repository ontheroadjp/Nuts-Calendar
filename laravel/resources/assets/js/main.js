// components
import calendar from './components/Calendar.vue';
import nutsSidebar from './components/NutsSidebar.vue';
import nutsYmSelector from './components/NutsYmSelector.vue';
import nutsToggleButton from './components/NutsToggleButton.vue';
import nutsYmField from './components/NutsYmField.vue';
import nutsModal from './components/NutsModal.vue';

// directives
//import nutsFocus from './directives/NutsFocus.vue';

// Event Bus
//var nutsBus = new Vue();

Vue.directive('focus', {
    update: function () {
        console.log('v-focus update!');
        var object = this.el;
        Vue.nextTick(function() {
            object.focus();
        });
    }
});

var vm = new Vue({
    el: '.container',
    components: {
        'calendar': calendar,
        'nuts-sidebar': nutsSidebar,
        'nuts-sidebar-toggle-button': nutsToggleButton,
        'nuts-ym-selector': nutsYmSelector,
        'nuts-table-mode-toggle-button': nutsToggleButton,
        'nuts-ym-field': nutsYmField,
        'nuts-modal': nutsModal,
    },
//    directives: {
//        'focus': nutsFocus,
//    }
});
