export default {
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

    showMembers: (state, getters) => {
        return Object.keys(getters.filteredMembers);
    },

    // ---------------------------------------------

//    isColumnModalActive: (state, getters) => {
//        return state.action.column.update.isActive
//            && state.action.column.remove.isActive
//    },

//    isItemModalActive: (state, getters) => {
//        return state.calendar.behavior.item.editItem.isActive
//            && state.calendar.behavior.item.deleteItem.isActive;
//    },
}
