import Vue from 'vue';

export default {
    namespaced: true,

    state: {
        disabled: false
    },

    mutations: {
        setValue: function( state, { key, value } ) {
            state[key] = value;
        }
    }
}
