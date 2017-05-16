import Vue from 'vue';
import Vuex from 'vuex';
import state from './state.js';
import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

import columnInsert from './column/insert.js';
import columnUpdate from './column/update.js';
import columnRemove from './column/remove.js';

import itemInsert from './item/insert.js';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',

    state,
    mutations,
    actions,
    getters,

    modules: {
        action: {
            namespaced: true,
            modules: {
                column: {
                    namespaced: true,
                    getters: {
                        isModalActive: (state) => {
                            return state.update.isActive && state.remove.isActive
                        },
                    },
                    modules: {
                        insert: columnInsert,
                        update: columnUpdate,
                        remove: columnRemove,
                    }
                },
                item: {
                    namespaced: true,
                    getters: {
                        isModalActive: ( state, getters, rootState ) => {
                            return rootState.calendar.behavior.item.editItem.isActive
                                && rootState.calendar.behavior.item.deleteItem.isActive;
                        },
                    },
                    modules: {
                        insert: itemInsert,
//                        update: columnUpdate,
//                        remove: columnRemove,
                    }
                }
            }
        }
    }
})
