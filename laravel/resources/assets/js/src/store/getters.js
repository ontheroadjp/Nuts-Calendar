export default {
    i18nText: (state, getters) => (key) => {
        const keys = key.split('.');
        const g = keys[0];
        const k = keys[1];
        return state.i18n[state.app.lang][g][k];
    },

    filteredMembers: (state, getters) => {
        const currentCalendarId = state.calendar.currentId;
        const ids = [];

        state.userCalendarMember.data.userCalendarMembers.forEach( function( val ) {
            if(val.user_calendar_id == currentCalendarId) {
                ids.push(val.member_id);
            }
        });

        const members = state.member.data.members;
        const result = {};

        Object.keys(members).forEach(function(key) {
            if( ids.indexOf(key) != -1 ) {
                result[key] = this[key];
            }
        }, members);

        return result;
    },

    getShowMembers: (state, getters) => {
        return Object.keys(getters.filteredMembers);
    },

    getRowIndex: (state) => (dayString) => {
        return parseInt((dayString.split('-'))[2]) - 1;
    },

    getCellAddress: (state) => (dayIndex, memberId) => {
        return (dayIndex + 1) + '-' + memberId;
    }
};
