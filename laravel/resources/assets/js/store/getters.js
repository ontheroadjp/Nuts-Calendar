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

        state.userCalendarMember.data.userCalendarMembers.forEach( function( val ) {
            if(val.user_calendar_id == currentCalendarId) {
                ids.push(val.member_id);
            }
        });

        let members = state.member.data.members;
        let result = {};

        Object.keys(members).forEach(function(key) {
            if( ids.indexOf(parseInt(key)) != -1 ) {
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
    },

    getCellItems: (state) => (dayIndex, memberId) => {
        return state.calendar.data.calendars[dayIndex].items[memberId];
    }
}
