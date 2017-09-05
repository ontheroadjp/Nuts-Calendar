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

    actions: {
        fetchCalendar( { state, commit }, calendarId) {
            u.clog('fetchCalendar(' + calendarId + ')');
            if(calendarId === 'dashboard') return;

            commit('isLoading', true);
    
            const id = calendarId;
            const y = state.currentYear;
            const m = state.currentMonth;
            const url = '/api/v1/calendar/' + id + '/' + y + '/' + m;
    
            http.fetchGet(url)
                .then( response => {
                    u.clog('success');
                    commit('init', response.data.days );
        
                    Object.keys(response.data.members).forEach(function(key) {
                        let val = this[key];
                        val.isShow = true;
//                        u.clog(key + ':' + val.name);
                    }, response.data.members);
        
                    commit('isLoading', false);
                })

                .catch( error => {
                    u.clog('failed');
                    commit('isLoading', false);
                });
            }
    },

    mutations: {
        init( state, calendars ) {
            state.data.calendars = calendars;
        },

        setValue( state, { key, value } ) {
            state[key] = value;            
            if(key == 'currentId') {
                localStorage.setItem('currentCalendarId', value);
            }
        },

        isLoading( state, value ) {
            state.isLoading = value;
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
