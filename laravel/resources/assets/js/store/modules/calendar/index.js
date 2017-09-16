import Vue from 'vue';
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

            mutations: {
//                setIndexForItem( state, cellItems ) {
//                    cellItems.forEach(function(item, index) {
//                        item.dayIndex = parseInt((item.date.split('-'))[2]) - 1;
//                        item.itemIndex = index;
//                    });
//                },

                sortCellItems( state, cellItems ) {
                    if(cellItems.length < 1) return;
                    cellItems.sort((a, b) => {

                        if(a.type_id === 1 && b.type_id === 2) return 1;
                        if(a.type_id === 2 && b.type_id === 1) return -1;
                        if(a.type_id === 2 && b.type_id === 2) return 0;
            
                        if( (a.is_all_day === 1 || a.is_all_day === true) &&
                            (b.is_all_day !== 1 || b.is_all_day !== true)
                        ) return -1;

                        if( (a.is_all_day === 0 || a.is_all_day === false) &&
                            (b.is_all_day !== 0 || b.is_all_day !== false)
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

                checkTime( state, cellItems ) {
                    let prev = '';
                    let cellItemsLength = cellItems.length;

                    cellItems.forEach(function(item, index) {

                        if( item.type_id !== 1 ||
                            item.start_time == '' || 
                            item.start_time == null ||
                            item.end_time == '' ||
                            item.end_time == null) {
                            return
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
