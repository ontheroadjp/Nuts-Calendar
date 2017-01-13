import Vuex from 'vuex';

const now = new Date();

const state = {
    lang: 'en',
    mainIndex: 0,
    currentYear: now.getFullYear(),
    currentMonth: now.getMonth() + 1,
    calendar: [],
    members: [],
    events: [],
    membersModal: {
        isActive: false,
        selectedTab: 0,
    }
}

const mutations = {
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

    setMemberCloro( state, newColor ) {
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

export default new Vuex.Store({
    state,
    mutations
})
