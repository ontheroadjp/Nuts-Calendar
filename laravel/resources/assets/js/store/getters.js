export default {
    i18nText: (state, getters) => (key) => {
        const keys = key.split('.');
        const g = keys[0];
        const k = keys[1];
        return state.i18n[state.app.lang][g][k];
    },

    filteredMembers: (state, getters) => {
        let currentCalendarId = state.calendar.currentId;
        let ids = [];
        state.dashboard.data.userCalendarMembers.forEach( function( val ) {
            if(val.user_calendar_id == currentCalendarId) {
                ids.push(val.member_id);
            }
        });

        let members = state.dashboard.data.members;

        let result = {};
        members.forEach(function(value) {
            if( ids.indexOf(value.id) != -1 ) {
                result[value.id] = value;
            }
        });
        return result;
    },

//    filteredMembers: (state, getters) => {
//        let members = state.calendar.data.members;
//        let result = {};
//        Object.keys(members).forEach(function(memberId) {
//            if( this[memberId].isShow ) {
//                result[memberId] = this[memberId];
//            }
//        }, members);
//        return result;
//    },

    getShowMembers: (state, getters) => {
        return Object.keys(getters.filteredMembers);
    },

    getRowIndex: (state) => (dayString) => {
        return parseInt((dayString.split('-'))[2]) - 1;
    },

    getCellAddress: (state) => (dayIndex, memberId) => {
        return (dayIndex + 1) + '-' + memberId;
    },

    getCellItems: (state) => (dayIndex, memberId) => {
        return state.calendar.data.calendars[dayIndex].items[memberId];
    }
}
