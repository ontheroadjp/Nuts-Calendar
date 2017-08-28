import Vue  from 'vue';
import Vuex from 'vuex';
import state        from './state.js';
import mutations    from './mutations.js';
import actions      from './actions.js';
import getters      from './getters.js';

//import appTheme from './app/theme.js';
//import appNotification from './app/notification.js';

import { en }   from '../i18n/en.js';
import ja       from '../i18n/ja.js';

import tableViewToolPalette from './calendar/table-view/tool-palette.js';
import columnInsert         from './calendar/table-view/column/insert.js';
import columnUpdate         from './calendar/table-view/column/update.js';
import columnRemove         from './calendar/table-view/column/remove.js';
import itemInsert           from './calendar/table-view/item/insert.js';
import itemUpdate           from './calendar/table-view/item/update.js';
import itemRemove           from './calendar/table-view/item/remove.js';
import itemDnd              from './calendar/table-view/item/dnd.js';

Vue.use(Vuex);

const now = new Date();

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

        i18n: {
            namespaced: true,
            modules: {
                en: en,
                ja: ja
            }
        },

        dashboard: {
            namespaced: true,
            state: {
                currentId: 0,
                data: {
                    userCalendars: [],
                    userCalendarMembers: [],
                    members: []
                }
            },

            mutations: {
                setCurrentId(state, { id }) {
                    state.currentId = id
                },

                addUserCalendarMember(state, { obj }) {
                    state.data.userCalendarMembers.push(obj);
                },

                removeUserCalendarMember(state, { obj }) {
                    const index = state.data.userCalendarMembers.indexOf(obj);
                    state.data.userCalendarMembers.splice(index, 1);
                },
            },

//            calendar: {
//                namespaced: true,
//                modules: {
//                    members: {
////                        insert: memberInsert,
////                        update: memberUpdate,
////                        remove: memberRemove,
////                        dnd: memberDnd
//                    }
//                }
//            }
        },

        calendar: {
            namespaced: true,
            state: {
                isLoading: false,
                currentId: 'dashboard',
                currentYear: now.getFullYear(),
                currentMonth: ('0' + (now.getMonth() + 1)).slice(-2),
                data: {
//                    userCalendars: [],
                    calendars: [],
                    members: []
                }
            },

            modules: {
                tableView: {
                    namespaced: true,
                    modules: {
                        toolPalette: tableViewToolPalette,

                        column: {
                            namespaced: true,
                            getters: {
                                isModalActive: (state) => {
                                    return state.update.isActive && state.remove.isActive
                                }
                            },
        
                            modules: {
                                insert: columnInsert,
                                update: columnUpdate,
                                remove: columnRemove
                            }
                        },

                        item: {
                            namespaced: true,
                            getters: {
                                isModalActive: ( state, getters, rootState ) => {
                                    return state.update.isActive && state.remove.isActive;
                                }
                            },
                            modules: {
                                insert: itemInsert,
                                update: itemUpdate,
                                remove: itemRemove,
                                dnd: itemDnd
                            }
                        }

                    }
                }
            }
        },
        
    }
})
