import Vue from 'vue';

export const focus = {
    inserted( el ) {
        Vue.nextTick(() => el.focus());
    }
}
