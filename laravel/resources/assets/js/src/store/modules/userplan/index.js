import { SET_VALUE } from '../../mutation-types.js';
import {
    INIT,
} from '../../mutation-types.js';

export default {
    namespaced: true,

    state: {
        data: {
            userplans: {}
        }
    },

    mutations: {
        [INIT]( state, userplans ) {
            state.data.userplans = userplans;
        },
    }
};
