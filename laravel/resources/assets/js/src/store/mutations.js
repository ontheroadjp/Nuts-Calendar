//import Vue from 'vue';
import {
    NOTIFY_PRIMARY,
    NOTIFY_SUCCESS,
    NOTIFY_INFO,
    NOTIFY_WARNING,
    NOTIFY_DANGER,
    SET_NOTIFICATION,
    RESET_NOTIFICATION,
} from './mutation-types.js' ;

export default {

    // ---------------------------------------------
    // app

    ready( state, val ) {
        state.app.ready = val;
    },

    setLang( state, val ) {
        state.app.lang = val;
    },

    // ---------------------------------------------
    // notification

    [NOTIFY_PRIMARY]( state, { content, isImportant } ) {
        if(!content || typeof(isImportant) !== 'boolean' ) return;
        state.app.message.notification.content = content;
        state.app.message.notification.type = 'is-primary';
        state.app.message.notification.isImportant = isImportant;
        state.app.message.notification.isActive = true;
    },

    [NOTIFY_SUCCESS]( state, { content, isImportant } ) {
        if(!content || typeof(isImportant) !== 'boolean' ) return;
        state.app.message.notification.content = content;
        state.app.message.notification.type = 'is-success';
        state.app.message.notification.isImportant = isImportant;
        state.app.message.notification.isActive = true;
    },

    [NOTIFY_INFO]( state, { content, isImportant } ) {
        if(!content || typeof(isImportant) !== 'boolean' ) return;
        state.app.message.notification.content = content;
        state.app.message.notification.type = 'is-info';
        state.app.message.notification.isImportant = isImportant;
        state.app.message.notification.isActive = true;
    },

    [NOTIFY_WARNING]( state, { content, isImportant } ) {
        if(!content || typeof(isImportant) !== 'boolean' ) return;
        state.app.message.notification.content = content;
        state.app.message.notification.type = 'is-warning';
        state.app.message.notification.isImportant = isImportant;
        state.app.message.notification.isActive = true;
    },

    [NOTIFY_DANGER]( state, { content, isImportant } ) {
        if(!content || typeof(isImportant) !== 'boolean' ) return;
        state.app.message.notification.content = content;
        state.app.message.notification.type = 'is-danger';
        state.app.message.notification.isImportant = isImportant;
        state.app.message.notification.isActive = true;
    },

    [SET_NOTIFICATION]( state, { content, type, isImportant, isActive } ) {
        if(!content || !type || typeof(isImportant) !== 'boolean' || typeof(isActive) !== 'boolean' ) true;
        state.app.message.notification.content = content;
        state.app.message.notification.type = type;
        state.app.message.notification.isImportant = isImportant;
        state.app.message.notification.isActive = isActive;
    },

    [RESET_NOTIFICATION]( state ) {
        state.app.message.notification.content = '';
        state.app.message.notification.type = '';
        state.app.message.notification.isImportant = false;
        state.app.message.notification.isActive = false;
    },

    // ---------------------------------------------
    // theme

    setTheme( state, name ) {
        localStorage.setItem('theme', name);
        state.app.theme.name = name;
        switch (name) {
            case 'ruri':
//                state.app.theme.background = '#f0f0f1';
                state.app.theme.primary.class = 'is-ruri';
                state.app.theme.primary.classInvert = 'is-ruri-invert';
                state.app.theme.primary.code = '#1e50a2';
                state.app.theme.primary.codeInvert = '#164a84';

                state.app.theme.secondary.class = 'is-ruri-secondary';
                state.app.theme.secondary.classInvert = 'is-ruri-secondary-invert';
                state.app.theme.secondary.code = '#3273dc';
                state.app.theme.secondary.codeInvert = '';

                state.app.theme.accent.code = '';
                break;
            case 'koiai':
//                state.app.theme.background = '#f0f0f1';
                state.app.theme.primary.class = 'is-koiai';
                state.app.theme.primary.classInvert = 'is-koiai-invert';
                state.app.theme.primary.code = '#002e4e';
                state.app.theme.primary.codeInvert = '#b0bfc8';

                state.app.theme.secondary.class = 'is-koiai-secondary';
                state.app.theme.secondary.classInvert = 'is-koiai-secondary-invert';
                state.app.theme.secondary.code = '#1960b7';
                state.app.theme.secondary.codeInvert = '';

                state.app.theme.accent.code = '';
                break;
            case 'nadeshiko':
//                state.app.theme.background = '#f0f0f1';
                state.app.theme.primary.class = 'is-nadeshiko';
                state.app.theme.primary.classInvert = 'is-nadeshiko-invert';
                state.app.theme.primary.code = '#f6adc6';
                state.app.theme.primary.codeInvert = '#49343b';

                state.app.theme.secondary.class = 'is-nadeshiko-secondary';
                state.app.theme.secondary.classInvert = 'is-nadeshiko-secondary-invert';
                state.app.theme.secondary.code = '#ee6896';
                state.app.theme.secondary.codeInvert = '';

                state.app.theme.accent.code = '';
                break;
            case 'mikan':
//                state.app.theme.background = '#f0f0f1';
                state.app.theme.primary.class = 'is-mikan';
                state.app.theme.primary.classInvert = 'is-mikan-invert';
                state.app.theme.primary.code = '#f08300';
                state.app.theme.primary.codeInvert = '#fbdab3';

                state.app.theme.secondary.class = 'is-mikan-secondary';
                state.app.theme.secondary.classInvert = 'is-mikan-secondary-invert';
                state.app.theme.secondary.code = '#ffc112';
                state.app.theme.secondary.codeInvert = '';

                state.app.theme.accent.code = '';
                break;
            case 'sumire':
//                state.app.theme.background = '#f0f0f1';
                state.app.theme.primary.class = 'is-sumire';
                state.app.theme.primary.classInvert = 'is-sumire-invert';
                state.app.theme.primary.code = '#7058a3';
                state.app.theme.primary.codeInvert = '#cfc7e0';

                state.app.theme.secondary.class = 'is-sumire-secondary';
                state.app.theme.secondary.classInvert = 'is-sumire-secondary-invert';
                state.app.theme.secondary.code = '#b688ff';
                state.app.theme.secondary.codeInvert = '';

                state.app.theme.accent.code = '';
                break;
            case 'moegi':
//                state.app.theme.background = '#f0f0f1';
                state.app.theme.primary.class = 'is-moegi';
                state.app.theme.primary.classInvert = 'is-moegi-invert';
                state.app.theme.primary.code = '#aacf53';
                state.app.theme.primary.codeInvert = '';

                state.app.theme.secondary.class = 'is-moegi-secondary';
                state.app.theme.secondary.classInvert = 'is-moegi-secondary-invert';
                state.app.theme.secondary.code = '#37af05';
                state.app.theme.secondary.codeInvert = '';

                state.app.theme.accent.code = '';
                break;
        }
    },

    // ---------------------------------------------
    // auth

//    initUser( state, user ) {
//        state.user.name = user.name;
//        state.user.maxCalendars = user.max_calendars;
//        state.user.maxCalendars = user.max_members;
//        state.user.maxCalendars = user.max_shared_members;
//    },

    logout( state ) {
        window.sessionStorage.clear();
        state.user.name = null;
        state.user.token = null;
        state.calendar.currentId = 'dashboard';
    },

    username( state, name ) {
        state.user.name = name;
    }

    // ---------------------------------------------
    // calendar

//    initCalendar( state, calendars ) {
//        state.calendar.data.calendars = calendars;
//    },

//    setCurrentYear( state, year ) {
//        state.calendar.currentYear = year;
//    },
//
//    setCurrentMonth( state, month ) {
//        state.calendar.currentMonth = month;
//    },

    // ---------------------------------------------
    // user calendar

//    initUserCalendar( state, userCalendars ) {
////        state.dashboard.data.userCalendars = userCalendars;
//        state.userCalendar.data.userCalendars = userCalendars;
//    },

//    initMembersForUserCalendar( state, members ) {
//        state.calendar.data.members = members;
//    },

//    setCurrentCalendarId( state, id ) {
//        state.calendar.currentId = id;
//        localStorage.setItem('currentCalendarId', id);
//    },

//    setUserCalendarName( state, { id, name } ) {
//        state.userCalendar.data.userCalendars[id].name = name;
//    },
//
//    setUserCalendarDescription( state, { id, description } ) {
//        state.userCalendar.data.userCalendars[id].description = description;
//    },

    // ---------------------------------------------
    // members

//    initMembers( state, members ) {
//        state.calendar.data.members = members;
//    },

//    initMembers( state, members ) {
//        state.member.data.members = members;
//    },

//    initDashboardUserCalendarMembers( state, members ) {
//        state.userCalendarMember.data.userCalendarMembers = members;
//    },

    // ---------------------------------------------
    // cellItems

//    setCellItems( state, { dayIndex, memberId, val } ) {
//        const columns = state.calendar.data.calendars[dayIndex].items;
//        if(columns instanceof Object) {
//            Vue.set(columns, memberId, val);
//        }
//    },

//    sortCellItemsByStartTime( state, data ) {
//        data.forEach(function(day, dayIndex) {
//            const columns = day.items;
//            const memberIds = Object.keys(columns);
//
//            memberIds.forEach(function(memberId) {
//                if(columns[memberId].length < 1) return;
//                columns[memberId].sort((a, b) => {
//                    if(a.type_id === 1 && b.type_id === 2) return 1;
//                    if(a.type_id === 2 && b.type_id === 1) return -1;
//                    if(a.type_id === 2 && b.type_id === 2) return 0;
//
//                    if( a.start_time === undefined || a.start_time === null ) return -1;
//                    if( b.start_time === undefined || b.start_time === null ) return 1;
//
//                    const aArr = a.start_time.split(':');
//                    const bArr = b.start_time.split(':');
//
//                    // sort by hour
//                    if (parseInt(aArr[0]) < parseInt(bArr[0])) return -1;
//                    if (parseInt(aArr[0]) > parseInt(bArr[0])) return 1;
//
//                    // sort by minits
//                    if (parseInt(aArr[1]) < parseInt(bArr[1])) return -1;
//                    if (parseInt(aArr[1]) > parseInt(bArr[1])) return 1;
//
//                    // the same value
//                    return 0;
//                });
//
//                // set dayIndex & itemIndex
//                columns[memberId].forEach(function(item, index) {
//                    item.dayIndex = parseInt((item.date.split('-'))[2]) - 1;
//                    item.itemIndex = index;
//                });
//            });
//        });
//    }
};
