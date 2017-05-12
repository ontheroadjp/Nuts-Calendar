import Vue from 'vue';

export default {
        inserted: function(el) {
            Vue.nextTick(() => el.focus());
        }
}
