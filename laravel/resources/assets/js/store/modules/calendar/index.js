import toolPalette  from './table-view/tool-palette.js';
import insert       from './table-view/item/insert.js';
import update       from './table-view/item/update.js';
import remove       from './table-view/item/remove.js';
import dnd          from './table-view/item/dnd.js';

const now = new Date();

const calendar = {
    namespaced: true,
    state: {
        isLoading: false,
        currentId: 'dashboard',
        currentYear: now.getFullYear(),
        currentMonth: ('0' + (now.getMonth() + 1)).slice(-2),
        data: {
            calendars: [],
//            members: []
        }
    },

    mutations: {
        init( state, calendars ) {
            state.data.calendars = calendars;
        },

        setCurrentYear( state, year ) {
            state.currentYear = year;
        },
    
        setCurrentMonth( state, month ) {
            state.currentMonth = month;
        }
    },

    modules: {
        tableView: {
            namespaced: true,
            modules: {
                toolPalette: toolPalette,

                item: {
                    namespaced: true,
                    getters: {
                        isModalActive: ( state, getters, rootState ) => {
                            return state.update.isActive && state.remove.isActive;
                        }
                    },
                    modules: {
                        insert: insert,
                        update: update,
                        remove: remove,
                        dnd: dnd
                    }
                }
            }
        }
    }
}
export default calendar
