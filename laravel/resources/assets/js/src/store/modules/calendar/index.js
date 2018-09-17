import Vue from 'vue';
import toolPalette  from './table-view/tool-palette.js';
import insert       from './table-view/item/insert.js';
import update       from './table-view/item/update.js';
import remove       from './table-view/item/remove.js';
import dnd          from './table-view/item/dnd.js';
import {
    INIT,
    INIT_MCALENDARS,
    SET_VALUE,
    IS_LOADING,
    SORT_CELL_ITEMS,
    CHECK_TIME
} from '../../mutation-types.js';

const now = new Date();

const calendar = {
    namespaced: true,

    state: {
        isLoading: false,
        currentId: 'dashboard',
        currentYear: now.getFullYear(),
        currentMonth: ('0' + (now.getMonth() + 1)).slice(-2),
        data: {
            mCalendars: [],
            calendars: []
        }
    },

    actions: {
//        initMCalendars(mCalendars) {
//            commit(INIT_MCALENDARS, mCalendars);
//        },

        fetchCalendar( { state, commit, dispatch }, calendarId) {
            u.clog('fetchCalendar(' + calendarId + ')');
            if(calendarId === 'dashboard') return;

            commit(IS_LOADING, true);

            const id = calendarId;
            const y = state.currentYear;
            const m = state.currentMonth;
            const url = '/api/v1/calendar/' + id + '/' + y + '/' + m;

            http.fetchGet(url)
                .then( response => {
                    u.clog('success');

                    response.data.days.forEach((day)=> {
                        Object.keys(day.items).forEach(memberId => {
                            dispatch('tableView/updateCellItems', day.items[memberId]);
                        });
                    });

                    commit(INIT, response.data.days );

                    Object.keys(response.data.members).forEach(function(key) {
                        const val = this[key];
                        val.isShow = true;
                    }, response.data.members);

                    commit(IS_LOADING, false);
                })

                .catch( error => {
                    u.clog('failed');
                    commit(IS_LOADING, false);
                });
            }
    },

    mutations: {
        [INIT]( state, calendars ) {
            state.data.calendars = calendars;
        },

        [INIT_MCALENDARS](state, mCalendars) {
            state.data.mCalendars = mCalendars;
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
                updateCellItems( { commit }, cellItems ) {
                    commit(SORT_CELL_ITEMS, cellItems);
                    commit(CHECK_TIME, cellItems);
                }
            },

            mutations: {
                [SORT_CELL_ITEMS]( state, cellItems ) {
                    u.clog('>> sortCellItems()');
                    if(cellItems.length < 1) return;
                    cellItems.sort((a, b) => {

                        if(a.type_id === 1 && b.type_id === 2) return 1;
                        if(a.type_id === 2 && b.type_id === 1) return -1;
                        if(a.type_id === 2 && b.type_id === 2) return 0;

                        if( (a.is_all_day === 1 || a.is_all_day === true) &&
                            (b.is_all_day !== 1 || b.is_all_day !== true)
                        ) return -1;

                        if( (a.is_all_day !== 1 || a.is_all_day !== true) &&
                            (b.is_all_day === 1 || b.is_all_day === true)
                        ) return 1;

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
                    cellItems.forEach(function(item, index) {
                        item.dayIndex = parseInt((item.date.split('-'))[2]) - 1;
                        item.itemIndex = index;
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
//                            u.clog('-----------------------------------');
//                            u.clog('FIRST: ' + item.content + '(' + (cellItemsLength - 1)+ ':' + index + ')');
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
//                            u.clog('LAST: ' + item.content + '(' + (cellItemsLength - 1)+ ':' + index + ')');
                            Vue.set(item, 'hasEndTimeError', false);
                            return;
                        }

                        prev = item;
                    });
                }
            },

            modules: {
                toolPalette: toolPalette,

                item: {
                    namespaced: true,
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
