export default {

    // ---------------------------------------------
    // app

    ready( state, val ) {
        state.app.ready = val
    },

    // ---------------------------------------------
    // theme

    setTheme( state, name ) {
        localStorage.setItem('theme', name);
        state.app.theme.name = name;
        switch (name) {
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

    login( state, name ) {
        state.user.name = name;
    },

    logout( state ) {
        window.sessionStorage.clear();
        state.user.name = null;
        state.user.token = null;
        state.calendar.currentId = 'dashboard';
    },

    username( state, name ) {
        state.user.name = name;
    },

    // ---------------------------------------------
    // user calendar

    initUserCalendar( state, userCalendars ) {
        state.calendar.data.userCalendars = userCalendars;
    },

    setCurrentCalendarId( state, id ) {
        state.calendar.currentId = id;
        localStorage.setItem('currentCalendarId', id);
    },

    // ---------------------------------------------
    // calendar

    initCalendar( state, calendars ) {
        state.calendar.data.calendars = calendars;
    },

    setCurrentYear( state, year ) {
        state.calendar.currentYear = year;
    },

    setCurrentMonth( state, month ) {
        state.calendar.currentMonth = month;
    },

    setCalendarName( state, payload ) {
        state.calendar.data.userCalendars[payload.id].name = payload.name;
    },

    setCalendarDescription( state, payload ) {
        state.calendar.data.userCalendars[payload.id].description = payload.description;
    },

    // ---------------------------------------------
    // calendar (ui)

    toggleTableToolPalette(state, val) {
        state.calendar.ui.isToolPalette = val;
    },

    // ---------------------------------------------
    // members

    initMembers( state, members ) {
        state.calendar.data.members = members;
    },

    setShowMember(state, payload) {
        state.calendar.data.members[payload.id].isShow = payload.value;
    },

    addMember( state, payload ) {
        Vue.set(state.calendar.data.members, payload.key, payload.data);
        state.calendar.data.calendars.forEach( function(val, index) {
            Vue.set( val.items, payload.key, [{
                'editing': false,
                'is_hover': false
            }]);
        });
    },

    updateMember( state, member ) {
        state.calendar.data.members[member.id].name = member.name;
        state.calendar.data.members[member.id].order = member.order;
    },

    deleteMember( state, id ) {
        Vue.delete(state.calendar.data.members, id);
        state.calendar.data.calendars.forEach( function(val, index) {
            Vue.delete( val.items, id);
        });
    },

//    // ---------------------------------------------
//    // members dialog
//
//    setMembersModalIsActive( state, val ) {
//        state.membersModal.isActive = val;
//    },
//
//    setMembersModalSelectedTab( state, index ) {
//        state.membersModal.selectedTab = index
//    },

//    // ---------------------------------------------
//    // items
//
//    initItems( state, items ) {
//        state.items = items;
//    },

}
