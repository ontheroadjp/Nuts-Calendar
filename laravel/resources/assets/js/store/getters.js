export default {
    i18nText: (state, getters) => (key) => {
        const keys = key.split('.');
        const g = keys[0];
        const k = keys[1];
        return state.i18n[state.app.lang][g][k];
    },

    filteredMembers: (state, getters) => {
        let members = state.calendar.data.members;
        let result = {};
        Object.keys(members).forEach(function(memberId) {
            if( this[memberId].isShow ) {
                result[memberId] = this[memberId];
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
