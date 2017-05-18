import Vue from 'vue';
import Vuex from 'vuex';
import state from './state.js';
import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

import appTheme from './app/theme.js';
import appNotification from './app/notification.js';

import { en } from '../i18n/en.js';
import ja from '../i18n/ja.js';

import calendarView from './calendar/view.js';

import columnInsert from './column/insert.js';
import columnUpdate from './column/update.js';
import columnRemove from './column/remove.js';

import itemInsert from './item/insert.js';
import itemUpdate from './item/update.js';
import itemRemove from './item/remove.js';
import itemDnd from './item/dnd.js';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',

    state,
    mutations,
    actions,
    getters,

    modules: {
//        app: {
//            namespaced: true,
//            modules: {
//                theme: appTheme,
//                notification: appNotification
//            }
//        },

//        calendar: {
//            namespaced: true,
//            modules: {
//
//            }
//        },

        i18n: {
            namespaced: true,
            modules: {
                en: en,
                ja: ja
            }
        },

        action: {
            namespaced: true,
            modules: {
                calendar: {
                    namespaced: true,
                    modules: {
                        view: calendarView
                    }
                },

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
                            return state.update.isActive && state.remove.isActive;
                        },
                    },
                    modules: {
                        insert: itemInsert,
                        update: itemUpdate,
                        remove: itemRemove,
                        dnd: itemDnd,
                    }
                }
            }
        }
    }
})
