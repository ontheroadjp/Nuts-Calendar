//import Vue from 'vue';
import Vuex from 'vuex';

//Vue.use(Vuex);

const now = new Date();

const state = {
    lang: 'en',
    mainIndex: 0,
    currentYear: now.getFullYear(),
    currentMonth: ("0" + now.getMonth() + 1).slice(-2),
    calendar: [],
    members: [],
    events: [],
    membersModal: {
        isActive: false,
        selectedTab: 0,
    }
}

const actions = {
}

const mutations = {
    fillEventToCalendar( state, key ) {
        state.calendar.forEach( function(val, index) {
            Vue.delete( val.events, key);
        });
    },

    deleteEventFromColumn( state, key ) {
        state.calendar.forEach( function(val, index) {
            Vue.set( val.events, key, [{
                'editing': false,
                'is_hover': false
            }]);
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

const getters = {
    newColumnKey: state => {

        let keys = Object.keys(state.members);

        keys.map(function(key) {
            return parseInt(key);
        });

        return Math.max.apply(null, keys) + 1;
    },
}

export default new Vuex.Store({
    //strict: true,
    state,
    actions,
    mutations,
    getters
})
