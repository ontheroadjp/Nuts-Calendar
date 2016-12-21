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
        selectedTab: 0
    }
}

const mutations = {
    setMainIndex( state, val ) {
        state.mainIndex = val;
    },

    setCurrentYear( state, val ) {
        state.currentYear = val;
    },

    setCurrentMonth( state, val ) {
        state.currentMonth = val;
    },

    setCalendar( state, val ) {
        state.calendar = val;
    },

    setMembers( state, val ) {
        state.members = val;
    },

    setEvents( state, val ) {
        state.events = val;
    },

    setMembersModalIsActive( state, val ) {
        state.membersModal.isActive = val;
    },

    setMembersModalSelectedTab( state, val ) {
        state.membersModal.selectedTab = val
    }
}

export default new Vuex.Store({
    state,
    mutations
})
