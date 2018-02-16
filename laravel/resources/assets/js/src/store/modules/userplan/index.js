import { SET_VALUE } from '../../mutation-types.js';

export default {
    namespaced: true,

    state: {
        data: {
            userplans: {}
        }
    },

    mutations: {
        init( state, userplans ) {
            state.data.userplans = userplans;
        },
    }
};
