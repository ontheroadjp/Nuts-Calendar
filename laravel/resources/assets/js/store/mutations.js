// -----------------------------------------------------------------------
// mutations

export default {
//    columnLeftShift( state, key ) {
//
//        const index;
//
//        index = key;
//        state.members.splice(index-1, 2, state.members[index], state.members[index-1]);
//    },
//
//    columnRightShift( state, key ) {
//
//        const index;
//
//        index = key;
//        state.members.splice(index, 2, state.members[index+1], state.members[index]);
//    },

    setMainIndex( state, index ) {
        state.mainIndex = index;
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

    addMember( state, object ) {
        Vue.set(state.members, object.key, object.data);
    },

    updateMember( state, member ) {
        state.members[member.id].name = member.name;
        state.members[member.id].color = member.color;
    },

    deleteMember( state, id ) {
        Vue.delete(state.members, id);
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

    fillEventToCalendar( state, key ) {
        state.calendar.forEach( function(val, index) {
            Vue.set( val.events, key, [{
                'editing': false,
                'is_hover': false
            }]);
        });
    },

    deleteEventFromColumn( state, key ) {
        state.calendar.forEach( function(val, index) {
            Vue.delete( val.events, key);
        });
    },

}
