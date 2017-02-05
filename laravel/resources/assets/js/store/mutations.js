// -----------------------------------------------------------------------
// mutations

export default {

    // ---------------------------------------------
    // auth

    login( state, data ) {
        window.sessionStorage.setItem('token', data.token);
        window.sessionStorage.setItem('username', data.user.name);
        state.user.name = data.user.name;
        state.user.token = data.token;
    },

    logout( state ) {
        window.sessionStorage.clear();
        state.user.name = null;
        state.user.token = null;
    },

    // ---------------------------------------------
    // user calendar

    initUserCalendar( state, userCalendar ) {
        state.userCalendar = userCalendar;
    },

    setCurrentCalendarId( state, id ) {
        state.currentCalendarId = id;
    },

    // ---------------------------------------------
    // calendar
    setCurrentYear( state, year ) {
        state.currentYear = year;
    },

    setCurrentMonth( state, month ) {
        state.currentMonth = month;
    },

    initCalendar( state, calendar ) {
        state.calendar = calendar;
    },

    // ---------------------------------------------
    // members
    initMembers( state, members ) {
        state.members = members;
    },

    addMember( state, payload ) {
        Vue.set(state.members, payload.key, payload.data);

        state.calendar.forEach( function(val, index) {
            Vue.set( val.events, payload.key, [{
                'editing': false,
                'is_hover': false
            }]);
        });
    },

    updateMember( state, member ) {
        state.members[member.id].name = member.name;
        state.members[member.id].color = member.color;
    },

    deleteMember( state, id ) {
        Vue.delete(state.members, id);

        state.calendar.forEach( function(val, index) {
            Vue.delete( val.events, id);
        });
    },

    // ---------------------------------------------
    // members dialog
    setMembersModalIsActive( state, val ) {
        state.membersModal.isActive = val;
    },

    setMembersModalSelectedTab( state, index ) {
        state.membersModal.selectedTab = index
    },

    // ---------------------------------------------
    // events
    initEvents( state, events ) {
        state.events = events;
    },

    // ---------------------------------------------
    // Ajax
    startFetchCalendar( state ) {
        state.ajax.loadingCalendarId = state.currentCalendarId;
    },

    stopFetchCalendar( state ) {
        state.ajax.loadingCalendarId = '';
    },

}
