import { SET_VALUE } from '../../mutation-types.js';

export default {
    namespaced: true,

    state: {
        disabled: false
    },

    mutations: {
        [SET_VALUE]( state, { key, value } ) {
            state[key] = value;
        }
    }
};
