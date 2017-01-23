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

    setMainIndex( state, index ) {
        state.mainIndex = index;
    },

    setCurrentYear( state, year ) {
        state.currentYear = year;
    },

    setCurrentMonth( state, month ) {
        state.currentMonth = month;
    },

    setCalendar( state, calendar ) {
        state.calendar = calendar;
    },

    setMembers( state, members ) {
        state.members = members;
    },

    addMember( state, object ) {
        Vue.set(state.members, object.key, object.data);
    },

    deleteMember( state, id ) {
        Vue.delete(state.members, id);
    },

    setMemberName( state, newName ) {
        state.members[state.membersModal.selectedTab].name = newName;
    },

    setMemberColor( state, newColor ) {
        state.members[state.membersModal.selectedTab].color = newColor;
    },

    setEvents( state, events ) {
        state.events = events;
    },

    setMembersModalIsActive( state, val ) {
        state.membersModal.isActive = val;
    },

    setMembersModalSelectedTab( state, index ) {
        state.membersModal.selectedTab = index
    }
}
