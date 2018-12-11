import Vue from 'vue';
import toolPalette  from './table-view/tool-palette.js';
//import insert       from '../item/insert.js';
//import update       from '../item/update.js';
//import remove       from '../item/remove.js';
//import dnd          from '../item/dnd.js';
import {
    INIT,
    SET_VALUE,
    IS_LOADING,
    SORT_CELL_ITEMS,
    CHECK_TIME
} from '../../mutation-types.js';

const now = new Date();

function compareValues(key, order='asc') {
    return function(a, b) {
        if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string') ?
            a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ?
            b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order == 'desc') ? (comparison * -1) : comparison
        );
    };
}

const calendar = {
    namespaced: true,

    state: {
        isLoading: false,
        viewMode: 'monthly',
        currentId: 'dashboard',
        currentYear: now.getFullYear(),
        currentMonth: ('0' + (now.getMonth() + 1)).slice(-2),
        data: {
//            mCalendars: [],
            calendars: []
        },
//        fetchedData: {
//            mCalendars: [],
//            calendars: []
//        }
    },

    actions: {
        setCurrentYear( { state, commit, dispatch }, value ) {
            commit(SET_VALUE, { key: 'currentYear', value });
//            dispatch('fetchCalendar', state.currentId);
        },

        setCurrentMonth({ state, commit, dispatch }, value ) {
            commit(SET_VALUE, { key: 'currentMonth', value });
//            dispatch('fetchCalendar', state.currentId);
        },

//        fetchCalendar( { state, commit, dispatch }, calendarId) {
        fetchCalendar( { state, commit, dispatch } ) {
//            if(calendarId === 'dashboard') return;

//            if(String(state.currentYear).length !== 4)
//                u.clog('Error: state.currentYear is not set correctry');
//                return;
//
//            if(String(state.currentYear).length !== 4)
//                u.clog('Error: state.currentYear is not set correctry');
//                return;

            commit(IS_LOADING, true);

            for( let n=0; n < state.data.calendars.length; n++ ) {
                let value = state.data.calendars[n];
                if( value.gregorian_year == state.currentYear
                        && value.gregorian_month == state.currentMonth
                        && value.gregorian_day != 0) {
//                    u.clog('already exists. (' + calendarId + ')');
                    u.clog('already exists.');
                    commit(IS_LOADING, false);
                    return;
                }
            };

//            u.clog('fetchCalendar(' + calendarId + ')');
            u.clog('fetchCalendar()');
//            const id = calendarId;
            const id = 'hogehoge';
            let url = '';

            if(state.viewMode === 'monthly') {
//                url = '/api/v1/mcalendar/' + id;
                url = '/api/v1/mcalendar';
            } else if(state.viewMode === 'dayly') {
                const y = state.currentYear;
                const m = state.currentMonth;
//                url = '/api/v1/calendar/' + id + '/' + y + '/' + m;
                url = '/api/v1/calendar/' + y + '/' + m;
            }

            http.fetchGet(url)
                .then( response => {
                    u.clog('success');

                    commit('item/INIT', response.data.items, { root: true });

                    commit('INIT', response.data.days );

                    response.data.days.forEach((day)=> {
                        Object.keys(day.items).forEach(memberId => {
                            const cellItems = day.items[memberId];
                            dispatch('tableView/updateCellItems', cellItems);
                        });
                    });

                    Object.keys(response.data.members).forEach(function(key) {
                        const val = this[key];
                        val.isShow = true;
                    }, response.data.members);

                    commit(IS_LOADING, false);
                })

                .catch( error => {
                    u.clog('failed: fetchCalendar()');
                    commit(IS_LOADING, false);
                });
            }
    },

    mutations: {
        [INIT]( state, calendars ) {

            calendars.forEach((value) => {

                // add holidays property if it does not exist
                if(!Object.keys(value).some((key) => key === 'holidays')) {
                    value.holidays = [];
                }

                // push new value
                state.data.calendars.push(value);
            });

            // sort array
            state.data.calendars.sort(compareValues('date'));

            // remove duplicated elements
            for( let n=0; n < state.data.calendars.length - 1; n++ ) {
                const a = state.data.calendars[n];
                const b = state.data.calendars[n+1];
                if( a.date == b.date ) {
                    u.clog(n +') a.date: ' + a.date + ' --- ' + 'b.date: ' + b.date + ' DELETE! @fetchCalendar()');
                    state.data.calendars.splice(n, 1);
                } else {
//                    u.clog(n +') a.date: ' + a.date + ' --- ' + 'b.date: ' + b.date);
                }
            }
        },

        [SET_VALUE]( state, { key, value } ) {
            state[key] = value;
            if(key == 'currentId') {
                localStorage.setItem('currentCalendarId', value);
            }
        },

        [IS_LOADING]( state, value ) {
            state.isLoading = value;
        }
    },

    modules: {
        tableView: {
            namespaced: true,

            actions: {
                updateCellItems( { commit, rootState }, cellItems ) {
//                    if( rootState.calendar.viewMode != 'monthly') {
                        commit(SORT_CELL_ITEMS, {rootState, cellItems});
//                    }
                    commit(CHECK_TIME, cellItems);
                }
            },

            mutations: {
                [SORT_CELL_ITEMS]( state, { cellItems, rootState } ) {
                    u.clog('>> sortCellItems()');
                    if(cellItems.length < 2) return;

                    cellItems.sort((aa, bb) => {

                        let a = rootState.item.data.items[aa.id];
                        let b = rootState.item.data.items[bb.id];

                        if(a.type_id === 1 && b.type_id === 2) return 1;
                        if(a.type_id === 2 && b.type_id === 1) return -1;
                        if(a.type_id === 2 && b.type_id === 2) {
                            if( a.content.toUpperCase() < b.content.toUpperCase() ) return -1;
                            if( a.content.toUpperCase() > b.content.toUpperCase() ) return 1;
                            return 0
                        }

                        if( a.is_all_day && ! b.is_all_day ) return -1;
                        if( ! a.is_all_day && b.is_all_day ) return 1;
                        if( a.is_all_day && b.is_all_day ) {
                            if( a.content.toUpperCase() < b.content.toUpperCase() ) { return -1; }
                            if( a.content.toUpperCase() > b.content.toUpperCase() ) { return 1; }
                            return 0;
                        }

                        if( a.start_time === undefined || a.start_time === null ) return -1;
                        if( b.start_time === undefined || b.start_time === null ) return 1;

                        const aArr = a.start_time.split(':');
                        const bArr = b.start_time.split(':');

                        // sort by hour
                        if (parseInt(aArr[0]) < parseInt(bArr[0])) return -1;
                        if (parseInt(aArr[0]) > parseInt(bArr[0])) return 1;

                        // sort by minits
                        if (parseInt(aArr[1]) < parseInt(bArr[1])) return -1;
                        if (parseInt(aArr[1]) > parseInt(bArr[1])) return 1;

                        // the same value
                        return 0;
                    });

                    // update index
                    cellItems.forEach((item, index) => {
                        Vue.set(item, 'itemIndex', index);
                    });
                },

                [CHECK_TIME]( state, cellItems ) {
                    let prev = '';
                    const cellItemsLength = cellItems.length;

                    cellItems.forEach(function(item, index) {

                        if( item.type_id !== 1 ||
                            item.is_all_day == 1 ||
                            item.is_all_day == true ||
                            item.start_time == '' ||
                            item.start_time == null ||
                            item.end_time == '' ||
                            item.end_time == null
                        ) {
                            return;
                        }

                        // first item
                        if(prev === '') {
                            Vue.set(item, 'hasStartTimeError', false);
                            Vue.set(item, 'hasEndTimeError', false);
                            prev = item;
                            return;
                        }

                        let st = '2011/03/14 ' + item.start_time;
                        let et = '2011/03/14 ' + prev.end_time;

                        st = new Date(st);
                        et = new Date(et);

                        if( et.getTime() > st.getTime() ) {
                            Vue.set(prev, 'hasEndTimeError', true);
                            Vue.set(item, 'hasStartTimeError', true);
                        } else {
                            Vue.set(prev, 'hasEndTimeError', false);
                            Vue.set(item, 'hasStartTimeError', false);
                        }

                        // last item
                        if(index === (cellItemsLength -1)) {
                            Vue.set(item, 'hasEndTimeError', false);
                            return;
                        }

                        prev = item;
                    });
                }
            },

            modules: {
                toolPalette: toolPalette,

//                item: {
//                    namespaced: true,
//                    modules: {
//                        insert: insert,
//                        update: update,
//                        remove: remove,
//                        dnd: dnd
//                    }
//                }
            }
        }
    }
}
export default calendar
